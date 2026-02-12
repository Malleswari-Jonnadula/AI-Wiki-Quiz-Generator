from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
import os, json, re

load_dotenv()

llm = ChatGoogleGenerativeAI(
    model='gemini-3-flash-preview',
    google_api_key=os.getenv('GEMINI_API_KEY'),
    temperature=0.3,
)

QUIZ_PROMPT = ChatPromptTemplate.from_messages([
    ('system', """You are an expert educational quiz creator.
Create a quiz based ONLY on the provided article text.
RULES:
- Every question MUST be verifiable from the article.
- Do NOT add outside information.
- Vary difficulty: 2-3 easy, 3-4 medium, 2-3 hard.
- Each question has exactly 4 options as plain strings.
- Correct answer must exactly match one of the 4 options.
- Return ONLY valid JSON, no markdown, no code fences."""),
    ('human', """Article Title: {title}

Article Text:
{article_text}

Generate 8 quiz questions. Return this exact JSON format:
{{
  "quiz": [
    {{
      "question": "Question text?",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "answer": "The correct option",
      "difficulty": "easy",
      "explanation": "Brief explanation from the article."
    }}
  ]
}}""")
])

ENTITY_PROMPT = ChatPromptTemplate.from_messages([
    ('system', """You are an expert at extracting structured information.
Return ONLY valid JSON. No markdown, no extra text."""),
    ('human', """Article Title: {title}

Article Text:
{article_text}

Return this exact JSON:
{{
  "key_entities": {{
    "people": ["person1", "person2"],
    "organizations": ["org1", "org2"],
    "locations": ["loc1", "loc2"]
  }},
  "related_topics": ["Topic 1", "Topic 2", "Topic 3", "Topic 4", "Topic 5"]
}}""")
])

def extract_text_from_response(content):
    """Extract text from LangChain response which can be dict, list, or string"""
    if isinstance(content, dict) and 'text' in content:
        return content['text']
    
    if isinstance(content, list):
        if len(content) > 0:
            return extract_text_from_response(content[0])
        return ""
    
    if isinstance(content, str):
        return content
    
    return str(content)

def clean_json(text: str) -> str:
    text = text.strip()
    
    text = re.sub(r'^```json\s*', '', text, flags=re.MULTILINE)
    text = re.sub(r'^```\s*', '', text, flags=re.MULTILINE)
    text = re.sub(r'\s*```$', '', text, flags=re.MULTILINE)
    
    text = text.strip()
    
    json_match = re.search(r'\{.*\}', text, re.DOTALL)
    if json_match:
        text = json_match.group(0)
    
    return text

def generate_quiz(title: str, article_text: str) -> list:
    chain = QUIZ_PROMPT | llm
    response = chain.invoke({
        'title': title,
        'article_text': article_text[:4000]
    })
    
    content = extract_text_from_response(response.content)
    
    print(f"Extracted text (first 500 chars): {content[:500]}")
    
    cleaned = clean_json(content)
    
    try:
        data = json.loads(cleaned)
        return data.get('quiz', [])
    except json.JSONDecodeError as e:
        print(f"JSON parse error: {e}")
        print(f"Failed to parse: {cleaned[:1000]}")
        raise ValueError(f"Failed to parse LLM response as JSON: {e}")

def extract_entities_and_topics(title: str, article_text: str) -> dict:
    chain = ENTITY_PROMPT | llm
    response = chain.invoke({
        'title': title,
        'article_text': article_text[:3000]
    })
    
    content = extract_text_from_response(response.content)
    
    print(f"Extracted entity text (first 500 chars): {content[:500]}")
    
    cleaned = clean_json(content)
    
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError as e:
        print(f"Entity JSON parse error: {e}")
        print(f"Failed to parse: {cleaned[:1000]}")
        raise ValueError(f"Failed to parse entity response as JSON: {e}")