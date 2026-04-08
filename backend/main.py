from fastapi import FastAPI, Depends, Body
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

import models
import schemas
from database import engine, SessionLocal

# Create DB tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# ✅ CORS FIX (VERY IMPORTANT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow frontend (React)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB connection
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create task
@app.post("/tasks", response_model=schemas.TaskResponse)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    db_task = models.Task(**task.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

# Get all tasks
@app.get("/tasks")
def get_tasks(db: Session = Depends(get_db)):
    return db.query(models.Task).all()

# Update task
@app.put("/tasks/{task_id}")
def update_task(task_id: int, task: schemas.TaskUpdate, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if not db_task:
        return {"error": "Task not found"}

    if task.title is not None:
        db_task.title = task.title
    if task.description is not None:
        db_task.description = task.description
    if task.status is not None:
        db_task.status = task.status

    db.commit()
    db.refresh(db_task)
    return db_task

# Delete single task
@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if not task:
        return {"error": "Task not found"}

    db.delete(task)
    db.commit()

    return {"message": "Task deleted"}

# Bulk action (⭐ main feature)
@app.post("/tasks/bulk")
def bulk_action(data: schemas.BulkAction = Body(...), db: Session = Depends(get_db)):
    tasks = db.query(models.Task).filter(models.Task.id.in_(data.task_ids)).all()

    for task in tasks:
        if data.action == "completed":
            task.status = "completed"
        elif data.action == "in_progress":
            task.status = "in_progress"
        elif data.action == "delete":
            db.delete(task)

    db.commit()
    return {"message": "Bulk action applied"}