const exerciseApiKey = import.meta.env.VITE_EXERCISEDB_API_KEY;

if (!exerciseApiKey) {
  console.error("API key is missing. Set VITE_EXERCISEDB_API_KEY in .env for dev and on Netlify for prod.");
}

export function exercise() {
  const exerciseForm = document.getElementById("exercise-form");
  const exerciseResults = document.querySelector(".cards");

  if (!exerciseForm) {
    console.error("exercise-form element not found.");
    return;
  }

  exerciseForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const muscleGroup = document.getElementById("muscle-group").value; // matches main.js dropdown
    await exerciseApiFetch(muscleGroup, exerciseResults);
  });
}

async function exerciseApiFetch(muscleGroup, exerciseResults) {
  if (!exerciseApiKey) {
    exerciseResults.innerHTML = `<p style="color:red;">API key missing. Please check your configuration.</p>`;
    return;
  }

  const apiUrl = `https://exercisedb.p.rapidapi.com/exercises/target/${encodeURIComponent(muscleGroup)}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "x-rapidapi-key": exerciseApiKey,
        "x-rapidapi-host": "exercisedb.p.rapidapi.com"
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    displayExercises(data, exerciseResults);
  } catch (error) {
    console.error("Error fetching exercises:", error);
    exerciseResults.innerHTML = `<p style="color:red;">Error fetching data. Please try again later.</p>`;
  }
}

function displayExercises(exercises, container) {
  container.innerHTML = "";

  if (!Array.isArray(exercises) || exercises.length === 0) {
    container.innerHTML = "<p>No exercises found for this muscle group.</p>";
    return;
  }

  exercises.forEach(exercise => {
    const difficulty = exercise.difficulty || "Unknown";

    const exerciseCard = document.createElement("div");
    exerciseCard.classList.add("exercise-card");
    exerciseCard.innerHTML = `
      <h3>${exercise.name}</h3>
      <p><strong>Target:</strong> ${exercise.target}</p>
      <p><strong>Difficulty:</strong> ${difficulty}</p>
      <img src="${exercise.gifUrl}" alt="${exercise.name}" loading="lazy">
    `;
    container.appendChild(exerciseCard);
  });
}
