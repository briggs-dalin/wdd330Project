export function motivation() {
  const quoteContainer = document.getElementById("quote");
  quoteContainer.innerHTML = ""; // Clear previous quote to avoid duplicates

  fetchMotivationQuote();

  async function fetchMotivationQuote() {
    const url = "https://zenquotes.io/api/random";

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(await response.text());

      const result = await response.json();
      displayQuote(result[0]);
    } catch (error) {
      console.error("Motivational quote fetch failed:", error);
      quoteContainer.innerHTML = `
        <p class="quote">Believe you can and you're halfway there.  </p>
        <p class="author">- Theodore Roosevelt</p>
      `;
    }
  }

  function displayQuote(quoteObj) {
    const quoteHTML = `
      <p class="quote">"${quoteObj.q}"</p>
      <p class="author">- ${quoteObj.a}</p>
    `;
    quoteContainer.innerHTML = quoteHTML;
  }
}
