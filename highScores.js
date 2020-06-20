const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
//map allows you to take incoming data from an existing array and transform
//it to something else. such as a list.

highScoresList.innerHTML = highScores
    .map(score => {
        return `<li class="high-scores">${score.name}-${score.score}</li>`;
    })
    .join("");