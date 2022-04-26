/**ESTABLISH A CONNECTION HERE WITH THE DB */
const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB
})

module.exports = {
  questionsList: function (product_id, limit) {
    return pool.query(`SELECT * FROM questions WHERE product_id = $1 LIMIT $2`, [product_id, limit]);
    // figure out how to query for just one product id
    // filter out reported questions and answers
  },

  answersList: function (question_id, limit) {
    // aggregate answers_photos to answers table using answer id
    // insert page property (here?)
    // insert count property (here?)
    // remove all reported answers
    // return pool.query(`SELECT * FROM answers WHERE question_id = $1 LIMIT $2`, [question_id, limit]);
    return pool.query(`SELECT ARRAY_AGG(answers_photos.url) AS photos FROM answers_photos WHERE answer_id = '5'`);
  },

  insertQuestion: function (body, name, email, product_id, date) {
    return pool.query(`
      INSERT INTO questions (product_id, question_body, date_written, asker_name, asker_email) 
      VALUES($1, $2, $3, $4, $5)`, [product_id, body, date, name, email]);
  },

  insertAnswer: function (body, name, email, question_id, date) {
    return pool.query(`
      INSERT INTO answers (question_id, answer_body, date_written, answerer_name, answerer_email) 
      VALUES($1, $2, $3, $4, $5)`, [question_id, body, date, name, email]);
  },

  addHelpfulQuestion: function (question_id) {
    return pool.query(`UPDATE questions SET helpfulness = helpfulness + 1 WHERE question_id = $1`, [question_id]);
  },

  addHelpfulAnswer: function (answer_id) {
    return pool.query(`UPDATE answers SET helpfulness = helpfulness + 1 WHERE answer_id = $1`, [answer_id]);
  },

  markReportedQuestion: function (question_id) {
    return pool.query(`UPDATE questions SET reported = true WHERE question_id = $1`, [question_id]);
  },
 
  markReportedAnswer: function (answer_id) {
    return pool.query(`UPDATE answers SET reported = true WHERE answer_id = $1`, [answer_id]);
  },

  testForGet: function (product_id) {
    return pool.query(`SELECT * FROM questions WHERE product_id = '${product_id}' LIMIT 3 `);
  }
}