const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const MAX_HIGH_SCORRES = 5;


//things in local storage are stored as strings
//must convert the number to a string using JSON.parse

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();
    //this stops forms from posting to another page

    const score = {
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(score);
    //the below code sorts the highest scores in local storage
    //the arrow implies a return, therefore the brackets and return statement is not needed.
    highScores.sort( (a,b) => b.score - a.score)

    //splice the high scores so that only the top 5 show.
    highScores.splice(5);

    //below codes sets the score into local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
    //returns the user to home
    window.location.assign("/");
};

