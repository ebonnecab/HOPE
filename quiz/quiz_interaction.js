let hopeQuiz = {
  index: -1,
  url_questions: "questions.json",
  allQuestions: [],
  element: document.getElementById("hopequiz"),
  nextButton: document.getElementById("nextButton"),
  backButton: document.getElementById("backButton"),
  nameChangeButton: document.getElementById("nameChangeButton"),
  startButton: document.getElementById("startButton"),

  getQuestions: function(callback) {
    $.getJSON(hopeQuiz.url_questions, callback);
  },

  checkName: function(name) {
      //if local storage exists, get name
      //if name is valid, welcome user
      //else ask user for name
    if (localStorage) {
        let name = localStorage.getItem('name');
        if (name != null && name.trim()) {
            hopeQuiz.welcome(name);
        } else {
            hopeQuiz.askForName();
        }
    } else {
        // what to do if local storage doesn't exist
    }
  }
};
