const { pool, questions } = require('../database/db.js');

module.exports = {
    getQuestions: function(product_id, page, count) {
        let limit = page * count;
        questions(limit).then(response => console.log('does this work? ', response.rows))
        // return response
    }
}