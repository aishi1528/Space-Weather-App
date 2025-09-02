const eventsContainer = document.getElementById("events");
const fetchBtn = document.getElementById("fetchEvents");

// NASA DONKI API - Space Weather Events
const API_KEY = "BdVsfIZzrsQuAbGVnbj22fkzu8v2Yx61LckVZPxM"; 
const API_URL = `https://api.nasa.gov/DONKI/notifications?api_key=${API_KEY}`;

async function fetchSpaceWeather() {
  eventsContainer.innerHTML = "<p>Loading events...</p>";

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    if (data.length === 0) {
      eventsContainer.innerHTML = "<p>No recent space weather events found 🌌</p>";
      return;
    }

    eventsContainer.innerHTML = "";

    data.slice(0, 5).forEach(event => {
      const card = document.createElement("div");
      card.className = "event-card";
      card.innerHTML = `
        <h3>${event.messageType || "Space Weather Event"}</h3>
        <p><strong>Date:</strong> ${event.messageIssueTime}</p>
        <p><strong>Source:</strong> ${event.messageURL ? `<a href="${event.messageURL}" target="_blank">Read more</a>` : "N/A"}</p>
        <p>${event.messageBody.slice(0, 250)}...</p>
      `;
      eventsContainer.appendChild(card);
    });

  } catch (error) {
    eventsContainer.innerHTML = "<p>⚠️ Failed to load space weather data.</p>";
    console.error(error);
  }
}

fetchBtn.addEventListener("click", fetchSpaceWeather);
