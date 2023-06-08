"use strict";

/* variables declaration */
const player0El = document.querySelector(".player-0");
const player1El = document.querySelector(".player-1");
const totalP0 = document.querySelector(".total-score-p0");
const totalP1 = document.querySelector(".total-score-p1");
const rollBtn = document.querySelector(".launch-btn");
const keepBtn = document.querySelector(".keep-btn");
const dice = document.querySelector(".dice");
const currentSP0 = document.querySelector(".current-score-0");
const currentSP1 = document.querySelector(".current-score-1");

let scores, scorePl0, scorePl1, activePlayer, currentScore, playing;

/* game initialization */
function initGame() {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  totalP0.textContent = 0;
  totalP1.textContent = 0;
  currentSP0.textContent = 0;
  currentSP1.textContent = 0;

  player0El.classList.remove("winner");
  player1El.classList.remove("winner");
  player0El.classList.add("active-player");
  player1El.classList.remove("active-player");
}

initGame();

/* changing the player */
function switchPly() {
  document.querySelector(`.current-score-${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("active-player");
  player1El.classList.toggle("active-player");
}

/* roll the dice */
rollBtn.addEventListener("click", function () {
  if (playing) {
    const diceNumb = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove("hidden");
    dice.src = `./img/dice-${diceNumb}.png`;

    if (diceNumb != 1) {
      currentScore += diceNumb;
      document.querySelector(`.current-score-${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPly();
    }
  }
});

/* hold the score */
keepBtn.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`.total-score-p${activePlayer}`).textContent =
      scores[activePlayer];

    /* wins if >= 100 */
    if (scores[activePlayer] >= 100) {
      document.querySelector(`.player-${activePlayer}`).classList.add("winner");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("active-player");
      dice.classList.add("hidden");
      playing = false;
      // AJOUTER MUSIQUE GENRE PINPIIIN
    } else {
      // switch the player if scores holded
      switchPly();
    }
  }
});

document.querySelector(".restart-btn").addEventListener("click", function () {
  initGame();
});

// rules modal
const openModalBtn = document.querySelector(".rules");
const modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".close-modal");

const showModalFcn = function() {
  modal.classList.toggle("hidden");
}

openModalBtn.addEventListener("click", showModalFcn);

closeModalBtn.addEventListener("click", showModalFcn);

window.onclick = function (e) {
  if (e.target == modal) showModalFcn()
};
