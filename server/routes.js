const router = require('express').Router();
const { getAllQA } = require('./controllers.js');

// GET - Question and Answer data for a single product

router.get('/qa/questions', getAllQA);

module.exports = router;