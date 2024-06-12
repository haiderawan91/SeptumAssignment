const fs = require('fs');
const path = require('path');

// Helper function to update the questions in questions.json file
const updateQuestions = async (questionData) => {
  try {
    const questionsFilePath = path.join(__dirname, '..', 'src', 'questions.json');
    const questions = JSON.parse(fs.readFileSync(questionsFilePath, 'utf8'));

    // Add difficulty validation here if needed
    const { id, question, options, correct_answer, difficulty } = questionData;
    const newQuestion = {
      id,
      question,
      options,
      correct_answer,
      difficulty
    };

    questions.questions.push(newQuestion);
    
    fs.writeFileSync(questionsFilePath, JSON.stringify(questions, null, 2), 'utf8');
    
    return { success: true, message: 'Question added successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to add question', error: error.message };
  }
};

module.exports = { updateQuestions };
