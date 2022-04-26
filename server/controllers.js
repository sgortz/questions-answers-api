const {
  getQuestions,
  getAnswers,
  addQuestion,
  addAnswer,
  updateHelpfulQuestion,
  updateHelpfulAnswer,
  updateReportedQuestion,
  updateReportedAnswer
} = require('./models.js');

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

  getAllAnswers: function (req, res) {
    console.log('Answer list coming in!', req.params, req.query);
    let { question_id } = req.params;
    let { page, count } = req.query;
    getAnswers(question_id, page, count, (err, response) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.status(200).send(response);
      }
    })
  },

  postQuestion: function (req, res) {
    let info = req.body;

    addQuestion(info, (err, response) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.status(201).send(response);
      }
    });
  },

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
  },

  helpfulAnswer: function (req, res) {
    let { answer_id } = req.params;

    updateHelpfulAnswer(answer_id, (err, response) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(204);
      }
    });
  },

  reportQuestion: function (req, res) {
    let { question_id } = req.params;

    updateReportedQuestion(question_id, (err, response) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(204);
      }
    });
  },

  reportAnswer: function (req, res) {
    let { answer_id } = req.params;

    updateReportedAnswer(answer_id, (err, response) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(204);
      }
    });
  }
}