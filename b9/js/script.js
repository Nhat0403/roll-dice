"use strict";
const player0EL = document.querySelector("#player--0");
const player1EL = document.querySelector("#player--1");
const score0EL = document.querySelector("#score--0");
const score1EL = document.querySelector("#score--1");
const current0EL = document.querySelector("#current--0");
const current1EL = document.querySelector("#current--1");

const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnAgain = document.querySelector(".btn--again");

let scores, currentScore, activePlayer, playing;

// staring conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0; //16
  activePlayer = 0; //1
  // scores[activePlayer] = currentScore;
  // scores[1] = 16; player1EL has currentScore = 16
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEl.classList.add("hidden");
  player0EL.classList.remove("player--winner");
  player1EL.classList.remove("player--winner");
  player0EL.classList.add("player--active");
  player1EL.classList.remove("player--active");
  btnRoll.classList.remove("hidden");
  btnHold.classList.remove("hidden");
};

init();

const switchPlayer = function () {
  // set current score back to 0
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  // 3t.1 how to get switch player?
  activePlayer = activePlayer === 0 ? 1 : 0;
  // 3t.1.2 change background
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
  // 3t.2 how to set current score back to?
  currentScore = 0;
};

// user rolls dice
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. generate random dice roll
    const random = Math.trunc(Math.random() * 6 + 1);
    for (let i = 0; i < random; i++) {
      // 2. display dice roll
      diceEl.classList.remove("hidden");
      diceEl.src = `image/dice-${random}.png`;
    }
    // 3. is it a 1?
    if (random !== 1) {
      // 3.flase. add current score to total score
      // 3f.1 how to get current score?
      currentScore += random;
      // 3f.2 how to get current player?
      // document.querySelector(`#current--${activePlayer}`);
      // 3f.2 display new score
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    }
    // 3.true. switch player
    else {
      switchPlayer();
    }
  }
});

// user holds score
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. add current score to total score
    // score0EL.textContent = current0EL.textContent;
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. score >= 100?
    if (scores[activePlayer] >= 10) {
      // 2.true. current player wins!
      // 2t. finish the game
      playing = false;
      document
        .querySelector(`#player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`#player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
      btnRoll.classList.add("hidden");
      btnHold.classList.add("hidden");
    } else {
      // 2.false. switch player
      switchPlayer();
    }
  }
});

// user resets game
btnAgain.addEventListener(
  "click",
  init // 1. set all scores to 0
);
