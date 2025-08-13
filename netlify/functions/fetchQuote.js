export const handler = async (event, context) => {
  const apiUrl = "https://zenquotes.io/api/random";

  try {
    const response = await fetch(apiUrl);

    
    console.log(`ZenQuotes API response status: ${response.status}`);
    console.log(
      `ZenQuotes API response headers:`,
      JSON.stringify([...response.headers]),
    );

    if (!response.ok) {
      const errorBody = await response.text(); 
      return {
        statusCode: response.status,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          error: `API error with status ${response.status}`,
          body: errorBody,
        }),
      };
    }

    const data = await response.json();
    console.log("ZenQuotes API response data:", data);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error calling ZenQuotes API:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
