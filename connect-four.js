import Game from "./game.js";

let checkAllSquares = function(){
    for (let row = 0; row < 6; row++){
    for (let col = 0; col < 7; col++){
        let selectSquare = document.getElementById(`square-${row}-${col}`)
        let checkSquare = game.getTokenAt(col, row)
        selectSquare.innerHTML=''
        if (checkSquare===1){
            let tempDiv = document.createElement('div')
            tempDiv.classList.add('token', 'black')
            selectSquare.appendChild(tempDiv)
        } else if (checkSquare===2){
            let tempDiv = document.createElement('div')
            tempDiv.classList.add('token', 'red')
            selectSquare.appendChild(tempDiv)
        }
    }
    }
}

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
    checkAllSquares();
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
    let element = event.target;
    if(!element.id.startsWith("column-")) return;
    let columnIndex = Number.parseInt(element.id[element.id.length-1])
    game.playInColumn(columnIndex);
    updateUI();
  });
});
