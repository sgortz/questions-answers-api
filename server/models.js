const { 
  testForGet, 
  questionsList, 
  answersList, 
  insertQuestion, 
  insertAnswer, 
  addHelpfulQuestion,
  addHelpfulAnswer, 
  markReportedQuestion,
  markReportedAnswer 
} = require('../database/db.js');

module.exports = {
  getQuestions: function (product_id, page, count, callback) {
    let limit = page * count;
    // return testForGet(product_id, limit)
      return questionsList(product_id, limit)
      .then(response => {
        let output =  response.rows[0];
        output.product_id = product_id;
        callback(null, output);
      })
      .catch(err => {
        console.log(err);
        callback(err);
      })
  },

  getAnswers: function (product_id, page, count) {
    let limit = page * count;
    // answersList(product_id, limit)
    // testForGet(product_id, limit)
      // .then(response => {
        // console.log('response from DB for answers ', response.rows)
        // return response
      // })
  },

  addQuestion: function (data, callback) {
    let { body, name, email, product_id } = data;
    let timestamp = Date.now().toString();

    return insertQuestion(body, name, email, product_id, timestamp)
      .then(response => {
        callback(null, 'Created');
      })
      .catch(err => {
        console.error(err)
        callback(err)
      });
  },

  addAnswer: function (data, question_id, callback) {
    let { body, name, email, photos } = data;
    let question = question_id;
    let timestamp = Date.now().toString();

    insertAnswer(body, name, email, question, timestamp, photos)
      .then(response => {
        callback(null, 'Created');
      })
      .catch(err => {
        console.error(err);
        callback(err);
      });
  },

  updateHelpfulQuestion: function (question_id, callback) {
    addHelpfulQuestion(question_id)
      .then(response => {
        console.log(response)
        callback(null, 'No Content')
      })
      .catch(err => {
        console.error(err);
        callback(err);
      })
  },

  updateHelpfulAnswer: function (answer_id, callback) {
    addHelpfulAnswer(answer_id)
      .then(response => {
        console.log(response)
        callback(null, 'No Content')
      })
      .catch(err => {
        console.error(err);
        callback(err);
      })
  },

  updateReportedQuestion: function (question_id, callback) {
    markReportedQuestion(question_id)
      .then(response => callback(null, response))
      .catch(err => {
        console.error(err);
        callback(err);
      })
  },
  
  updateReportedAnswer: function (answer_id, callback) {
    markReportedAnswer(answer_id)
      .then(response => callback(null, response))
      .catch(err => {
        console.error(err);
        callback(err);
      })
  },

}