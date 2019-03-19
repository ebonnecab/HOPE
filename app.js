// Dependencies
const express = require('express')
const app = express()
const exphbs = require("express-handlebars");

//Templating engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// mongodb

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/HOPE", {
  useNewUrlParser: true
});

// model
const Quiz = mongoose.model('Quiz', {
    Question: String,
    Answer: String
});

app.get('/', (req, res) => {
    res.render("home", { msg: "Handlebars are Cool!" });
})

//Index
app.get('/quiz', (req, res) => {
    Quiz.find()
        .then(quiz => {
            res.render('quiz-index', { quiz: quiz });
        })
        .catch(err => {
            console.log(err);
        })
})


app.listen(3000, () => {
    console.log('App listening on port 3000!')
})