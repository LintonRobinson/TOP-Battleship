import Player from "./Player.js";

let activeGame = {};

function startGame() {
  // Submitting on enter player names screen creates two player instances with form values as names
  document.addEventListener("submit", (event) => {
    if (event.target.id === "enter-player-names") {
      const playerOneName = document.querySelector("#playerOneName").value;
      const playerTwoName = document.querySelector("#playerTwoName").value;
      event.preventDefault();
      activeGame.playerOne = new Player("human", playerOneName);
      activeGame.playerTwo = new Player("human", playerTwoName);
      console.log("Player Uno", activeGame.playerOne);
      console.log("Player Dos", activeGame.playerTwo);
    }
  });
}

document.addEventListener("DOMContentLoaded", startGame);

export default startGame;
