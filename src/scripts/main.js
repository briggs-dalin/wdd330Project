import { aboutModal } from "./aboutModal.js";
import { exercise } from "./exercise.js";

// Call the aboutModal and exercise setup functions
aboutModal();
exercise();

async function loadMuscleGroups() {
  const muscleSelect = document.getElementById("muscle");

  try {
    const response = await fetch("../data/muscleOptions.json");
    if (!response.ok) throw new Error("Failed to load muscle groups");

    const data = await response.json();

    // Clear existing options and add default
    muscleSelect.innerHTML =
      '<option value="">-- Select a Muscle Group --</option>';

    // Populate muscle groups from JSON
    data.muscleGroups.forEach((muscle) => {
      const option = document.createElement("option");
      option.value = muscle.value;
      option.textContent = muscle.name;
      muscleSelect.appendChild(option);
    });

    muscleSelect.disabled = false; // Enable dropdown after loading
  } catch (error) {
    console.error(error);
    muscleSelect.innerHTML =
      '<option value="">Failed to load muscle groups</option>';
    muscleSelect.disabled = true;
  }
}

// Wait for DOM content loaded before trying to manipulate the DOM
document.addEventListener("DOMContentLoaded", () => {
  loadMuscleGroups();
});
