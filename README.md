# WikiQuiz — AI Wiki Quiz Generator

## Tech Stack
- Backend: FastAPI (Python)
- Database: PostgreSQL + SQLAlchemy
- LLM: Google Gemini via LangChain
- Scraping: BeautifulSoup4
- Frontend: React (Vite)

## Features
- Generate quizzes from any Wikipedia article URL
- 8 questions with difficulty levels (easy/medium/hard)
- Key entity extraction (people, orgs, locations)
- Related topics with Wikipedia links
- Quiz history with full details modal
- Take Quiz mode with scoring
- URL preview before generation
- Caching — same URL returns instantly

## Setup Instructions
### Backend
```bash

cd backend  
python -m venv venv  
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate
pip install -r requirements.txt
```
### Create `.env` file in `backend/` :
```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/wikiquiz
GEMINI_API_KEY=your_gemini_api_key
CORS_ORIGINS=http://localhost:5173
```

Create database:
```bash
psql -U postgres
CREATE DATABASE wikiquiz;
\q
```

Run backend:
```bash
uvicorn app.main:app --reload --port 8000
```

### Frontend
cd frontend 
npm install  

Create `.env.local`:
```
VITE_API_URL=http://localhost:8000
```
Run frontend:
```bash
npm run dev
```

Open http://localhost:5173

## API Endpoints
POST /api/generate   — Generate quiz from URL  
GET  /api/preview    — Preview article title  
GET  /api/history    — List all past quizzes  
GET  /api/history/{id} — Get full quiz by ID  

## LangChain Prompt Templates
See `backend/app/llm_service.py` for:
- `QUIZ_PROMPT` — Quiz generation with anti-hallucination rules
- `ENTITY_PROMPT` — Entity extraction and related topics

## Project Structure
```
wiki-quiz-app/
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   │   ├── quiz.py
│   │   │   └── history.py
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── database.py
│   │   ├── crud.py
│   │   ├── scraper.py
│   │   └── llm_service.py
│   ├── .env
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── api.js
│   └── .env.local
├── sample_data/
│   ├── alan_turing.json
│   ├── python_language.json
│   ├── mahatma_gandhi.json
│   └── urls_tested.txt
└── README.md
```

## Screenshots
See `screenshots/` folder for UI examples.

---