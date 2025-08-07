export function motivation() {
  fetchMotivationQuote();

  async function fetchMotivationQuote() {
    const url = "https://zenquotes.io/api/random";

    try {
      const response = await fetch(url);
      if (response.ok) {
        const result = await response.json();
        displayQuote(result[0]);
      } else {
        throw new Error(await response.text());
      }
    } catch (error) {
      console.error("Motivational quote fetch failed:", error);
      document.getElementById("quote").innerHTML = `
        <p class="quote">Keep going! You're doing great!</p>
      `;
    }
  }

  function displayQuote(quoteObj) {
    const quoteHTML = `
      <p class="quote">"${quoteObj.q}"</p>
      <p class="author">- ${quoteObj.a}</p>
    `;
    document.getElementById("quote").innerHTML = quoteHTML;
  }
}
