// src/pages/api/generate-itinerary.js
import openai from "../../src/lib/openai";

export default async function handler(req, res) {
  const { country, state, city, days } = req.body;

  if (!state || !city || !days) {
    return res.status(400).json({ error: "Missing input parameters" });
  }

  const prompt = `Generate a ${days}-day travel itinerary for a trip to ${city}, ${state}, ${country}. The user wants to explore the city in ${days} days.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4", // Using the appropriate model (gpt-3.5-turbo or gpt-4)
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,  // Controls the length of the response
      temperature: 0.7,  // Controls randomness
    });

    const itinerary = response.choices[0].message.content.trim();
    res.status(200).json({ itinerary });
  } catch (error) {
    console.error("Error generating itinerary:", error);
    res.status(500).json({ error: "Failed to generate itinerary." });
  }
}
