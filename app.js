let gameSeq = [];
let userSeq = [];

let btns = ["red", "green", "blue", "yellow"];

let Started = false;
let lvl = 0;
let points = 0;
let highPoints = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (Started == false) {
        Started = true;
        lvlUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash")
    }, 250);
};

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash")
    }, 250);
};

function lvlUp() {
    userSeq = [];
    h2.innerText = `Level ${lvl + 1}`;

    // random btn choose
    let ranIndx = Math.floor(Math.random() * 4);
    let ranColor = btns[ranIndx];
    // Push game
    gameSeq.push(ranColor);
    let ranBtn = document.querySelector(`.${ranColor}`);
    btnFlash(ranBtn);
};

let h3 = document.querySelector("h3");
function checkAns(indx) {
    if (userSeq[indx] === gameSeq[indx]) {
        if (userSeq.length == gameSeq.length) {
            lvl++;
            setTimeout(lvlUp, 1000);
            points += 10;
            h3.innerText = `Total Points:${points}`;

            let hiPoint = document.querySelector(".highestScore");
            hiPoint.innerText = `Highest Points:${updateHiPnt(points)}`;
        }
    } else {
        h2.innerText = `Game Over! Press any key to Start again.`;
        reset();
        bgColor();
    }
};

function bgColor() {
    let body = document.querySelector("body");
    body.classList.add("bgColorRed");
    setTimeout(function () {
        body.classList.remove("bgColorRed");
    }, 500)
};

function btnPressed() {
    let btn = this;
    // flash
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
};

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPressed);
};

function reset() {
    Started = false;
    lvl = 0;
    gameSeq = [];
    userSeq = [];
    points = 0;
    h3.innerText = `Total Points:${points}`;
};

function updateHiPnt(points) {
    if (points > highPoints) {
        highPoints = points;
    }
    return highPoints;
};