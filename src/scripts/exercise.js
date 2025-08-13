const exerciseApiKey = import.meta.env.VITE_EXERCISEDB_API_KEY;

if (!exerciseApiKey) {
  console.error(
    "API key is missing. Set VITE_EXERCISEDB_API_KEY in .env for dev and on Netlify for prod."
  );
}

export function exercise() {
  // ✅ Match the ID used in index.html
  const exerciseForm = document.getElementById("exerciseForm");
  const exerciseResults = document.querySelector(".cards");

  if (!exerciseForm) {
    console.error("exerciseForm element not found.");
    return;
  }

  exerciseForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const muscleGroup = document.getElementById("muscle-group")?.value || "";
    const difficulty = document.getElementById("difficulty")?.value || "";

    if (!muscleGroup) {
      exerciseResults.innerHTML =
        `<p style="color:#b00020;">Please select a muscle group first.</p>`;
      return;
    }

    await exerciseApiFetch({ muscleGroup, difficulty, exerciseResults });
  });
}

async function exerciseApiFetch({ muscleGroup, difficulty, exerciseResults }) {
  if (!exerciseApiKey) {
    exerciseResults.innerHTML =
      `<p style="color:#b00020;">API key missing. Please check your configuration.</p>`;
    return;
  }

  const apiUrl = `https://exercisedb.p.rapidapi.com/exercises/target/${encodeURIComponent(
    muscleGroup
  )}`;

  try {
    exerciseResults.innerHTML = `<p>Loading exercises…</p>`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "x-rapidapi-key": exerciseApiKey,
        "x-rapidapi-host": "exercisedb.p.rapidapi.com",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    // Optionally limit how many we render (keeps UI snappy)
    const limited = Array.isArray(data) ? data.slice(0, 12) : [];
    displayExercises(limited, exerciseResults, difficulty);
  } catch (error) {
    console.error("Error fetching exercises:", error);
    exerciseResults.innerHTML =
      `<p style="color:#b00020;">Error fetching data. Please try again later.</p>`;
  }
}

function displayExercises(exercises, container, chosenDifficulty) {
  container.innerHTML = "";

  if (!Array.isArray(exercises) || exercises.length === 0) {
    container.innerHTML =
      "<p>No exercises found for this muscle group.</p>";
    return;
  }

  const frag = document.createDocumentFragment();

  exercises.forEach((currentExercise) => {
    // ExerciseDB doesn't provide a difficulty field;
    // we display what the user chose so it “feels” applied.
    const difficultyText = chosenDifficulty || "Any / Unknown";

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${currentExercise.name}</h3>
      <div class="card-info">
        <div class="card1">
          <img src="${currentExercise.gifUrl}" alt="${currentExercise.name}" loading="lazy" style="max-width:180px; height:auto;">
        </div>
        <div class="card2">
          <p><strong>Target:</strong> ${currentExercise.target}</p>
          <p><strong>Body Part:</strong> ${currentExercise.bodyPart}</p>
          <p><strong>Equipment:</strong> ${currentExercise.equipment}</p>
          <p><strong>Difficulty (selected):</strong> ${difficultyText}</p>
        </div>
      </div>
    `;

    frag.appendChild(card);
  });

  container.appendChild(frag);
}
