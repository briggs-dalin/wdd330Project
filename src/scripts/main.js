import { aboutModal } from "./aboutModal.js";
import { exercise } from "./exercise.js";
import { motivation } from "./motivation.js";

aboutModal();
exercise();


async function loadMuscleGroups() {
  const muscleSelect = document.getElementById("muscle");

  try {
    const response = await fetch("../data/muscleOptions.json");
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

document.addEventListener("DOMContentLoaded", () => {
  loadMuscleGroups();
  motivation();
});
