import { aboutModal } from "./aboutModal.js";
import { exercise } from "./exercise.js";
import { motivation } from "./motivation.js";
import { setupFavoriteMuscle } from "./myWorkout.js";

document.addEventListener("DOMContentLoaded", async () => {
  aboutModal();
  motivation();

  // Load options before wiring up favorite selection (so it visibly selects)
  await loadMuscleGroups();
  setupFavoriteMuscle();

  // Wire up exercise form last
  exercise();
});

async function loadMuscleGroups() {
  const muscleSelect = document.getElementById("muscle-group");

  try {
    const response = await fetch("./data/muscleOptions.json");
    if (!response.ok) throw new Error("Failed to load muscle groups");

    const data = await response.json();

    muscleSelect.innerHTML =
      '<option value="">-- Select a Muscle Group --</option>';

    data.muscleGroups.forEach((muscle) => {
      const option = document.createElement("option");
      option.value = muscle.value;
      option.textContent = muscle.name;
      muscleSelect.appendChild(option);
    });

    muscleSelect.disabled = false;
  } catch (error) {
    console.error(error);
    muscleSelect.innerHTML =
      '<option value="">Failed to load muscle groups</option>';
    muscleSelect.disabled = true;
  }
}
