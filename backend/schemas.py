from pydantic import BaseModel
from typing import List, Optional

# Create Task
class TaskCreate(BaseModel):
    title: str
    description: str

# Response
class TaskResponse(BaseModel):
    id: int
    title: str
    description: str
    status: str

    class Config:
        from_attributes = True

# Update Task
class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None

# Bulk Action
class BulkAction(BaseModel):
    task_ids: List[int]
    action: str