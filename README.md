# 📝 Task Manager App

A full-stack Task Manager application built using **React (Frontend)** and **FastAPI (Backend)**.
Users can create, view, and delete tasks in a clean and simple UI.

---

## 🚀 Live Demo

* 🌐 Frontend: https://task-manager-app-six-ivory.vercel.app
* ⚙️ Backend API: https://task-manager-backend-6q0j.onrender.com/docs

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Axios
* CSS

### Backend

* FastAPI
* SQLite
* Uvicorn

### Deployment

* Frontend → Vercel
* Backend → Render
* Version Control → GitHub

---

## ✨ Features

* ➕ Add new tasks
* 📋 View all tasks
* ❌ Delete tasks
* ⚡ Fast and responsive UI
* 🌍 Fully deployed (frontend + backend)

---

## 📁 Project Structure

```
task-manager-app/
│
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── database.py
│   ├── schemas.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   └── package.json
```

---

## ⚙️ Setup Instructions (Local)

### 1. Clone repo

```
git clone https://github.com/aasthagrover77/task-manager-app.git
cd task-manager-app
```

### 2. Backend setup

```
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Frontend setup

```
cd frontend
npm install
npm start
```

---

## 🔗 API Example

```
GET /tasks
POST /tasks
DELETE /tasks/{id}
```

---

## 👩‍💻 Author

* GitHub: https://github.com/aasthagrover77

---
⭐ Show your support

If you like this project, give it a ⭐ on GitHub!
