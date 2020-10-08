import Game from "./game.js";

let game = undefined;
const gameBoard = document.getElementById("board-holder");
const playArea = document.getElementById("click-targets");

const updateUI = () => {
  let currentPlayer = game.currentPlayer;
  game === undefined
    ? gameBoard.setAttribute("class", "is-invisible")
    : (gameBoard.removeAttribute("class"),
      (document.getElementById("game-name").innerHTML = game.getName()));
  currentPlayer === 1
    ? (playArea.classList.remove("black"), playArea.classList.add("red"))
    : (playArea.classList.remove("red"), playArea.classList.add("black"));
};

window.addEventListener("DOMContentLoaded", () => {
  const P1 = document.getElementById("player-1-name");
  const P2 = document.getElementById("player-2-name");
  const newGameButton = document.getElementById("new-game");

  const disableNewGameButton = () => {
    newGameButton.disabled = P1.value === "" && P2.value === "" ? true : false;
  };

  P1.addEventListener("keyup", disableNewGameButton);

  P2.addEventListener("keyup", disableNewGameButton);

  newGameButton.addEventListener("click", () => {
    game = new Game(P1.value, P2.value);
    P1.value = "";
    P2.value = "";
    newGameButton.disabled = true;
    updateUI();
  });

  playArea.addEventListener("click", (event) => {
    game.playInColumn();
    updateUI();
  });
});
