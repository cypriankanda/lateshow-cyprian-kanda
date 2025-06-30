# Late Show (Flask + Vanilla JS)

A simple demo application that exposes a REST API for a fictional late–night talk-show, plus a minimal frontend UI.

* **Backend:** Flask, SQLAlchemy, SQLite
* **Frontend:** Pure HTML + JavaScript (TailwindCSS for styling)

---

## Table of Contents
1. [Features](#features)
2. [Quick Start](#quick-start)
3. [API Reference](#api-reference)
4. [Project Structure](#project-structure)
5. [Screenshots](#screenshots)

---

## Features

### Backend
- CRUD endpoints for Episodes, Guests, and Appearances
- SQLite database (migrations via Flask-Migrate)
- Seed script with sample data
- CORS enabled for the frontend

### Frontend (`late-show-ui/`)
- Fetch & list episodes and guests
- Add a new appearance (rating, guest, episode)
- Delete an episode
- Success/error feedback banners

---

## Quick Start

### 1. Clone & Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Set Up the Database & Sample Data
```bash
python app/seed.py
```

### 3. Run the API (port 5555)
```bash
python run.py
```

### 4. Launch the Frontend (port 8000)
```bash
cd late-show-ui
python -m http.server 8000
# open http://localhost:8000 in your browser
```

If your API runs on a different host or port, update `API_BASE` at the top of `late-show-ui/script.js`.

---

## API Reference
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/episodes` | List all episodes |
| GET | `/guests` | List all guests |
| POST | `/appearances` | Create an appearance `{ rating, guest_id, episode_id }` |
| DELETE | `/episodes/:id` | Delete an episode |

---

## Project Structure
```
├── app/            # Flask application (models, routes, seed)
├── late-show-ui/   # Static frontend
├── migrations/     # Alembic migration files
├── requirements.txt
└── run.py          # App entry-point
```

---

## Screenshots
![UI Screenshot](docs/screenshot.png)

---

Made with ❤️ for learning purposes.