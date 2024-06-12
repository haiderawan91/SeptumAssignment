const fs = require('fs');
const path = require('path');
const { updateQuestions } = require('../helperFunctions');

exports.getQuestions = async (req, res) => {
  try {
    const questionsFilePath =  path.join(__dirname,'..','questions.json');
const questions = await JSON.parse(fs.readFileSync(questionsFilePath, 'utf8'));
    res.status(201).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.checkAnswer  = async (req, res) => {
  try {
    const { questionId, userAnswer } = req.body;
    console.log(questionId, userAnswer)
    const questionsFilePath =  path.join(__dirname,'..','questions.json');
    const questions =  await JSON.parse(fs.readFileSync(questionsFilePath, 'utf8'));
    const question = questions.questions.find(q =>
      q.id == questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    const isCorrect = question.correct_answer === userAnswer;
    res.json({ questionId, isCorrect });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

exports.addQuestion = (req, res) => {
  try {
    const { question, options, correct_answer } = req.body;
    if (!question || !options || !correct_answer) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

 
    const newQuestion = {
      id: Date.now(),
      question:question,
      options:JSON.parse(options),
      correct_answer:correct_answer
    };

   
    const result = updateQuestions(newQuestion);

    if (result.success) {
      res.status(201).json({ success: true, message: 'Question added successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to add question', error: result.error });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred', error: error.message });
  }
};


