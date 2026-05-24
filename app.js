let gameseq = [];
let userseq = [];

let btns = ["yellow","red","purple","green"];

let started = false;
let level = 0;
let levelUpTimeout = null;

// Track highscore for current user (per browser) using localStorage
let highScore = Number(localStorage.getItem("simonHighscore")) || 0;

let statusHeading = document.querySelector("h4");
let highscoreBtn = document.querySelector("#showHighscoreBtn");
let startBtn = document.querySelector("#startBtn");

let isMobileDevice = ("ontouchstart" in window) || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

function getStartPrompt() {
    return isMobileDevice ? "Tap Start to begin the game" : "Press Any Key to start the game";
}

function getRestartPrompt() {
    return isMobileDevice ? "Tap Start to Restart" : "Press Any Key to Restart";
}

function updatePromptText() {
    if (!started) {
        statusHeading.innerText = getStartPrompt();
    }
}

if (highscoreBtn) {
    highscoreBtn.addEventListener("click", function () {
        statusHeading.innerHTML = `Current Highscore: <b>${highScore}</b> <br> ${getStartPrompt()}`;
    });
}

function startGame() {
    if (!started) {
        started = true;
        level = 0;
        gameseq = [];
        userseq = [];
        statusHeading.innerText = "level 0";
        levelUp();
    }
}

function restartAndStart() {
    restartGame();
    startGame();
}

if (startBtn) {
    startBtn.addEventListener("click", function() {
        if (started) {
            restartAndStart();
        } else {
            startGame();
        }
    });
}

document.addEventListener("keypress", function() {
    startGame();
});

updatePromptText();

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
    statusHeading.innerText = `level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
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
            levelUpTimeout = setTimeout(levelUp, 1000); 
        }
    } else {
        // Update highscore if current score is greater
        if (level > highScore) {
            highScore = level;
            localStorage.setItem("simonHighscore", highScore);
        }

        statusHeading.innerHTML = `Game Over..! Your score was <b>${level}</b> <br> Highscore: <b>${highScore}</b> <br> ${getRestartPrompt()}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        restartGame();
        
    }   
}

function btnPress(){
    if (!started) return;
    console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userseq.push(userColor);

    checkAnswer(userseq.length - 1);
   
}

let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener("click", btnPress);
};

function restartGame(){
    if (levelUpTimeout) {
        clearTimeout(levelUpTimeout);
        levelUpTimeout = null;
    }
    level = 0;
    gameseq = [];
    userseq = [];
    started = false;
}