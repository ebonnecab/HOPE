module.exports = function(app, Quiz) {
    app.get('/quiz', (req, res) => {
        Quiz.find()
            .then(quiz => {
                res.render('quiz-index', { quiz: quiz });
            })
            .catch(err => {
                console.log(err);
            });
    });
}