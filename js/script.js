const ROCK = document.getElementById("rock");
const PAPER = document.getElementById("paper");
const SCISSORS = document.getElementById("scissors");
const RESET = document.getElementById("reset");

let score = JSON.parse(localStorage.getItem("saveScore")) || {
  wins: 0,
  ties: 0,
  losses: 0
};

const GAME = function (playerMove) {
  const RANDOM_NUMBER = Math.random();
  let compMove = "";

  if (RANDOM_NUMBER < 1 / 3) {
    compMove = "rock";
  } else if (RANDOM_NUMBER < 2 / 3) {
    compMove = "paper";
  } else {
    compMove = "scissors";
  }

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

  const IMP_RESULT = getResult(playerMove, compMove);

  if (IMP_RESULT === "You win!") {
    score.wins += 1;
  } else if (IMP_RESULT === "Tie") {
    score.ties += 1;
  } else {
    score.losses += 1;
  }

  localStorage.setItem("saveScore", JSON.stringify(score));
  updateScoreDisplay();

  console.log(`Player: ${playerMove} | Computer: ${compMove} | Result: ${IMP_RESULT}`);
  console.log(`Wins: ${score.wins} | Ties: ${score.ties} | Losses: ${score.losses}`);
};

// Buttons
ROCK.onclick = () => GAME("rock");
PAPER.onclick = () => GAME("paper");
SCISSORS.onclick = () => GAME("scissors");
RESET.onclick = () => {
  localStorage.removeItem("saveScore");
  score = { wins: 0, ties: 0, losses: 0 };
  console.log("Score Reset");
  updateScoreDisplay();
};
// see scores
function updateScoreDisplay() {
  document.getElementById("wins").innerHTML = `Wins: ${score.wins}`;
  document.getElementById("ties").innerHTML = `Ties: ${score.ties}`;
  document.getElementById("losses").innerHTML = `Losses: ${score.losses}`;
}
