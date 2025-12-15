// app.js
const SERVER_URL = 'http://localhost:3000/generate'; // The server endpoint

async function generateContent() {
    const inputElement = document.getElementById('userInput');
    const outputElement = document.getElementById('resultOutput');
    const prompt = inputElement.value;

    if (!prompt) {
        outputElement.innerHTML = "Please enter a topic.";
        return;
    }

    outputElement.innerHTML = "Generating...";

    try {
        // 1. Client-side JS calls YOUR secure server endpoint
        const response = await fetch(SERVER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // 2. Send the user's prompt in the request body
            body: JSON.stringify({ prompt: prompt })
        });

        const data = await response.json();

        if (response.ok) {
            // 3. Display the result returned from the server
            outputElement.innerHTML = `<strong>AI Response:</strong><pre>${data.result}</pre>`;
        } else {
            outputElement.innerHTML = `Error: ${data.error}`;
        }

    } catch (error) {
        outputElement.innerHTML = `Network Error: Could not connect to the server. Is it running?`;
        console.error("Client Fetch Error:", error);
    }
}