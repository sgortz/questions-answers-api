const { testForGet, questionsList, answersList, insertQuestion, insertAnswer } = require('../database/db.js');

module.exports = {
  getQuestions: function (product_id, page, count, callback) {
    let limit = page * count;
    return testForGet(product_id)
    // return questionsList(product_id, limit)
      .then(response => {
        callback(null, response.rows)
      })
      .catch(err => {
        console.log(err)
      })
  },

  getAnswers: function (product_id, page, count) {
    let limit = page * count;
    answersList(product_id, limit)
      .then(response => {
        console.log('response from DB for answers ', response.rows)
        // return response
      })
  },
  
  addQuestion: function (data) {
    let { body, name, email, product_id } = data;

    let timestamp = Date.now();

    return insertQuestion(body, name, email, product_id, timestamp)
      .then(response => {
        console.log('response from DB: ', response)
        callback(null, 'Created');
      })
      .catch(err => {
        console.error(err)
      });
  },

  addAnswer: function (data) {
    let { body, name, email, question_id } = data;
    let timestamp = Date.now();
    insertAnswer(body, name, email, question_id, timestamp)
      .then(response => {
        console.log('response from DB: ', response)
        // return this response as a promise
      })
      .catch(err => console.error(err));
  },
}