import Game from './game.js';

const game = undefined;

window.addEventListener("DOMContentLoaded", e => {
    const P1 = document.getElementById("player-1-name");
    const P2 = document.getElementById("player-2-name");
    const newGameButton = document.getElementById("new-game");
    let curr = P1

    console.log(curr)

    curr.addEventListener("keyup", e => {
        if(P1.text !== "" && P2.text !== ""){
        newGameButton.setAttribute("disabled", false);
        } else {
            newGameButton.setAttribute("disabled", true);
        }
    })

})
