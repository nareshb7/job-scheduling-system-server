const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const getAIAnswers = async (questions, roundName = "") => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `${questions}`,
      config: {
        systemInstruction: `You are an Interviwee. Your name is Naresh. Frontend developer with 3 YOE, 
          You have to answer the questions in simple lines, give me in this array format [{question: "", answer:""}], give me little brief answer , ${
            roundName ? `current round is ${roundName}` : ""
          }`,
      },
    });
    const answers = response.candidates[0].content.parts[0].text;
    const parsedAnswer =
      JSON?.parse(
        answers.slice(answers.indexOf("["), answers.indexOf("]") + 1)
      ) || [];
    return parsedAnswer;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getAIDescription = async (description) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `${description}`,
      config: {
        systemInstruction: `Hi, Your name is Naresh, Im giving you the job description, you have to concise it, give me in short format, dont add any extra information, the format should be a object like {title: "Frontend developer", role: "string", responsibilities: string[]}, like this if there is any add as key : string[] format`,
      },
    });
    const aiDescription = response.candidates[0].content.parts[0].text;
    const desc = aiDescription.slice(
      aiDescription.indexOf("{"),
      aiDescription.lastIndexOf("}") + 1
    );
    return desc ? JSON.parse(desc) : { content: desc };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getAIAnswers,
  getAIDescription,
};
