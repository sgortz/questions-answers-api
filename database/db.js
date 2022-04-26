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
    return pool.query(`SELECT json_agg(results) AS results FROM (SELECT q.question_id, q.question_body, q.date_written, q.asker_name, q.helpfulness, q.reported, (SELECT jsonb_object_agg(a.answer_id, json_build_object('id', a.answer_id, 'body', a.answer_body, 'date', a.date_written, 'answerer_name', a.answerer_name, 'helpfulness', a.helpfulness ,'photos', (SELECT json_agg(photos) as photos FROM (SELECT answers_photos.url FROM answers_photos WHERE answers_photos.answer_id = a.answer_id) as photos))) AS answers FROM answers AS a WHERE a.question_id = q.question_id) FROM questions AS q WHERE product_id = $1 LIMIT $2) as results`, [product_id, limit])
  },

  answersList: function (question_id, limit) {
    return pool.query(`SELECT json_agg(results) as results FROM (SELECT answers.answer_id, answers.answer_body AS body, answers.date_written AS date, answers.answerer_name, answers.helpfulness, (SELECT json_agg(photos) as photos FROM (SELECT answers_photos.url FROM answers_photos WHERE answers_photos.answer_id = answers.answer_id AND answers.reported = false) as photos) FROM answers WHERE question_id = $1 LIMIT $2) as results`, [question_id, limit]);
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

  testForGet: function (product_id, limit) {
    return pool.query(`SELECT * FROM questions WHERE product_id = $1 LIMIT $2`, [product_id, limit]);
  },
}