import { motivation } from "./motivation";

export function exercise() {
  document
    .getElementById("exerciseForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const muscle = document.getElementById("muscle").value.trim();
      const searchTerm = document.getElementById("exerciseType").value.trim(); // renamed to searchTerm
      motivation();
      exerciseApiFetch(searchTerm, muscle);
    });
}

async function exerciseApiFetch(searchTerm, muscle) {
  console.log("Fetching from ExerciseDB API...");

  const url = `https://exercisedb.p.rapidapi.com/exercises/target/${muscle.toLowerCase()}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9ff379a01cmsh0029cf3a9b8825ep1d461ajsn8d027b8bc331", // It's not live yet, just setting here for now
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    const filtered = result.filter(
      (ex) =>
        !searchTerm || ex.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    displayResults(filtered);
  } catch (error) {
    console.error("Error fetching exercises:", error);
    document.querySelector(".cards").innerHTML =
      `<p>Failed to fetch exercises. Try again later.</p>`;
  }
}

function displayResults(result) {
  if (result.length === 0) {
    document.querySelector(".cards").innerHTML =
      `<p>No exercises found. Try different filters.</p>`;
    return;
  }

  let cardsHTML = "";

  result.forEach((workout) => {
    const workoutCardTemplate = `
            <article class="card">
                <h2>${workout.name}</h2>
                <ul>
                    <li><strong>Equipment:</strong> ${workout.equipment}</li>
                    <li><strong>Target Muscle:</strong> ${workout.target}</li>
                    <li><strong>Body Part:</strong> ${workout.bodyPart}</li>
                </ul>
                <img src="${workout.gifUrl}" alt="Exercise gif for ${workout.name}" loading="lazy" />
            </article>
        `;
    cardsHTML += workoutCardTemplate;
  });

  document.querySelector(".cards").innerHTML = cardsHTML;
}
