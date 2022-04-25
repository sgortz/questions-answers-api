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

/* Create a function to return all questions, answers and answer photos from a product id. 
 * Filter out reported questions or answers  */
function questionsList(product_id, limit) {
  return pool.query(`SELECT * FROM public.questions WHERE product_id = $1 LIMIT $2`, [product_id, limit]);
  // figure out how to query for just one product id
  // filter out reported questions and answers
}

function answersList(question_id, limit) {
  // aggregate answers_photos to answers table using answer id
  // insert page property (here?)
  // insert count property (here?)
  // remove all reported answers
  return pool.query(`SELECT * FROM public.answers WHERE question_id = $1 LIMIT $2`, [question_id, limit]);
}

function insertQuestion(body, name, email, product_id, date) {
  return pool.query(`
    INSERT INTO public.questions (product_id, body, date_written, asker_name, asker_email) 
    VALUES(${product_id},${body},${date},${name},${email})
    `)
}

function insertAnswer(body, name, email, question_id, date) {
  return pool.query(`
    INSERT INTO public.answers (question_id, body, date_written, asker_name, asker_email) 
    VALUES(${question_id},${body},${date},${name},${email})
    `)
}

function test(product_id) {
  return pool.query(`SELECT * FROM questions WHERE product_id = '${product_id}' LIMIT 3 `);
}
module.exports = { pool, test, questionsList, answersList, insertQuestion, insertAnswer };