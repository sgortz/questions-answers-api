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
function questions(limit) {
    return pool.query(`SELECT * FROM public.questions LIMIT $1`, [limit]);
    // figure out how to query for just one product id
    // filter out reported questions and answers
}

module.exports = { pool, questions };