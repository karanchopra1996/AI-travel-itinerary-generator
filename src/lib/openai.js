// lib/openai.js
import { OpenAI } from "openai";  // Import OpenAI class from the package

// Initialize OpenAI client with the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Your OpenAI API key from .env.local
});

export default openai;
