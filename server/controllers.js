const { getQuestions, getAnswers, addQuestion, addAnswer } = require('./models.js');

module.exports = {
  getAllQuestions: function (req, res) {
    let { product_id, page, count } = req.query;

    getQuestions(product_id, page, count, (err, response) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.status(200).send(response);
      }
    })
  },
  getAllAnswers: function (req, res) {},
  postQuestion: function (req, res) {
    let info = req.body;
    addQuestion(info, (err, response) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.status(201).send(response);
      }
    });
  },
  postAnswer: function (req, res) {
    console.log('this is the body: ', req.body, 'from a ', req.method)
    // let info = req.body;
    // let response = addAnswer(info);
    // console.log('this is the response from models', response);
    // .then(response => {
    //   res.status(201).send('Created');
    // })
    // .catch(err => console.error(err));
  }
}