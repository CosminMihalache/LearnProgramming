const { GoogleGenerativeAI } = require("@google/generative-ai");

// Check if API key exists
if (!process.env.GOOGLE_AI_API_KEY) {
  console.error('GOOGLE_AI_API_KEY is not defined in environment variables');
  process.exit(1);
}

// Initialize the AI model
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// Define the chat model
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Romanian context for the AI
const systemContext = `
Ești un asistent AI pentru o platformă educațională care predă programare și inteligență artificială.
Rolul tău este să:
- Ajuți utilizatorii să învețe concepte de programare
- Oferi informații despre cursurile noastre (Python, JavaScript, AI)
- Dai explicații clare și concise
- Fii prietenos și încurajator
- Răspunzi DOAR în limba română
- Dacă nu înțelegi o întrebare, ceri clarificări politicos

Important: Toate răspunsurile tale TREBUIE să fie în limba română, indiferent de limba în care primești întrebarea.
`;

async function generateResponse(prompt) {
  try {
    const fullPrompt = `${systemContext}\n\nÎntrebare: ${prompt}\n\nRăspuns:`;
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Google AI Error:', error);
    return 'Îmi pare rău, am întâmpinat o eroare. Vă rog să încercați din nou.';
  }
}

module.exports = { generateResponse }; 