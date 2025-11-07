import Player from "./Player.js";
import Gameboard from "./Gameboard.js";
import renderGameboardCells from "./ui.js";

let activeGame = {
  shipToPlace: null,
  gameMode: null,
  placementOrientation: "vertical",
};

function startGame() {
  // Submitting on enter player names screen creates two player instances with form values as names
  document.addEventListener("submit", (event) => {
    if (event.target.id === "enter-player-names") {
      const playerOneName = document.querySelector("#playerOneName").value;
      const playerTwoName = document.querySelector("#playerTwoName").value;
      event.preventDefault();
      activeGame.playerOne = new Player("human", playerOneName);
      activeGame.playerTwo = new Player("human", playerTwoName);
    }

    // MOVE TO UI MODULE
  });
}

// Adds event listeners to ".placing-ships-gameboard" that places ships when game gameboard-cell is clicked and activeGame.shipToPlace is not null
function addGameboardClickEventListeners() {
  const placingShipsGameboardWrapper = document.querySelector(".placing-ships-gameboard");
  placingShipsGameboardWrapper.addEventListener("click", (event) => {
    // Places ship when game gameboard-cell is clicked and activeGame.shipToPlace is not null
    if (event.target.classList.contains("gameboard-cell") && activeGame.shipToPlace) {
      if (activeGame.playerOne.playerGameboard.unplacedShips.size) {
        activeGame.playerOne.playerGameboard.placeShip(activeGame.shipToPlace, event.target.dataset.cellId, activeGame.placementOrientation);
      } else {
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", startGame);

export { startGame, addGameboardClickEventListeners, activeGame };
