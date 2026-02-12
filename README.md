# 🧠 WikiQuiz — AI-Powered Wikipedia Quiz Generator

 Automatically generate intelligent quizzes from any Wikipedia article using AI. Built with FastAPI, React, and Google Gemini.

**Key Highlights:**
- 🤖 AI-powered quiz generation with anti-hallucination safeguards
- 📊 Automatic entity extraction (people, organizations, locations)
- 🎯 Mixed difficulty levels (easy, medium, hard)
- 💾 Full quiz history with caching
- 🎮 Interactive "Take Quiz" mode with scoring
- 🔗 Related topic suggestions for deeper learning

---

## 🚀 Live Demo

**Frontend:** [https://ai-wiki-quiz-generator-phi.vercel.app](https://ai-wiki-quiz-generator-phi.vercel.app/)  
**Backend API Docs:** [https://wikiquiz-backend-yeln.onrender.com/docs](https://wikiquiz-backend-yeln.onrender.com/docs)

**GitHub Repository:** [https://github.com/Malleswari-Jonnadula/AI-Wiki-Quiz-Generator](https://github.com/Malleswari-Jonnadula/AI-Wiki-Quiz-Generator)

---

## Tech Stack
- Backend: FastAPI (Python)
- Database: PostgreSQL + SQLAlchemy
- LLM: Google Gemini via LangChain
- Web Scraping: BeautifulSoup4 + lxml
- Frontend: React (Vite)
- Deployment: Render (backend) + Vercel (frontend)

## Features
- Generate quizzes from any Wikipedia article URL
- 8 questions with difficulty levels (easy/medium/hard)
- Key entity extraction (people, orgs, locations)
- Related topics with Wikipedia links
- Shows article sections for context  
- Quiz history with full details modal
- Take Quiz mode with scoring
- URL preview before generation
- Caching — same URL returns instantly

---

## 📁 Project Structure

```
wiki-quiz-app/
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   │   ├── __init__.py
│   │   │   ├── quiz.py          # Quiz generation endpoints
│   │   │   └── history.py       # History & details endpoints
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI app + CORS setup
│   │   ├── models.py            # SQLAlchemy database models
│   │   ├── schemas.py           # Pydantic request/response schemas
│   │   ├── database.py          # Database connection & session
│   │   ├── crud.py              # Database operations
│   │   ├── scraper.py           # Wikipedia scraping logic
│   │   └── llm_service.py       # LangChain + Gemini integration
│   ├── .env                     # Environment variables (not committed)
│   ├── requirements.txt         # Python dependencies
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── QuizCard.jsx     # Individual quiz question display
│   │   │   ├── QuizDisplay.jsx  # Full quiz viewer with modes
│   │   │   ├── TakeQuiz.jsx     # Interactive quiz mode
│   │   │   ├── HistoryTable.jsx # Quiz history table
│   │   │   └── Modal.jsx        # Details modal wrapper
│   │   ├── pages/
│   │   │   ├── GenerateTab.jsx  # Tab 1: Generate new quiz
│   │   │   └── HistoryTab.jsx   # Tab 2: View past quizzes
│   │   ├── App.jsx              # Main app with tab navigation
│   │   ├── App.css              # Global styles
│   │   ├── api.js               # Axios API client
│   │   └── main.jsx             # React entry point
│   ├── .env.local               # Frontend env vars (not committed)
│   ├── package.json
│   └── vite.config.js
├── sample_data/
│   ├── alan_turing.json         # Example output 1
│   ├── python_language.json     # Example output 2
│   ├── mahatma_gandhi.json      # Example output 3
│   └── urls_tested.txt          # List of tested URLs
├── screenshots/
│   ├── 1-generate-quiz.png      # Quiz generation page
│   ├── 2-take-quiz.png          # Take quiz mode
│   ├── 3-history.png            # History table
│   └── 4-details-modal.png      # Quiz details modal
├── .gitignore
└── README.md                    # This file
```

---

## Local Setup Instructions

### Prerequisites
- Python 3.10+ ([Download](https://www.python.org/downloads/))
- Node.js 18+ ([Download](https://nodejs.org/))
- PostgreSQL 14+ ([Download](https://www.postgresql.org/download/))
- Git ([Download](https://git-scm.com/))
- Gemini API Key ([Get one free](https://aistudio.google.com/))

---

### Backend Setup

1. **Clone the repository:**
```bash
git clone https://github.com/Malleswari-Jonnadula/AI-Wiki-Quiz-Generator.git
cd backend
```

2. **Create virtual environment:**
```bash
python -m venv venv

# Windows:
venv\Scripts\activate

# Mac/Linux:
source venv/bin/activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Create `.env` file in `backend/` directory:**
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/wikiquiz
GEMINI_API_KEY=your_gemini_api_key_here
CORS_ORIGINS=http://localhost:5173
```

5. **Create PostgreSQL database:**
```bash
# Connect to PostgreSQL
psql -U postgres

# Inside psql:
CREATE DATABASE wikiquiz;
\q
```

6. **Run the backend:**
```bash
uvicorn app.main:app --reload --port 8000
```

Backend will be running at: **http://localhost:8000**  
API documentation: **http://localhost:8000/docs**

---

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd ../frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env.local` file in `frontend/` directory:**
```env
VITE_API_URL=http://localhost:8000
```

4. **Run the frontend:**
```bash
npm run dev
```

Frontend will be running at: **http://localhost:5173**

---

## API Endpoints


### Quiz Generation
- **POST** `/api/generate` — Generate quiz from Wikipedia URL
  - Request body: `{"url": "https://en.wikipedia.org/wiki/..."}`
  - Returns: Full quiz object with questions, entities, sections, etc.

### Preview 
- **GET** `/api/preview?url=...` — Preview article title before generating
  - Returns: `{"title": "Article Title", "cached": boolean}`

### History
- **GET** `/api/history` — List all generated quizzes
  - Returns: Array of quiz summaries (id, title, url, created_at)

### Details
- **GET** `/api/history/{quiz_id}` — Get full quiz by ID
  - Returns: Complete quiz object

---

## LangChain Prompt Templates

See `backend/app/llm_service.py` for:
- `QUIZ_PROMPT` — Quiz generation with anti-hallucination rules
- `ENTITY_PROMPT` — Entity extraction and related topics

---

## Sample Output Structure

```json
{
  "id": 5,
  "url": "https://en.wikipedia.org/wiki/Alan_Turing",
  "title": "Alan Turing",
  "summary": "Alan Mathison Turing(/ˈtjʊərɪŋ/; 23 June 1912 – 7 June 1954) was an Englishmathematician,computer scientist,logician....",
  "sections": [
    "Early life and education",
    "Career and research",
    "Personal life",
    "Death",
    "Government apology and pardon"
  ],
  "key_entities": {
    "people": [
      "Alan Turing",
      "Max Newman",
      "Gordon Brown",
      "Queen Elizabeth II"
    ],
    "organizations": [
      "King's College, Cambridge",
      "Princeton University",
      "Government Code and Cypher School",
      "National Physical Laboratory",
      "University of Manchester",
      "Bank of England"
    ],
    "locations": [
      "London",
      "Bletchley Park",
      "Manchester",
      "England"
    ]
  },
  "quiz": [
    {
      "question": "In what year did Turing's portrait first appear on the Bank of England £50 note?",
      "options": [
        "2009",
        "2013",
        "2019",
        "2021"
      ],
      "answer": "2021",
      "difficulty": "medium",
      "explanation": "The article states his portrait appears on the £50 note, first released on 23 June 2021."
    }
  ],
  "related_topics": [
    "Theoretical computer science",
    "Cryptanalysis",
    "Enigma machine",
    "Morphogenesis",
    "Mathematical biology"
  ],
  "created_at": "2026-02-12T00:12:50.298750+05:30"
}
```

See `sample_data/` folder for complete examples.

### Tested Wikipedia URLs
See `sample_data/urls_tested.txt` for full list. Examples:
- https://en.wikipedia.org/wiki/Alan_Turing
- https://en.wikipedia.org/wiki/Python_(programming_language)
- https://en.wikipedia.org/wiki/Mahatma_Gandhi

---

## Database Schema

### `wiki_quizzes` Table
```sql
CREATE TABLE wiki_quizzes (
    id SERIAL PRIMARY KEY,
    url VARCHAR UNIQUE NOT NULL,
    title VARCHAR NOT NULL,
    summary TEXT,
    raw_html TEXT,
    sections JSON,
    key_entities JSON,
    quiz JSON,
    related_topics JSON,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

### Test Locally
1. Start both backend and frontend
2. Open http://localhost:5173
3. Paste a Wikipedia URL and click "Generate Quiz"
4. Verify all features work:
   - Quiz generates successfully
   - All 8 questions display correctly
   - Sections and related topics appear
   - Take Quiz mode works
   - History tab shows all quizzes
   - Details modal opens

---


## Screenshots

See `screenshots/` folder for:
1. Quiz generation page with full quiz displayed
2. Take Quiz mode with interactive questions
3. History table showing all past quizzes
4. Details modal with complete quiz view

---