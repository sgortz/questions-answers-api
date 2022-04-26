const router = require('express').Router();
const { 
    getAllQuestions, 
    getAllAnswers, 
    postQuestion, 
    postAnswer, 
    helpfulQuestion, 
    helpfulAnswer, 
    reportQuestion, 
    reportAnswer
} = require('./controllers.js');

// GET - Question and Answer data for a single product
router.get('/qa/questions', getAllQuestions);
router.get('/qa/questions/:question_id/answers', getAllAnswers);
router.post('/qa/questions', postQuestion); //DONE
router.post('/qa/answers/:question_id/answers', postAnswer); //DONE
router.put('/qa/questions/:question_id/helpful', helpfulQuestion); //DONE
router.put('/qa/answers/:answer_id/helpful', helpfulAnswer); //DONE
router.put('/qa/questions/:question_id/report', reportQuestion); //DONE
router.put('/qa/answers/:answer_id/report', reportAnswer); //DONE

module.exports = router;