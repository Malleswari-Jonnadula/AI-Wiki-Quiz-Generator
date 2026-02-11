from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from .database import engine, Base
from .routers import quiz, history

load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI(title='WikiQuiz API')

origins = os.getenv('CORS_ORIGINS', 'http://localhost:5173').split(',')

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(quiz.router)
app.include_router(history.router)

@app.get('/')
def root():
    return {'message': 'WikiQuiz API is running!', 'docs': '/docs'}