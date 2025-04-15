const { STATUS_CODES } = require("../constants");
const { GoogleGenAI } = require("@google/genai");
const { InterviewQuestionModel } = require("../models/InterviewQuestionsModel");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const getInterviewQuestionsByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await InterviewQuestionModel.find({ userId: id });
    res.status(STATUS_CODES.SUCCESS).json({ success: true, data });
  } catch (err) {
    res.status(STATUS_CODES.ERROR).json(err.message);
  }
};

const addNewQuestion = async (req, res) => {
  try {
    let { question, answer, userId } = req.body;
    if (!answer) {
      const [aiAnswer] = await getAnswers(question);
      question = aiAnswer?.question || question;
      answer = aiAnswer.answer || answer;
    }
    const data = await InterviewQuestionModel.create({
      userId,
      company: "User",
      question,
      answer,
    });
    res.status(STATUS_CODES.SUCCESS).json({ success: true, data });
  } catch (err) {
    res.status(STATUS_CODES.ERROR).json(err.message);
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await InterviewQuestionModel.findByIdAndDelete(id);
    res.status(STATUS_CODES.SUCCESS).json({ success: true, data });
  } catch (err) {
    res.status(STATUS_CODES.ERROR).json(err.message);
  }
};

const getAnswers = async (questions) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `${questions}`,
      config: {
        systemInstruction: `You are an Interviwee. Your name is Naresh. Frontend developer with 3 YOE, 
        You have to answer the questions in simple lines, give me in this array format [{question: "", answer:""}], give me little brief answer `,
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
// seperare each question and answer with END keyword,
// i will give you the description of questions give me the questions frst by putting QUESTIONS keyword and give me the answers next by putting ANSWERS key word and same each question and answer end with END keyword
module.exports = {
  getInterviewQuestionsByUserId,
  addNewQuestion,
  getAnswers,
  deleteQuestion,
};
