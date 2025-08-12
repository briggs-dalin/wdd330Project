export async function handler(event, context) {
  const apiUrl = "https://zenquotes.io/api/random";

  try {
    const response = await fetch(apiUrl);

    // Log response status and headers for debugging
    console.log(`ZenQuotes API response status: ${response.status}`);
    console.log(
      `ZenQuotes API response headers:`,
      JSON.stringify([...response.headers]),
    );

    // Parse JSON response body
    const data = await response.json();
    console.log("ZenQuotes API response data:", data);

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: `API error with status ${response.status}`,
          data,
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error calling ZenQuotes API:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
}
