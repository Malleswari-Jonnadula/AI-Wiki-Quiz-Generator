from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import crud, schemas, scraper, llm_service

router = APIRouter(prefix='/api', tags=['quiz'])

@router.post('/generate', response_model=schemas.QuizResponse)
def generate_quiz(request: schemas.QuizRequest, db: Session = Depends(get_db)):
    url = request.url.strip()

    if 'wikipedia.org/wiki/' not in url:
        raise HTTPException(status_code=400, detail='Please provide a valid Wikipedia URL.')

    # Return cached result if exists
    existing = crud.get_quiz_by_url(db, url)
    if existing:
        return existing

    # Scrape
    try:
        scraped = scraper.scrape_wikipedia(url)
    except Exception as e:
        raise HTTPException(status_code=422, detail=f'Scraping failed: {str(e)}')

    # Generate with LLM
    try:
        quiz_questions = llm_service.generate_quiz(scraped['title'], scraped['full_text'])
        entity_data = llm_service.extract_entities_and_topics(scraped['title'], scraped['full_text'])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'LLM failed: {str(e)}')

    # Save to DB
    saved = crud.create_quiz(db, {
        'url': url,
        'title': scraped['title'],
        'summary': scraped['summary'],
        'raw_html': scraped['raw_html'],
        'sections': scraped['sections'],
        'key_entities': entity_data.get('key_entities', {}),
        'quiz': quiz_questions,
        'related_topics': entity_data.get('related_topics', []),
    })
    return saved

@router.get('/preview')
def preview_url(url: str):
    if 'wikipedia.org/wiki/' not in url:
        raise HTTPException(status_code=400, detail='Not a Wikipedia URL')
    try:
        import requests
        from bs4 import BeautifulSoup
        r = requests.get(url, timeout=10, headers={'User-Agent': 'WikiQuizBot/1.0'})
        soup = BeautifulSoup(r.text, 'lxml')
        title_tag = soup.find('h1', {'id': 'firstHeading'})
        title = title_tag.get_text(strip=True) if title_tag else 'Unknown'
        return {'title': title}
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))