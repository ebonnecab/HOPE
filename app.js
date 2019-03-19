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

app.get('/', (req, res) => {
    res.render("home", { msg: "Handlebars are Cool!" });
})

//models
const Quiz = require("./models/quizModel");

//controllers
const quiz = require("./controllers/quiz")(app, Quiz);




app.listen(3000, () => {
    console.log('App listening on port 3000!')
})