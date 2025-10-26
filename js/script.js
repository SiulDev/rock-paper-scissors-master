const ROCK_BTN = document.getElementById("rock");
const PAPER_BTN = document.getElementById("paper");
const SCISSORS_BTN = document.getElementById("scissors");
const RESET_BTN = document.getElementById("reset");

const WINS_EL = document.getElementById("wins");
const TIES_EL = document.getElementById("ties");
const LOSSES_EL = document.getElementById("losses");
const PLAYER_MOVE_ICON = document.getElementById("player-move-icon");
const COMP_MOVE_ICON = document.getElementById("comp-move-icon");
const RESULT_MESSAGE = document.getElementById("game-result-message");

const MOVES = ["rock", "paper", "scissors"];

const moveMap = {
  rock: "✊",
  paper: "✋",
  scissors: "✌️"
};

let score = JSON.parse(localStorage.getItem("saveScore")) || {
  wins: 0,
  ties: 0,
  losses: 0
};

function getResult(playerMove, compMove) {
  if (playerMove === compMove) {
    return "Tie";
  } else if (
    (playerMove === "rock" && compMove === "scissors") ||
    (playerMove === "paper" && compMove === "rock") ||
    (playerMove === "scissors" && compMove === "paper")
  ) {
    return "You win!";
  } else {
    return "You lost...";
  }
}

function updateScoreDisplay() {
  WINS_EL.textContent = `Wins: ${score.wins}`;
  TIES_EL.textContent = `Ties: ${score.ties}`;
  LOSSES_EL.textContent = `Losses: ${score.losses}`;
}

function updateResultDisplay(playerMove, compMove, result) {
  PLAYER_MOVE_ICON.textContent = moveMap[playerMove];
  COMP_MOVE_ICON.textContent = moveMap[compMove];
  RESULT_MESSAGE.textContent = result;
}

const playGame = function (playerMove) {
  // Lógica de la IA simplificada
  const randomIndex = Math.floor(Math.random() * MOVES.length);
  const compMove = MOVES[randomIndex];

  const result = getResult(playerMove, compMove);

  // Actualización de la puntuación
  if (result === "You win!") {
    score.wins += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  } else {
    score.losses += 1;
  }

  localStorage.setItem("saveScore", JSON.stringify(score));

  // Actualización del DOM
  updateScoreDisplay();
  updateResultDisplay(playerMove, compMove, result);

  console.log(`Player: ${playerMove} | Computer: ${compMove} | Result: ${result}`);
};

// Asignación de Eventos (addEventListener es la mejor práctica)
ROCK_BTN.addEventListener("click", () => playGame("rock"));
PAPER_BTN.addEventListener("click", () => playGame("paper"));
SCISSORS_BTN.addEventListener("click", () => playGame("scissors"));

RESET_BTN.addEventListener("click", () => {
  localStorage.removeItem("saveScore");
  score = { wins: 0, ties: 0, losses: 0 };

  // Opcional: limpiar los íconos de jugada al resetear
  updateResultDisplay("?", "?", "");

  updateScoreDisplay();
  console.log("Score Reset");
});

// Inicialización de la pantalla
updateScoreDisplay();
