const API_BASE = "http://localhost:5555"; // Adjust if backend hosted elsewhere

const messageEl = document.getElementById("message");

function showMessage(text, type = "success") {
  messageEl.textContent = text;
  messageEl.className = type === "success" ? "text-green-600" : "text-red-600";
  setTimeout(() => {
    messageEl.textContent = "";
  }, 4000);
}

async function fetchJSON(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || res.statusText);
  }
  return res.json();
}

// Render Episodes
async function loadEpisodes() {
  try {
    const episodes = await fetchJSON(`${API_BASE}/episodes`);
    const tbody = document.getElementById("episodes-body");
    const episodeSelect = document.getElementById("episode-select");
    tbody.innerHTML = "";
    episodeSelect.innerHTML = "";

    episodes.forEach((ep) => {
      // table row
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="px-4 py-2 whitespace-nowrap">${ep.id}</td>
        <td class="px-4 py-2 whitespace-nowrap">${ep.title}</td>
        <td class="px-4 py-2 whitespace-nowrap">
          <button class="px-2 py-1 bg-red-600 text-white rounded delete-btn" data-id="${ep.id}">Delete</button>
        </td>`;
      tbody.appendChild(tr);

      // select option
      const option = document.createElement("option");
      option.value = ep.id;
      option.textContent = ep.title;
      episodeSelect.appendChild(option);
    });
  } catch (err) {
    showMessage(`Failed to load episodes: ${err.message}`, "error");
  }
}

// Render Guests
async function loadGuests() {
  try {
    const guests = await fetchJSON(`${API_BASE}/guests`);
    const list = document.getElementById("guests-list");
    const guestSelect = document.getElementById("guest-select");
    list.innerHTML = "";
    guestSelect.innerHTML = "";

    guests.forEach((guest) => {
      const li = document.createElement("li");
      li.textContent = `${guest.id}: ${guest.name}`;
      list.appendChild(li);

      const option = document.createElement("option");
      option.value = guest.id;
      option.textContent = guest.name;
      guestSelect.appendChild(option);
    });
  } catch (err) {
    showMessage(`Failed to load guests: ${err.message}`, "error");
  }
}

// Delete Episode
async function deleteEpisode(id) {
  if (!confirm(`Delete episode ${id}?`)) return;
  try {
    await fetchJSON(`${API_BASE}/episodes/${id}`, { method: "DELETE" });
    showMessage("Episode deleted successfully");
    loadEpisodes();
  } catch (err) {
    showMessage(`Delete failed: ${err.message}`, "error");
  }
}

// Add Appearance
async function submitAppearance(e) {
  e.preventDefault();
  const rating = document.getElementById("rating-input").value;
  const guest_id = document.getElementById("guest-select").value;
  const episode_id = document.getElementById("episode-select").value;

  try {
    await fetchJSON(`${API_BASE}/appearances`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, guest_id, episode_id }),
    });
    showMessage("Appearance added successfully");
    document.getElementById("appearance-form").reset();
  } catch (err) {
    showMessage(`Failed to add appearance: ${err.message}`, "error");
  }
}

// Event Listeners

document.addEventListener("click", (e) => {
  if (e.target.matches(".delete-btn")) {
    const id = e.target.dataset.id;
    deleteEpisode(id);
  }
});

document.getElementById("appearance-form").addEventListener("submit", submitAppearance);

// Initial load
loadEpisodes();
loadGuests();
