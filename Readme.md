# 🎬 Movie Explorer Platform

A full-stack web application for exploring movies, actors, directors, and genres. Built with FastAPI and ReactJS, powered by MongoDB, and fully Dockerized for ease of deployment.

---

## ⚙️ Tech Stack

**Backend**
- FastAPI (Python)
- MongoDB (Atlas or local)
- Pydantic models
- Swagger UI (OpenAPI auto-generated)

**Frontend**
- ReactJS (Vite)
- Tailwind CSS

**DevOps**
- Docker & Docker Compose
- Isolated containers for frontend and backend

---

## 🚀 Features

### 🎞️ Movies
- List view: title, release year, genres, director
- Filtering by genre, director, year, or actor
- Detail page with full metadata

### 👤 Actors / Directors
- Profile view with movies they've worked on

---

## 🔌 API Endpoints

Visit `http://localhost:8000/docs` for interactive Swagger documentation.

**Core Resources**
- `/movies`
- `/actors`
- `/directors`
- `/genres`

**Filtering Examples**
- `/movies?genre=Action&director=John+Doe&year=2020`
- `/actors?genre=Drama`
- `/actors?movie_id=abc123`

---

## 🐳 Docker Setup

### 1. Clone the Repository

```bash
git clone https://github.com/kalai2000/Take-Home-Movie-recommendation.git
cd Take-Home-Movie-recommendation
```


### 2. Build the docker image 
```bash
docker compose up --build
```
