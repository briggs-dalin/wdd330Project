import { motivation } from "./motivation.js";

export function exercise() {
  const form = document.getElementById("exerciseForm");
  if (!form) {
    console.error("exerciseForm not found");
    return;
  }
  console.log("Adding submit event listener to exerciseForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("exerciseForm submitted");

    const muscle = document.getElementById("muscle").value.trim();
    const searchTerm = document.getElementById("exerciseType").value.trim();

    motivation(); // Show motivation
    exerciseApiFetch(searchTerm, muscle); // Fetch workouts
  });
}

async function exerciseApiFetch(searchTerm, muscle, difficulty) {
  console.log("Fetching from ExerciseDB API...");

  const apiKey = import.meta.env.VITE_EXERCISEDB_API_KEY;

  const url = `https://exercisedb.p.rapidapi.com/exercises/target/${muscle.toLowerCase()}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    const filtered = result.filter((ex) => {
      const matchesSearchTerm = !searchTerm || ex.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = !difficulty || (ex.difficulty && ex.difficulty.toLowerCase() === difficulty.toLowerCase());
      return matchesSearchTerm && matchesDifficulty;
    });

    displayResults(filtered);
  } catch (error) {
    console.error("Error fetching exercises:", error);
    displayError("Failed to fetch exercises. Please try again later.");
  }
}

function displayResults(result) {
  const container = document.querySelector(".cards");

  if (!result || result.length === 0) {
    container.innerHTML = `
      <article class="card card-error">
        <h2>No Results</h2>
        <p>We couldn't find exercises with those filters. Try something else!</p>
      </article>
    `;
    return;
  }

  const cardsHTML = result
    .map((workout) => {
      const diffClass = getDifficultyClass(workout.difficulty);
      return `
        <article class="card">
          <h2>${capitalize(workout.name)}</h2>
          <div class="card-info">
            <div class="card1">
              <ul>
                <li><strong>Difficulty:</strong> <span class="${diffClass}">
                  ${workout.difficulty ? capitalize(workout.difficulty) : "Unknown"}
                </span></li>
                <li><strong>Equipment:</strong> ${capitalize(workout.equipment)}</li>
                <li><strong>Body Part:</strong> ${capitalize(workout.bodyPart)}</li>
                <li><strong>Target Muscle:</strong> ${capitalize(workout.target)}</li>
              </ul>
            </div>
            <div class="card2">
              <p><strong>Instructions:</strong> Perform this exercise with proper form and control to target your <strong>${capitalize(workout.target)}</strong>. (Detailed instructions not provided by API.)</p>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  container.innerHTML = cardsHTML;
}

function displayError(message) {
  document.querySelector(".cards").innerHTML = `
    <article class="card card-error">
      <h2>Error</h2>
      <p>${message}</p>
    </article>
  `;
}

// Helper Functions
function getDifficultyClass(difficulty) {
  if (!difficulty) return "";
  const diff = difficulty.toLowerCase();
  if (diff === "beginner") return "beginner";
  if (diff === "intermediate") return "intermediate";
  if (diff === "expert") return "expert";
  return "";
}

function capitalize(word) {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : "Unknown";
}
