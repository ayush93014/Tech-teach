import Groq from "groq-sdk";

const apiKey = process.env.GROQ_API_KEY;

export async function getClaudeSuggestion({
  question,
  subject,
}: {
  question: string;
  subject: string;
}) {
  if (!apiKey) {
    return "AI suggestion unavailable because GROQ_API_KEY is not configured.";
  }

  const groq = new Groq({ apiKey });
  const systemPrompt = `You are a helpful university professor assistant at NIT Sikkim.
A student has asked the following doubt in a ${subject} lecture.
Give a clear, concise, step-by-step explanation suitable for an engineering student.
Keep it under 200 words.`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 350,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: question },
    ],
  });

  return (
    response.choices[0]?.message?.content ??
    "AI suggestion unavailable at this moment."
  );
}
