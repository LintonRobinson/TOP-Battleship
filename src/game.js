import Player from "./Player.js";
import Gameboard from "./Gameboard.js";
import { renderGameboardCells, removeShipElementFromPlaceShipsWrapper } from "./ui.js";

let activeGame = {
  gamePhase: "shipPlacement",
  playerPlacingShips: "playerOne",
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

    console.log("activeGame.placementOrientation", activeGame.placementOrientation);
  });
}

// Adds event listeners to ".placing-ships-gameboard" that places ships when game gameboard-cell is clicked and activeGame.shipToPlace is not null
function addPlaceShipGameboardClickEventListeners() {
  const placingShipsGameboardWrapper = document.querySelector(".placing-ships-gameboard");
  placingShipsGameboardWrapper.addEventListener("click", (event) => {
    // Places ship when game gameboard-cell is clicked and activeGame.shipToPlace is not null
    if (event.target.classList.contains("gameboard-cell") && activeGame.shipToPlace) {
      if (activeGame.playerOne.playerGameboard.unplacedShips.size) {
        const clickedCellId = event.target.dataset.cellId;
        alert(clickedCellId);
        console.log("DataSet", event.target.dataset.cellId);
        activeGame.playerOne.playerGameboard.placeShip(activeGame.shipToPlace, clickedCellId, activeGame.placementOrientation);
        removeShipElementFromPlaceShipsWrapper(activeGame.shipToPlace);

        activeGame.shipToPlace = null;

        const placingShipsGameboardWrapper = document.querySelector(".placing-ships-gameboard");
        placingShipsGameboardWrapper.classList.remove("placingShips");

        renderGameboardCells(activeGame.playerOne.playerGameboard);
      } else {
      }
    }
  });
}

// state of mouse down function

// on mouse down of ship to drag in its conainer within that event listener add a hover event listener to gameboard

function togglePlaceShipOrientation() {
  activeGame.placementOrientation === "horizontal" ? (activeGame.placementOrientation = "vertical") : (activeGame.placementOrientation = "horizontal");
}

document.addEventListener("DOMContentLoaded", startGame);

export { startGame, addPlaceShipGameboardClickEventListeners, activeGame, togglePlaceShipOrientation };
