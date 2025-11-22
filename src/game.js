import Player from "./Player.js";
import Gameboard from "./Gameboard.js";
import { renderGameboardCells, removeShipElementFromPlaceShipsWrapper, addShipElementsToPlaceShipsWrapper, addPlaceShipDragEventListeners } from "./ui.js";
import { isMoveValid, randomlyPlacePlayerShips } from "./helpers.js";

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
      activeGame.playerPlacingShips = activeGame.playerOne;
    }
  });

  const randomShipPlacementsBtn = document.querySelector("#randomShipPlacements");
  randomShipPlacementsBtn.addEventListener("click", () => {
    randomlyPlacePlayerShips(activeGame.playerPlacingShips.playerGameboard);
  });

  const resetShipPlacementsBtn = document.querySelector("#resetShipPlacements");
  resetShipPlacementsBtn.addEventListener("click", () => {
    activeGame.playerPlacingShips.createNewGameboard();
    console.log("yjfjfjf", activeGame.playerPlacingShips.playerGameboard);
    removeShipElementFromPlaceShipsWrapper("aircraftCarrier");
    removeShipElementFromPlaceShipsWrapper("battleship");
    removeShipElementFromPlaceShipsWrapper("cruiser");
    removeShipElementFromPlaceShipsWrapper("submarine");
    removeShipElementFromPlaceShipsWrapper("destroyer");
    addShipElementsToPlaceShipsWrapper();
    addPlaceShipDragEventListeners();
    renderGameboardCells(activeGame.playerPlacingShips.playerGameboard);
  });
}

// Adds event listeners to ".placing-ships-gameboard" that places ships when game gameboard-cell is clicked and activeGame.shipToPlace is not null
function addPlaceShipGameboardClickEventListeners() {
  const placingShipsGameboardWrapper = document.querySelector(".placing-ships-gameboard");
  placingShipsGameboardWrapper.addEventListener("click", (event) => {
    // Places ship when game gameboard-cell is clicked and activeGame.shipToPlace is not null

    if (
      event.target.classList.contains("gameboard-cell") &&
      activeGame.shipToPlace &&
      isMoveValid(activeGame.shipToPlace, event.target.dataset.cellId, activeGame.placementOrientation, activeGame.playerPlacingShips.playerGameboard) === "valid"
    ) {
      if (activeGame.playerPlacingShips.playerGameboard.unplacedShips.size) {
        const clickedCellId = event.target.dataset.cellId;
        activeGame.playerOne.playerGameboard.placeShip(activeGame.shipToPlace, clickedCellId, activeGame.placementOrientation);

        activeGame.shipToPlace = null;
        const placingShipsGameboardWrapper = document.querySelector(".placing-ships-gameboard");
        placingShipsGameboardWrapper.classList.remove("placingShips");

        renderGameboardCells(activeGame.playerOne.playerGameboard);
      } else {
      }
    }
  });

  placingShipsGameboardWrapper.addEventListener("drop", (event) => {
    // Places ship when game gameboard-cell is clicked and activeGame.shipToPlace is not null
    if (
      event.target.classList.contains("gameboard-cell") &&
      activeGame.shipToPlace &&
      isMoveValid(activeGame.shipToPlace, event.target.dataset.cellId, activeGame.placementOrientation, activeGame.playerPlacingShips.playerGameboard) === "valid"
    ) {
      if (activeGame.playerPlacingShips.playerGameboard.unplacedShips.size) {
        const clickedCellId = event.target.dataset.cellId;
        activeGame.playerOne.playerGameboard.placeShip(activeGame.shipToPlace, clickedCellId, activeGame.placementOrientation);

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
