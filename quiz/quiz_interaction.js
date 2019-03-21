let hopeQuiz = {
  index: -1,
  url_questions: 'questions.json',
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
      hopeQuiz.nameChangeButton.style.display = 'inline';
      hopeQuiz.startButton.style.display = 'inline';
      hopeQuiz.startButton.addEventListener('click', hopeQuiz.next);
      hopeQuiz.nextButton.addEventListener('click', hopeQuiz.next);
  },

  askForName: function() {
      hopeQuiz.clearQuiz();
      let form = document.getElementById('nameForm');
      form.style.display = "block";
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
      for (var i = 0; i < hopeQuiz.allQuestions[hopeQuiz.index]["choices"].length; i++) {
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

      console.log(hopeQuiz.index);

      // show backButton if after first question, else hide
      if (hopeQuiz.index > 0) {
          hopeQuiz.backButton.style.display="inline";
      } else {
          hopeQuiz.backButton.style.display="none";
      }

      //show nextButton if user pressed backButton and doesn't return to question
      console.log(hopeQuiz.index, bookmark)
      if (hopeQuiz.index < bookmark) {
          hopeQuiz.nextButton.style.display = 'inline';
      }
  },

    showResults: function (questions, hopeQuiz, resultsContainer) {
        let answerContainers = hopeQuiz.querySelectorAll('.answers');
      
  },

  next: function() {
      //stops user from proceeding without answering
      if (hopeQuiz.index > -1) {
          if (!hopeQuiz.answered()) {
              console.log('no answer')
              return;
          }
      }

      hopeQuiz.clearQuiz();
      hopeQuiz.index += 1;

      //if last question show results
      if (hopeQuiz.index == hopeQuiz.allQuestions.length) {
          return //to do: add code to just show answers until resource is built
      } else {
          hopeQuiz.showQuestion();
      }
  },

  back: function() {
      let bookmark = hopeQuiz.index;
      hopeQuiz.index -= 1;
      hopeQuiz.showQuestion(bookmark);
  },

  clearQuiz: function() {
      hopeQuiz.nameChangeButton.style.display = 'none';
      hopeQuiz.nextButton.style.display = 'none';
      hopeQuiz.backButton.style.display = 'none';
      hopeQuiz.startButton.style.display = 'none';
      while (hopeQuiz.element.firstChild) {
          hopeQuiz.element.removeChild(hopeQuiz.element.firstChild);
      }
  },

  //validating whether question has been answered
  answered: function() {
      if (hopeQuiz.allQuestions) {
          if ('answer' in hopeQuiz.allQuestions[hopeQuiz.index]) {
              return true;
          } else {
              return false;
          }
      }
  }
};

//callback function
hopeQuiz.getQuestions(function(questions) {
    hopeQuiz.allQuestions = questions;
});

console.dir(hopeQuiz);
//assigns value of radio button to answer property
hopeQuiz.element.addEventListener('click', function(e) {
    if (e.target.tagName.toUpperCase() === "INPUT") {
        let value = e.target.value;
        hopeQuiz.allQuestions[hopeQuiz.index]['answer'] = value;

        //hide choices with delay
        choices = document.getElementsByClassName('choices');

        function timeout(i) {
            setTimeout(hideChoices, 100, i);

            function hideChoices() {
                if (i !== value) {
                    hopeQuiz.element.removeChild(choices[i].nextSibling);
                    hopeQuiz.element.removeChild(choices[i]);
            }
            i -= 1
            if (i >= 0) {
                timeout(i);
            }
        }
    }
    timeout(hopeQuiz.allQuestions[hopeQuiz.index]["choices"].length -1);
    setTimeout(hopeQuiz.next, 1000); //show next question after delay
}
});

hopeQuiz.backButton.addEventListener('click', hopeQuiz.back);

// check username to then either welcome user or ask user for name
hopeQuiz.checkName();
 
