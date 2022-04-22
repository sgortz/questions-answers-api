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

function test() {
    return pool.query(`SELECT * FROM public.questions LIMIT 5`);
}

module.exports = {pool , test};