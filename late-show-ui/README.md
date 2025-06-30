# Late Show UI

A minimal frontend interface for the Late Show API.

## Features

* Display all episodes (GET `/episodes`)
* Display all guests (GET `/guests`)
* Submit a new appearance (POST `/appearances`)
* Delete an episode (DELETE `/episodes/:id`)
* Success/error feedback messages
* Minimal styling with Tailwind CSS CDN

## Getting Started

### 1. Backend (Flask API)

```bash
# Install dependencies (in repo root)
pip install -r requirements.txt

# (Re)create the database and load sample data
python app/seed.py

# Run the API on http://localhost:5555
python run.py
```

### 2. Frontend (this folder)

Serve the `late-show-ui` directory with any simple static-file server. For example:

```bash
# inside late-show-ui
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

The UI expects the API at `http://localhost:5555`. If your backend runs elsewhere, edit `API_BASE` at the top of `script.js`:

```js
const API_BASE = "http://your-host:port";
```

