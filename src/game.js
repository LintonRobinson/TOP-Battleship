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

    // Add event listener to placeShipsWrapper that sets state of activeGame.shipToPlace to clicked ship child element
    const placeShipsWrapper = document.querySelector("#place-ships");

    placeShipsWrapper.addEventListener("click", (event) => {
      if (activeGame.shipToPlace != event.target.id && event.target.classList.contains("placement-ship")) {
        document.querySelectorAll(".placement-ship").forEach((placementShip) => {
          placementShip.classList.remove("activeShipToPlace");
        });
        activeGame.shipToPlace = event.target.id;
        event.target.classList.add("activeShipToPlace");
      } else {
        activeGame.shipToPlace = null;
        event.target.classList.remove("activeShipToPlace");
      }
    });
  });
}

function addGameboardEventListeners() {
  const placingShipsGameboardWrapper = document.querySelector(".placing-ships-gameboard");
  placingShipsGameboardWrapper.addEventListener("click", (event) => {
    //if (gameMode === "human") {
    //}

    // Places ship when game gameboard-cell is clicked and activeGame.shipToPlace is not null

    if (event.target.classList.contains("gameboard-cell") && activeGame.shipToPlace) {
      if (activeGame.playerOne.playerGameboard.unplacedShips.size) {
        console.log("Cell", event.target.dataset.cellId);
        activeGame.playerOne.playerGameboard.placeShip(activeGame.shipToPlace, event.target.dataset.cellId, activeGame.placementOrientation);
        //renderGameboardCells();
        console.log("Player Placed Ships", activeGame.playerOne.playerGameboard.placedShips);
      } else {
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", startGame);

export { startGame, addGameboardEventListeners };
