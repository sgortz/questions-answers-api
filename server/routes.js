const router = require('express').Router();
const { getAllQuestions, 
    getAllAnswers, 
    postQuestion, 
    postAnswer, 
    helpfulQuestion, 
    helpfulAnswer, 
    reportQuestion, 
    reportAnswer } = require('./controllers.js');

// GET - Question and Answer data for a single product
router.get('/qa/questions', getAllQuestions);
router.get('/qa/questions/:question_id/answers', getAllAnswers);
router.post('/qa/questions', postQuestion);
router.post('/qa/questions/:question_id/answers', postAnswer); 
router.put('/qa/questions/:question_id/helpful', helpfulQuestion);
router.put('/qa/questions/:answer_id/helpful', helpfulAnswer);
router.put('/qa/questions/:question_id/report', reportQuestion);
router.put('/qa/questions/:answer_id/report', reportAnswer);

module.exports = router;