import './scss/app.scss';

let { questions } = require('./assets/data/questions.js')
// const fs = require('fs');
// var path = require('path');
console.log("Hello world!", questions);
const CAROUSEL_CONTAINER = document.getElementById('carousel');

let current_slide_index = 0;
let answers = [];

let create_slides = ()=> {

    for(let i = 0; i<questions.length; i++) {

        let slideContainer = document.createElement("div");
        slideContainer.id = `slide-${i}`;
        slideContainer.className = `slide slide-${i} ${i==0 ? "active-slide" : "inactive-slide"}`;

        let question = document.createElement("h1");
        question.className = "carousel-question__heading";
        let question_text = document.createTextNode(questions[i]['question']);
        question.appendChild(question_text);

        let choiceContainer = document.createElement("div");
        choiceContainer.className = `choice-container flex-grid`;


        for(let j = 0; j<questions[i]['answers'].length; j++) {
            let answers = questions[i]['answers'];

            let choice_button = document.createElement("div");
            choice_button.className = "carousel-choice__button";
            let radio_button = document.createElement("input");
            let choice_label = document.createElement("label");
            let choice_text = answers[j];


            choiceContainer.appendChild(choice_button)

        }

        slideContainer.appendChild(question);
        slideContainer.appendChild(choiceContainer);

    }
}

create_slides();


let select_choice = (e, index)=>{

}

let record_choice = (e)=> {
    console.log(e.target.value);
}

//Function that swaps out the active and inactive class, which hides all inactive
//and displays the current active.
// index param is an integer to identify the desired active slide
let change_slide = (index)=> {
    let slides = CAROUSEL_CONTAINER.children;

    for(let i=0; i<slides.length; i++) {
        if(slides[i].classList.contains('slide')) {
          console.log("I", i, slides[i]);
          if(i==index) {
            slides[i].classList.remove('inactive-slide');
            slides[i].classList.add('active-slide');
          } else {
            slides[i].classList.remove('active-slide');
            slides[i].classList.add('inactive-slide');
          }
        } else {
          continue;
        }
    }
}

let increment_carousel_index = ()=> {
  //Prevent going to next slide if on the last slide
  if(current_slide_index == questions.length) return;
  current_slide_index = current_slide_index+1;
  change_slide(current_slide_index);
}

let decrement_carousel_index = ()=> {
  //Prevent going back if on first question
  if(current_slide_index == 0) return;
  current_slide_index = current_slide_index-1;
  change_slide(current_slide_index);
}


let check_user_has_selected = (index)=>{
    if(answers[index]) {
        return true;
    } else {
        render_error_message(index);
    }
}

//Finds the selected slide and adds the error message
let render_error_message = (index)=> {
    let current_slide = document.getElementById(`slide-${i}`);

}

let clear_error_message = ()=> {

}

let summarize_choices = ()=> {

}

// let read_text = () => {
// }


// function loadJSON(callback) {
//   var xobj = new XMLHttpRequest();
//   xobj.overrideMimeType("application/json");
//   xobj.open('GET', './assets/data/questions.json', true);
//   xobj.onreadystatechange = function () {
//     if (xobj.readyState == 4 && xobj.status == "200") {
//       callback(JSON.parse(xobj.responseText));
//     }
//   };
//   xobj.send(null);
// }
//
// loadJSON(function(json) {
//   console.log("Here is the json", json); // this will log out the json object
// });


//let question_path = path.join(__dirname, './', 'assets', 'texts', 'questions.txt');
// //"../src/assets/texts/questions.txt"
// var text = fs.readFileSync(question_path);
// var textByLine = text.split("\n")


// fetch('questions.txt')
//     .then(response => response.text())
//     .then(data => {
//         console.log("Data", data);
//     })
