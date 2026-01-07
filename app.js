let gameseq = [];
let userseq = [];

let btns = ["yellow","red","purple","green"];

let started = false;
let level = 0;

// Track highscore for current user (per browser) using localStorage
let highScore = Number(localStorage.getItem("simonHighscore")) || 0;

let h2 = document.querySelector("h2");
let highscoreBtn = document.querySelector("#showHighscoreBtn");

if (highscoreBtn) {
    highscoreBtn.addEventListener("click", function () {
        h2.innerHTML = `Current Highscore: <b>${highScore}</b> <br> Press Any Key to Start or Continue`;
    });
}

document.addEventListener("keypress", function() {

    
    if(started == false){
        console.log("game started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    },250);
}
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    },250);
}
   

function levelUp() {
    userseq = [];
    level++;
    h2.innerText = `level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
     let randColor = btns[randIdx];
     let randbtn = document.querySelector(`.${randColor}`);
    //  console.log(randbtn);
    //  console.log(randColor);
    //  console.log(randIdx);
        gameseq.push(randColor);
        console.log(gameseq);
    gameFlash(randbtn);
}

function checkAnswer(lastIdx){
    if(userseq[lastIdx] === gameseq[lastIdx]){
        if(userseq.length === gameseq.length){
            setTimeout(levelUp, 1000); 
        }
    } else {
        // Update highscore if current score is greater
        if (level > highScore) {
            highScore = level;
            localStorage.setItem("simonHighscore", highScore);
        }

        h2.innerHTML = `Game Over..!Your score was <b> ${level} </b> <br> Highscore: <b>${highScore}</b> <br> Press Any Key to Restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        restartGame();
        
    }   
}

function btnPress(){
    console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userseq.push(userColor);

    checkAnswer(userseq.length - 1);
   
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
};

function restartGame(){
    level = 0;
    gameseq = [];
    started = false;
}