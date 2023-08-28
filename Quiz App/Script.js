//all neccessary constants
const startBtn = document.querySelector(".quizbutton button");
const infoBox = document.querySelector(".info-box");
const exitBtn = infoBox.querySelector(".EndAndContinueButtons .exit");
const continueBtn = infoBox.querySelector(".EndAndContinueButtons .continue");
const timer = document.querySelector("header .timer")
const quizBox = document.querySelector(".quizbox");
const timeLine = document.querySelector("header .timestring");
const timeCounter = document.querySelector("header .timeremaining");
const timerLine = document.querySelector("header .timerline");
const nextBtn = document.querySelector("footer button");
const questionCount = document.querySelector(".questionCounter");
const resultBox = document.querySelector(".resultbox");
const restartQuizBtn = resultBox.querySelector(".finishButtons .reset");
const quitQuizBtn = resultBox.querySelector(".finishButtons .menu");
const questionText = document.querySelector(".questiontext");
const option_list = document.querySelector(".optionslist");
const score = resultBox.querySelector(".score");

//Onclick
// if startQuiz button clicked

startBtn.onclick= ()=>{
    //show info box
    infoBox.classList.add("activeInfo"); 
}

//if exitQuiz button clicked

exitBtn.onclick = ()=>{
    //hiding info box
    infoBox.classList.remove("activeInfo"); 
}

//if continueQuiz button clicked

continueBtn.onclick = ()=>{
    //hiding info box
    infoBox.classList.remove("activeInfo");
    //show the quiz box
    quizBox.classList.add("activeQuiz");
    showQuestions(0);
    startTimer(15);
    startTimerLine(0);
    countQuestions(1);
}

let question_count = 0;
let userscore = 0;
let timeValue = 15;
let question_number = 1;
let widthValue = 0;

function showQuestions(index)
{   
    let questions_tag = '<span>' + questions[index].numb + "." + questions[index].question + '</span>';
    //let questions_tag = '<span> 1.questions </span>';
    let options_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>' +
                      '<div class="option"><span>' + questions[index].options[1] + '</span></div>' +
                      '<div class="option"><span>' + questions[index].options[2] + '</span></div>' +
                      '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
                      
    questionText.innerHTML = questions_tag;
    option_list.innerHTML = options_tag;
    const option = option_list.querySelectorAll(".option");

    for(i=0; i<option.length; i++)
    {
        option[i].setAttribute("onclick","optionSelected(this)");
    }
}

//icons
let tickIconTag = '<div class="icon-tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon-cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer)
{   
    clearInterval(counterLine);
    clearInterval(time_counting);
    let userAnswer = answer.textContent;
    let correctAnswer = questions[question_count].answer;
    const allOptions = option_list.children.length;
    if(userAnswer == correctAnswer)
    {
        userscore = userscore+1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend",tickIconTag);
    }
    else
    {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend",crossIconTag);
        for(i=0; i<allOptions; i++)
        {
           if(option_list.children[i].textContent == correctAnswer)
           {
              option_list.children[i].setAttribute("class", "option correct");
              option_list.children[i].insertAdjacentHTML("beforeend",tickIconTag);
           }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    nextBtn.classList.add("show");
}

function startTimer(time)
{
    time_counting = setInterval(timeDetails,1000);
    function timeDetails(){
      time--;
      timeCounter.textContent = time;
      if(time <= 0)
      {
          clearInterval(time_counting);
          timeLine.textContent = "Time Off";
          const allOptions = option_list.children.length;
          let correctAnswer = questions[question_count].answer;
          for(i=0; i<allOptions; i++)
          {
              if(option_list.children[i].textContent===correctAnswer)
              {
                 option_list.children[i].setAttribute("class", "option correct");
                 option_list.children[i].insertAdjacentHTML("beforeend",tickIconTag);
              }
          }
          for(i=0;i<allOptions;i++)
          {
              option_list.children[i].classList.add("disabled");
          }
          nextBtn.classList.add("show");
      }
    }
}
function startTimerLine(timerValue){
    counterLine = setInterval(timer,27);
    function timer(){
        timerValue += 1;
        timerLine.style.width = timerValue + "px";
        if(timerValue > 549){
            clearInterval(counterLine);
        }
    }
}

function countQuestions(index){
     let totalQuestionCountTag = '<span><p>' + index + '</p> of ' + questions.length + '</p> Questions </span>';
     questionCount.innerHTML = totalQuestionCountTag;
} 
nextBtn.onclick = ()=>{
    if(question_count < questions.length - 1){
        question_count++;
        question_number++;
        showQuestions(question_count);
        countQuestions(question_number);
        timeCounter.textContent = timeValue;
        startTimer(15);
        startTimerLine(widthValue);
        timeLine.textContent = "Time Left";
        nextBtn.classList.remove("show");
    }
    else{
        showResult();
    }
}

function showResult(){
    infoBox.classList.remove("activeInfo");
    quizBox.classList.remove("activeQuiz");
    resultBox.classList.add("activeResult");
    if (userscore > 3)
    { 
     // if user scored more than 3 what do we do? :
     //we are creating a new span tag and we are passing the user score number and total question number 
      let scoreTag = '<span>Congrats! 🎉, You got <p>'+ userscore +'</p> out of <p>'+ questions.length +'</p></span>';
      score.innerHTML = scoreTag;
     //we are adding new span tag inside the score variable for displaying score 
    } 
    else if(userscore > 1)
    {
     // if user scored more than 1 : 
     let scoreTag = '<span>Nice! , You got <p>'+ userscore +'</p> out of </p>' + questions.length + '</p></span>';
     score.innerHTML = scoreTag;
    }
    else{
     //if the userScore is less than 1 aka if it is 0
     let scoreTag = '<span>Sorry :(, You only got <p>'+ userscore +'</p> out of </p>' + questions.length + '</p></span>';
    score.innerHTML = scoreTag;
    }

}

restartQuizBtn.onclick = ()=>{
    resultBox.classList.remove("activeResult");
    infoBox.classList.remove("activeInfo");
    quizBox.classList.add("activeQuiz");
    timeValue = 15;
    question_count = 0;
    question_number = 1;
    userscore = 0;
    widthValue = 0;
    showQuestions(question_count);
    countQuestions(question_number);
    timeCounter.textContent = timeValue;
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeLine.textContent = "Time Left";
    nextBtn.classList.remove("show");
}

quitQuizBtn.onclick = ()=>{
    window.location.reload(); 
    //reloading user's current window
}