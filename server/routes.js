const router = require('express').Router();
const { getAllQuestions, getAllAnswers, postQuestion, postAnswer } = require('./controllers.js');

// GET - Question and Answer data for a single product
router.get('/qa/questions', getAllQuestions);
router.get('/qa/questions/:question_id/answers', getAllAnswers);
router.post('/qa/questions', postQuestion);
router.post('/qa/questions/:question_id/answers', postAnswer);

module.exports = router;