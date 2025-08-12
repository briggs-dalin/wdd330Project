export function setupFavoriteMuscle() {
  const muscleInput = document.getElementById("muscle");
  const saveButton = document.getElementById("saveFavoriteMuscle");

  if (!muscleInput || !saveButton) {
    console.warn("Muscle input or save button not found in the DOM.");
    return;
  }

  // Load saved muscle on page load
  const favoriteMuscle = localStorage.getItem("favoriteMuscle");
  if (favoriteMuscle) {
    muscleInput.value = favoriteMuscle;

    // Highlight muscle buttons if any
    const muscleButtons = document.querySelectorAll(".button-muscle");
    muscleButtons.forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.getAttribute("data-muscle") === favoriteMuscle,
      );
    });
  }

  // Save button click handler
  saveButton.addEventListener("click", () => {
    const selectedMuscle = muscleInput.value.trim();

    if (selectedMuscle) {
      localStorage.setItem("favoriteMuscle", selectedMuscle);

      // Highlight buttons accordingly
      const muscleButtons = document.querySelectorAll(".button-muscle");
      muscleButtons.forEach((btn) => {
        btn.classList.toggle(
          "active",
          btn.getAttribute("data-muscle") === selectedMuscle,
        );
      });

      alert(`Saved favorite muscle: ${selectedMuscle}`);
    } else {
      alert("Please select a muscle before saving.");
    }
  });
}
