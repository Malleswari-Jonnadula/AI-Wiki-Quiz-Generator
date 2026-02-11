from sqlalchemy.orm import Session
from . import models

def get_quiz_by_url(db: Session, url: str):
    return db.query(models.WikiQuiz).filter(models.WikiQuiz.url == url).first()

def create_quiz(db: Session, data: dict):
    quiz = models.WikiQuiz(**data)
    db.add(quiz)
    db.commit()
    db.refresh(quiz)
    return quiz

def get_all_quizzes(db: Session):
    return db.query(models.WikiQuiz).order_by(models.WikiQuiz.created_at.desc()).all()

def get_quiz_by_id(db: Session, quiz_id: int):
    return db.query(models.WikiQuiz).filter(models.WikiQuiz.id == quiz_id).first()