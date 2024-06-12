const fs = require('fs');
const path = require('path');

// Helper function to update the questions in questions.json file
const updateQuestions = async (questionData) => {
  try {

    const questionsFilePath = path.join(__dirname, 'questions.json');
    const questions = await  JSON.parse(fs.readFileSync(questionsFilePath, 'utf8'));


    questions.questions.push(questionData);

    await fs.writeFileSync(questionsFilePath, JSON.stringify(questions, null, 2), 'utf8');

    return { success: true, message: 'Question added successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to add question', error: error.message };
  }
};

module.exports = { updateQuestions };