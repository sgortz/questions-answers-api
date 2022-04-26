const { getQuestions, 
  getAnswers, 
  addQuestion, 
  addAnswer, 
  updateHelpfulQuestion, 
  updateHelpfulAnswer, 
  updateReportedQuestion, 
  updateReportedAnswer } = require('./models.js');

module.exports = {
  getAllQuestions: function (req, res) {
    let { product_id, page, count } = req.query;

    getQuestions(product_id, page, count, (err, response) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.status(200).send(response);
      }
    })
  },

  getAllAnswers: function (req, res) { },

  postQuestion: function (req, res) {
    let info = req.body;

    addQuestion(info, (err, response) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.status(201).send(response);
      }
    });
  }, //DONE

  postAnswer: function (req, res) {
    let info = req.body;
    let { question_id } = req.params;

    addAnswer(info, question_id, (err, response) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.status(201).send(response);
      }
    });
  },

  helpfulQuestion: function (req, res) {
    let { question_id } = req.params;

    updateHelpfulQuestion(question_id, (err, response) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(204);
      }
    });
  }, //DONE BUT DOUBLE-CHECK

  helpfulAnswer: function (req, res) {
    let { answer_id } = req.params;

    updateHelpfulAnswer(answer_id, (err, response) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(204);
      }
    });
  }, //DONE BUT DOUBLE-CHECK (route)

  reportQuestion: function (req, res) {
    let { question_id } = req.params;

    updateReportedQuestion(question_id, (err, response) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(204);
      }
    });
  }, //DONE
  
  reportAnswer: function (req, res) {
    let { answer_id } = req.params;

    updateReportedAnswer(answer_id, (err, response) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(204);
      }
    });
  }, //DONE

}