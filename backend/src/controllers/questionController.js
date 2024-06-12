const fs = require('fs');
const path = require('path');
const {updateQuestions} = require('../helperFunctions');

exports.getQuestions = async (req, res) => {
  try {
    const questionsFilePath = path.join(__dirname, '..', 'questions.json');
    const questions = JSON.parse(fs.readFileSync(questionsFilePath, 'utf8')).questions;
    
    const { difficulty } = req.query;
    if (difficulty) {
      const filteredQuestions = questions.filter(q => q.difficulty === difficulty);
      res.status(200).json(filteredQuestions);
    } else {
      res.status(200).json(questions);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.checkAnswer = async (req, res) => {
  try {
    const { questionId, userAnswer } = req.body;
    const questionsFilePath = path.join(__dirname, '..', 'questions.json');
    const questions = JSON.parse(fs.readFileSync(questionsFilePath, 'utf8')).questions;
    const question = questions.find(q => q.id == questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    const isCorrect = question.correct_answer.toLowerCase() === userAnswer.toLowerCase();
    res.json({ questionId, isCorrect });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

exports.addQuestion = async (req, res) => {
  try {
    const { question, options, correct_answer, difficulty } = req.body;

    // Validate the required fields
    if (!question || !options || !correct_answer || !difficulty) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const newQuestion = {
      id: Date.now(),
      question,
      options: JSON.parse(options),
      correct_answer,
      difficulty
    };

    const result = await updateQuestions(newQuestion);

    if (result.success) {
      res.status(201).json({ success: true, message: 'Question added successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to add question', error: result.error });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred', error: error.message });
  }
};
