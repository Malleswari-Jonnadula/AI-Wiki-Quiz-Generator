from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from .. import crud, schemas

router = APIRouter(prefix='/api', tags=['history'])

@router.get('/history', response_model=List[schemas.HistoryItem])
def get_history(db: Session = Depends(get_db)):
    return crud.get_all_quizzes(db)

@router.get('/history/{quiz_id}', response_model=schemas.QuizResponse)
def get_quiz_detail(quiz_id: int, db: Session = Depends(get_db)):
    quiz = crud.get_quiz_by_id(db, quiz_id)
    if not quiz:
        raise HTTPException(status_code=404, detail='Quiz not found')
    return quiz