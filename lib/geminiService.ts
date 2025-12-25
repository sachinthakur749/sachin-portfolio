import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the AI assistant for Sachin Kumar Thakur, a professional Frontend Developer based in Bhaktapur/Lalitpur, Nepal.
Sachin has a Bachelor's degree in IT from Texas College of Management and IT.
His core stack includes ReactJS, NextJS, NodeJs, and TypeScript.
He has worked at CoreDreams Innovations, Aeon Soft Solution, and Supreme IT Solutions.
Key projects include A TO Z DISPATCH (Ride Scheduling), TUTEELINE (Education Platform), and TECHNICAL SEWA (Repair Services).
Be professional, concise, and helpful. If someone asks about hiring him, guide them to the contact section or his email: sachinthakur9983@gmail.com.
Mention his expertise in modern frontend tools like Zustand, React Query, and Tailwind CSS.
`;

export async function askAI(query: string) {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_AI_AGENT,
    });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "I'm having a bit of trouble connecting to Sachin's neural network. Please try again or contact him directly!";
  }
}
