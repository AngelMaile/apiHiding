// server/index.js
import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { OpenAI } from 'openai';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON requests

// Get API Key securely from the environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; 

// Initialize OpenAI Client
// It will automatically use the environment variable if present
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY 
});


app.post('/generate', async (req, res) => {
    // 1. Get the user input (the prompt) from the client-side request body
    const { prompt } = req.body; 

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required." });
    }

    try {
        // 2. Make the secure API call on the server side
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {"role": "system", "content": "You are a helpful and creative text generation assistant."},
                {"role": "user", "content": prompt}
            ]
        });

        // 3. Send the AI response back to the client-side
        res.json({ result: completion.choices[0].message.content });

    } catch (error) {
        console.error("OpenAI API Error:", error);
        res.status(500).json({ error: "Failed to generate content." });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});