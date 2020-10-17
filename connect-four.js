import Game from "./game.js";

let game = undefined;
const gameBoard = document.getElementById("board-holder");
const playArea = document.getElementById("click-targets");
const textArea = document.getElementById("game-name");

/*Check the values for every location on the board. If there is a player value
in that location put the corresponding token into that location. */
const checkAllSquares = () => {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      let selectSquare = document.getElementById(`square-${row}-${col}`);
      selectSquare.innerHTML = "";
      let checkSquare = game.getTokenAt(col, row);

      if (checkSquare === 1) {
        let tempDiv = document.createElement("div");
        tempDiv.classList.add("token", "red");
        selectSquare.appendChild(tempDiv);
      } else if (checkSquare === 2) {
        let tempDiv = document.createElement("div");
        tempDiv.classList.add("token", "black");
        selectSquare.appendChild(tempDiv);
      }
    }
  }
};

/*If a game has been started reveal the board and handle displaying the text
for who is playing and if someone has won.*/
const revealBoard = () => {
  game === undefined
    ? gameBoard.classList.add("is-invisible")
    : (gameBoard.classList.remove("is-invisible"),
      (textArea.innerHTML = `<h1>${game.getName()}</h1>`));
};

/*Set the token color to correspond to the current player */
const changePlayerColor = () => {
  let currentPlayer = game.currentPlayer;
  currentPlayer === 1
    ? (playArea.classList.remove("black"), playArea.classList.add("red"))
    : (playArea.classList.remove("red"), playArea.classList.add("black"));
};

/*Handle switching turns if the move was valid. If the column is full add a visual cue
to the board that lets the player clearly see that no more moves can be made on that
column. */
const handlePlayerMove = (index, invalidMove) => {
  !invalidMove
    ? changePlayerColor()
    : document.getElementById(`column-${index}`).classList.add("full");
};

/*Handle the UI information on every turn.*/
const updateUI = (index) => {
  let invalidMove = false;
  game.checkForWinConditions();
  checkAllSquares();
  index === undefined || game.winnerNumber !== 0
    ? revealBoard()
    : ((invalidMove = game.isColumnFull(index)),
      handlePlayerMove(index, invalidMove));
};

/*Add event listener to start the game when the html document has loaded */
window.addEventListener("DOMContentLoaded", () => {
  const P1 = document.getElementById("player-1-name");
  const P2 = document.getElementById("player-2-name");
  const newGameButton = document.getElementById("new-game");

  /*Only allow the new game button to be pressed if there are values in
  both the player 1 and player 2 name fields are filled out */
  const disableNewGameButton = () => {
    newGameButton.disabled = P1.value === "" && P2.value === "" ? true : false;
  };

  P1.addEventListener("keyup", () => disableNewGameButton());
  P2.addEventListener("keyup", () => disableNewGameButton());

  /*When the new game button is clicked created a game instance, reset the values
  of the player 1 and player 2 input fields and disable the new game button */
  newGameButton.addEventListener("click", () => {
    game = new Game(P1.value, P2.value);
    P1.value = "";
    P2.value = "";
    newGameButton.disabled = true;

    updateUI();
  });

  /*Listen for clicks on the area of the screen that takes the users token input */
  playArea.addEventListener("click", (event) => {
    if (game.winnerNumber !== 0) return; //If a win condition is true, shut this down.

    let element = event.target.id;
    if (!element.startsWith("column-")) return;
    let columnIndex = Number.parseInt(element[element.length - 1]);

    game.playInColumn(columnIndex);
    updateUI(columnIndex);
  });
});
