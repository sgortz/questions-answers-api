const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes.js');
const { pool, test } = require('../database/db.js');

require('dotenv').config();

const app = express();
// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.get('/qa/questions', (req, res) => { 
  test().then(response => console.log(response.rows))
  
});
app.post('/qa/questions', async (req, res) => {
  try {
    const { product_id, body, name, email } = req.body;
    const timestamp = Date.now();

    const newQuestion = await pool.query(`INSERT INTO questions (product_id, body, asker_name, asker_email, date_written) VALUES($1, $2, $3, $4, $5)`, [product_id, body, name, email, timestamp]);

    // res.json(newQuestion.)
    console.log('hey, look at this!', newQuestion.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})



app.listen(process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}`);
})