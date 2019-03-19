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
  },

  welcome: function(name) {
      hopeQuiz.clearQuiz();
      let greeting = document.createElement('h2')
      let greetingText = document.createTextNode('Hello ' + name + '!');
      greeting.appendChild(greetingText);
      hopeQuiz.element.appendChild(greeting);
      let buttonText = "Not " + name + "?";
      hopeQuiz.nameChangeButton.textContent = buttonText;
      hopeQuiz.nameChangeButton.addEventListener('click', hopeQuiz.askForName);
      hopeQuiz.startButton.addEventListener('click', hopeQuiz.next);
      hopeQuiz.nextButton.addEventListener('click', hopeQuiz.next);
  },

  askForName: function() {
      hopeQuiz.clearQuiz();
      let form = document.getElementById('nameForm');
      form.addEventListener('submit', function(e){
          e.preventDefault(); //prevents form submission
          let name = document.getElementById('username').value;
          localStorage.setItem('name', name);
          form.style.display = "none";
          hopeQuiz.checkName(name);
      });
  },

  showQuestion: function(bookmark) {
      hopeQuiz.element.innerHTML = "<h1>" + hopeQuiz.allQuestions[hopeQuiz.index]["question"] + "</h1>";

      //creates choices as radio input
      for (let i = 0; i < hopeQuiz.allQuestions[hopeQuiz.index]["choices"].length; i++) {
          let choice = document.createElement('input');
          choice.type = 'radio';
          choice.className = 'choices';
          choice.value = i;
          
          // if user chose current choice as answer, mark current choice
          if ('answer' in hopeQuiz.allQuestions[hopeQuiz.index] && choice.value == hopeQuiz.allQuestions[hopeQuiz.index]['answer']) {
              choice.checked = "checked";
          }

          //append current choice to quiz
          hopeQuiz.element.appendChild(choice);
          hopeQuiz.element.appendChild(document.createTextNode(hopeQuiz.allQuestions[hopeQuiz.index]['choices'][i]));
          hopeQuiz.element.appendChild(document.createElement('br'));
    
      }

      console.log(quiz.index);
  }
};
