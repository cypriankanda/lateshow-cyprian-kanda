# Late Show UI

A minimal frontend interface for the Late Show API.

## Features

* Display all episodes (GET `/episodes`)
* Display all guests (GET `/guests`)
* Submit a new appearance (POST `/appearances`)
* Delete an episode (DELETE `/episodes/:id`)
* Success/error feedback messages
* Minimal styling with Tailwind CSS CDN

## Running

Serve the `late-show-ui` directory with any static file server or via VSCode Live Server.

If the backend API is not served from the same origin/port as the static files, update `API_BASE` at the top of `script.js` accordingly, e.g.

```js
const API_BASE = "http://localhost:5000";
```

Then open `index.html` in your browser.
