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

## Setup
### Backend
cd backend  
python -m venv venv  
source venv/bin/activate  
pip install -r requirements.txt
# Create .env with DATABASE_URL and GEMINI_API_KEY  
uvicorn app.main:app --reload

### Frontend
cd frontend 
npm install  
npm run dev  

## API Endpoints
POST /api/generate   — Generate quiz from URL  
GET  /api/preview    — Preview article title  
GET  /api/history    — List all past quizzes  
GET  /api/history/{id} — Get full quiz by ID  

## LangChain Prompt Templates
See backend/app/llm_service.py for QUIZ_PROMPT and ENTITY_PROMPT templates.

