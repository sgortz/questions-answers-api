const {getQuestions} = require('./models.js');

module.exports = {
    getAllQA: function (req, res) {
        let { product_id, page, count } = req.query;
        let response = getQuestions(product_id, page, count);
        console.log('This is a response ', response);
    }
}