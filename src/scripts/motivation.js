export function motivation() {
  fetchMotivationQuote();

  async function fetchMotivationQuote() {
    const url = "/.netlify/functions/fetchQuote";

    try {
      const response = await fetch(url);
      if (response.ok) {
        const result = await response.json();
        if (result && result[0]) {
          displayQuote(result[0]);
        } else {
          throw new Error("No quote data found");
        }
      } else {
        throw new Error(`API error: ${response.status}`);
      }
    } catch (error) {
      console.error("Motivational quote fetch failed:", error);
      displayFallbackQuote();
    }
  }

  function displayQuote(quoteObj) {
    const quoteHTML = `
      <p class="quote">"${quoteObj.q}"</p>
      <p class="author">- ${quoteObj.a}</p>
    `;
    document.getElementById("quote").innerHTML = quoteHTML;
  }

  function displayFallbackQuote() {
    const fallbackHTML = `
      <p class="quote">Keep going! You're doing great!</p>
      <p class="author">- Your Workout Buddy</p>
    `;
    document.getElementById("quote").innerHTML = fallbackHTML;
  }
}
