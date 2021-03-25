
let { questions } = require('./assets/data/questions.js');
// const fs = require('fs');
// var path = require('path');
const ERROR_MESSAGE = "Please select a choice."
let CAROUSEL_CONTAINER = document.getElementById('carousel');

let current_slide_index = 0;
let answers = [];

// ${index == 0 && 'inactive_button'}

let create_carousel_nav_buttons = (index)=> {
  let left_button = document.createElement("div");
  left_button.className = `carousel-left_button align-center flex-grid ${index == 0 && 'inactive_button'}` ;
  let left_button_icon = document.createElement("img");
  left_button_icon.src =`${window.location}:3000/right_arrow.png`;
  left_button_icon.alt = "previous";
  left_button_icon.className = "align-self";

  left_button.id = "left-button"
  left_button_icon.onclick = ()=> {
    decrement_carousel_index();
  };
  left_button.appendChild(left_button_icon);

  let right_button = document.createElement("div");
  right_button.className = `carousel-right_button flex-grid ${index == questions.length && 'inactive_button'}`;
  right_button.id = "right-button";
  let right_button_icon = document.createElement("img");
  right_button_icon.src = "./assets/images/right_arrow.png"
  right_button_icon.alt = "next";
  right_button_icon.className = "align-self";

  right_button_icon.onclick = () => {
    increment_carousel_index();
  };
  right_button.appendChild(right_button_icon);

  return [left_button, right_button];
}

//Finds the selected slide and adds the error message
let render_error_message = (index)=> {
    let current_slide_error_message = document.getElementById(`error-message-slide-${index}`);
    let error_text = document.createTextNode(ERROR_MESSAGE);
    current_slide_error_message.appendChild(error_text);
}

//Removes text from error message p tag
let clear_error_message = (index)=> {
    let current_slide_error_message = document.getElementById(`error-message-slide-${index}`);
    current_slide_error_message.innerHTML = "";
}

//Creates the content for each slide given the array of objects questions from the assets/data folder
let create_slides = ()=> {
    CAROUSEL_CONTAINER.innerHtml = "";
    for(let i = 0; i<=questions.length; i++) {

        let slideContainer = document.createElement("div");
        slideContainer.id = `slide-${i}`;
        slideContainer.className = `slide slide-${i} ${i==0 ? "active-slide" : "inactive-slide"}`;

        let [left_button, right_button] = create_carousel_nav_buttons(i);

        let slideBody = document.createElement("div");
        slideBody.className = `slide_body flex-grid justify-content-between `;

        let choiceContainer = document.createElement("div");
        choiceContainer.className = `choice-container flex-grid justify-content-between`;
        choiceContainer.id = `choice-container-${i}`

        slideBody.appendChild(left_button);

        if(i != questions.length) {

            let question = document.createElement("h1");
            question.className = "carousel-question__heading text-center";
            let question_text = document.createTextNode(questions[i]['question']);
            question.appendChild(question_text);

            let error_text = document.createElement("p");
            error_text.className = "error_message text-center";
            error_text.id = `error-message-slide-${i}`;

            for(let j = 0; j<questions[i]['answers'].length; j++) {
                let answer_choices = questions[i]['answers'];

                let choice_button = document.createElement("div");
                choice_button.className = "carousel-choice__button flex-grid align-items justify-content-center";
                let choice_text = answer_choices[j];
                let radio_button = document.createElement("input");
                //Set radio attributes
                radio_button.setAttribute('type', 'radio')
                radio_button.setAttribute('name', question_text)
                radio_button.setAttribute('value', choice_text)

                let choice_label = document.createElement("label");
                let choice_label_text = document.createTextNode(choice_text);
                choice_label.appendChild(choice_label_text);

                choice_button.appendChild(radio_button);
                choice_button.appendChild(choice_label);
                choice_button.onclick = ()=> {
                    select_choice(choice_text,i,()=>{ radio_button.checked = true; });
                };
                choiceContainer.appendChild(choice_button)
            }

            slideBody.appendChild(choiceContainer);
            slideBody.appendChild(right_button);

            slideContainer.appendChild(question);
            slideContainer.appendChild(error_text);
            slideContainer.appendChild(slideBody);

        } else {
            let summary = document.createElement("h1");
            summary.className = "carousel-question__heading text-center";
            let summary_text = document.createTextNode("Thank You");
            summary.appendChild(summary_text);

            let info_text = document.createElement("p");
            info_text.className = "text-center";
            let info_label_text = document.createTextNode("See below for your answers.");
            info_text.appendChild(info_label_text);


            slideBody.appendChild(choiceContainer);
            slideBody.appendChild(right_button);

            slideContainer.appendChild(summary);
            slideContainer.appendChild(info_text);
            slideContainer.appendChild(slideBody);

        }

        CAROUSEL_CONTAINER.appendChild(slideContainer);
    }
    return CAROUSEL_CONTAINER;
}



//Creates the orange next button in the carousel, returns the dom element
let create_next_button = ()=> {
    let next_button = document.createElement("div");
    next_button.className = `carousel-next-button__orange `;
    next_button.id = `next-button`
    let next_text = document.createTextNode("Next");
    next_button.appendChild(next_text);
    next_button.onclick = increment_carousel_index;
    return next_button;
}

//Clears the slide of any error message and records choice
let select_choice = (choice, index, fill_radio_callback)=>{
    clear_error_message(index);
    record_choice(choice,index)
    fill_radio_callback()

}

//Adds response to the answer array
let record_choice = (choice,index)=> {
    // console.log(e.target.value);
    answers[index] = choice
}

//Function that swaps out the active and inactive class, which hides all inactive
//and displays the current active.
// index param is an integer to identify the desired active slide
let change_slide = (index)=> {
    let slides = CAROUSEL_CONTAINER.children;

    for(let i=0; i<slides.length; i++) {
        if(slides[i].classList.contains('slide')) {
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

//Toggles on and off the inactive button class
let toggle_button = (element)=> {
    element.classList.toggle("inactive_button");
}

//Moves to the next slide, checks if it's the last slid and if the user has made a choice
let increment_carousel_index = ()=> {
  //Prevent going to next slide if on the last slide
  if(current_slide_index == questions.length) return;

  let has_user_selected_choice = check_user_has_selected(current_slide_index);

  //Check if user has selected a choice before moving forward
  if(has_user_selected_choice) {
      current_slide_index = current_slide_index+1;

      //If the next slide is the last one render a summary slide
      if (current_slide_index == questions.length) {
          let summary_slide = document.getElementById(`choice-container-${questions.length}`);
          let summary = summarize_choices();
          summary_slide.appendChild(summary);

          //Turn off next button if next one is last one
          let next_button = document.getElementById('next-button')
          toggle_button(next_button);
      }

      change_slide(current_slide_index);
  }
}

let decrement_carousel_index = ()=> {
  //Prevent going back if on first question
  if(current_slide_index == 0) return;

   //Turn on next button if currently on last slide
  if(current_slide_index == questions.length) {
     let next_button = document.getElementById('next-button')
     toggle_button(next_button);
  }

  current_slide_index = current_slide_index-1;



  change_slide(current_slide_index);
}

//Takes an index(int) and checks if any answers have been recorded for the
//question. User can't move on without it
let check_user_has_selected = (index)=>{
    if(answers[index]) {
        return true;
    } else {
        render_error_message(index);
        return false;
    }
}


let summarize_choices = ()=> {
    let list = document.createElement("ol");
    for(let i = 0; i < answers.length; i++) {
        let answer = document.createElement("li");
        let answer_text = document.createTextNode(` ${answers[i]}`)
        answer.appendChild(answer_text);
        list.appendChild(answer);
    }
    return list;
}

let slides = create_slides();
CAROUSEL_CONTAINER.parentNode.replaceChild(slides, CAROUSEL_CONTAINER);
CAROUSEL_CONTAINER.appendChild(create_next_button());

document.body.onload = ()=> {
    // let url_string = window.location.href;
    // console.log(url_string);
    // let url = new ULR(url_string);
    // let question_number = url.searchParam.get("skip")
    // console.log("question_number")
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
