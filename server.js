import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, JS, MD) from the current directory
app.use(express.static(__dirname));

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/grade', async (req, res) => {
    try {
        const { topicTitle, questionsAndAnswers } = req.body;
        
        if (!topicTitle || !questionsAndAnswers || !Array.isArray(questionsAndAnswers)) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        const prompt = `
        You are an expert technical tutor evaluating a student's answers for the topic: "${topicTitle}".
        
        The student was asked the following questions and provided the following answers:
        ${questionsAndAnswers.map((qa, index) => `
        Question ${index + 1}: ${qa.question}
        Student's Answer: ${qa.answer}
        `).join('\n')}

        Your task is to evaluate the student's answers based on accuracy, depth of understanding, and practical application.
        Do NOT be overly strict on grammar, but ensure the technical concepts are correct.

        You must return a JSON response with the following structure:
        {
            "passed": boolean, // true if the user generally understood the core concepts across all questions, false if they made significant fundamental errors.
            "feedback": "string" // A constructive, polite message explaining what they got right, detailing any mistakes they made, and providing the correct intuition for those mistakes. If they failed, recommend they re-study. Keep it concise but deeply educational.
        }
        
        Respond ONLY with valid JSON. Do not include markdown formatting or backticks around the JSON.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        const jsonText = response.text;
        const result = JSON.parse(jsonText);
        
        res.json(result);

    } catch (error) {
        console.error('Grading Error:', error);
        res.status(500).json({ error: 'Failed to grade answers. Please check server logs.' });
    }
});

app.post('/api/verdict', async (req, res) => {
    try {
        const { subjectTitle, performanceHistory } = req.body;
        
        if (!subjectTitle || !performanceHistory) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        const prompt = `
        You are a senior technical mentor evaluating a student who has just completed the entire curriculum for: "${subjectTitle}".
        
        Here is their performance history across all topics in this subject:
        ${performanceHistory.map((ph) => `
        Topic: ${ph.topicTitle}
        Passed on first try: ${ph.passed}
        AI Tutor Feedback received: ${ph.feedback}
        `).join('\n')}

        Your task is to provide a final "Verdict Report" on their overall performance.
        Give them a personalized assessment detailing how good they are at this technology, what their strengths seem to be based on the feedback, and any final words of advice for their career in this field.

        You must return a JSON response with the following structure:
        {
            "verdictTitle": "string", // A catchy title for their performance (e.g. "Solid Foundation", "Exceptional Mastery")
            "verdictMessage": "string" // A detailed 2-3 paragraph message with the final assessment.
        }
        
        Respond ONLY with valid JSON.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        const jsonText = response.text;
        const result = JSON.parse(jsonText);
        
        res.json(result);

    } catch (error) {
        console.error('Verdict Error:', error);
        res.status(500).json({ error: 'Failed to generate verdict. Please check server logs.' });
    }
});

app.listen(port, () => {
    console.log(`Curriculum AI Backend listening at http://localhost:${port}`);
});
