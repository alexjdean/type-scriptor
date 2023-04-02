export async function generateDocumentation(query: string, apiKey: string) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": query}]
      })
    });
    
    const data = await response.json();
    let updatedCode = data.choices[0].message.content;
    return updatedCode
}
