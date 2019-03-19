const mongoose = require("mongoose");

const Quiz = mongoose.model("Quiz", {
  Question: String,
  Answers: String
});

module.exports = Quiz;