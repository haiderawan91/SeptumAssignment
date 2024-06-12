const express = require('express');
const { getQuestions, checkAnswer, addQuestion } = require('../controllers/questionController');

const router = express.Router();

router.get('/getQuestions', getQuestions);
router.post('/checkAnswer', checkAnswer);
router.post('/addQuestion',addQuestion );

module.exports = router;
