const mongoose = require("mongoose");

const Quiz = mongoose.model("Quiz", {
  Question: String,
  Answer: String
});

module.exports = Quiz;