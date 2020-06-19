const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<jsa>",
        choice4: "<scripting",
        answer: 1
    },

    {
        question: "Which CSS tag creates an underline on an HTML page?",
        choice1: "text-decoration",
        choice2: "font-decoration",
        choice3: "text-style",
        choice4: "font-wieght",
        answer: 1
    },

    {
        question: "Which hexadecimal is red",
        choice1: "#00FF00",
        choice2: "#FF6347",
        choice3: "#7B5690",
        choice4: "#FF0000",
        answer: 4
    },

    {
        question: "What is a good example question?",
        choice1: "Bingo",
        choice2: "Llamaface",
        choice3: "Dinkle tinkle",
        choice4: "Jelly Belly",
        answer: 2
    },
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign("/end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} / ${MAX_QUESTIONS}`;
    //another option 
    //example.. questionsCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

    //Update the progress bar with the width
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionIndex];
        question.innerText = currentQuestion.question;

        choices.forEach( choice => {
            const number = choice.dataset["number"];
            choice.innerText = currentQuestion["choice" + number];
        });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
       if(!acceptingAnswers) return;
       
       acceptingAnswers = false;
       const selectedChoice = e.target;
       const selectedAnswer = selectedChoice.dataset["number"];

       const classToApply =
        selectedAnswer == currentQuestion.answer ?"correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        //You could also use an if statment to change the background color such as:
        //const classToApply = "incorrect"
        //if (selected Answer == (currentQuestion.answer) {
        // classToApply = "correct";
        //}
    
     selectedChoice.parentElement.classList.add(classToApply);

     //setTimeout gives a bit of delay before we remove the classToApply.
     //setTimeout is a JS built in function
     //1000 refers to miliseconds of how long it waits to remove the class.

     setTimeout(() => {
         selectedChoice.parentElement.classList.remove(classToApply);
         getNewQuestion();
     }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();
