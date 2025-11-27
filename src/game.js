import Player from "./Player.js";
import Gameboard from "./Gameboard.js";
import {
  renderPlaceShipGameboardCells,
  removeShipElementFromPlaceShipsWrapper,
  addShipElementsToPlaceShipsWrapper,
  addPlaceShipDragEventListeners,
  renderPlacemenErrorMessage,
  updatePlaceYourShipsTitle,
} from "./ui.js";
import { isMoveValid, randomlyPlacePlayerShips } from "./helpers.js";

const game = (() => {
  const activeGame = {
    players: {},
    playerPlacingShips: null,
    playerReceivingAttack: null,
    shipToPlace: null,
    gameMode: null,
    placementOrientation: "vertical",
  };

  function setGameMode(gameMode) {
    activeGame.gameMode = gameMode;
  }

  function initializePlayers(playerOneName, playerTwoName) {
    let playerOne;
    let playerTwo;
    switch (activeGame.gameMode) {
      case "onePlayer":
        playerOne = new Player("human", playerOneName);
        playerTwo = new Player("human", playerTwoName);
        break;
      case "twoPlayer":
        playerOne = new Player("human", playerOneName);
        playerTwo = new Player("human", playerTwoName);
        break;
    }

    activeGame.players.playerOne = playerOne;
    activeGame.players.playerOne = playerTwo;
  }

  function initializeGame() {
    // Setting playerPlacingShips and playerReceivingAttack
    activeGame.playerPlacingShips = activeGame.players[0];
    activeGame.playerReceivingAttack = activeGame.players[1];
  }

  function setPlayerPlacingShips(player) {
    activeGame.playerPlacingShips = player;
    renderPlaceShipGameboardCells();
  }

  function setPlacementOrientation(shipOrientation) {
    activeGame.placementOrientation = shipOrientation;
  }

  function setPlayerReceivingAttack(player) {
    activeGame.playerReceivingAttack = player;
  }

  function allPlayerShipsPlaced(player) {
    if (!player.playerGameboard.unplacedShips.size) {
      return true;
    } else {
      return false;
    }
  }

  function getPlayer(playerToReturn) {
    return activeGame.players[playerToReturn];
  }

  function getPlayerPlacingShips() {
    return activeGame.playerPlacingShips;
  }

  return {
    activeGame: activeGame,
    setGameMode: setGameMode,
    initializePlayers: initializePlayers,
    initializeGame: initializeGame,
    setPlacementOrientation: setPlacementOrientation,
    setPlayerPlacingShips: setPlayerPlacingShips,
    allPlayerShipsPlaced: allPlayerShipsPlaced,
    getPlayer: getPlayer,
    getPlayerPlacingShips: getPlayerPlacingShips,
  };
})();

function startGame() {
  const saveShipPlacementsBtn = document.querySelector("#saveShipPlacements");
  saveShipPlacementsBtn.addEventListener("click", () => {
    if (activeGame.playerPlacingShips === activeGame.playerOne) {
      startPlayerTwoShipPlacements();
      updatePlaceYourShipsTitle(activeGame.playerPlacingShips);
      activeGame.placementOrientation = "vertical";
    } else {
      if (activeGame.playerPlacingShips.playerGameboard.unplacedShips.size) {
        renderPlacemenErrorMessage("you must place all five ships");
      }
    }
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
        activeGame.playerPlacingShips.playerGameboard.placeShip(activeGame.shipToPlace, clickedCellId, activeGame.placementOrientation);

        activeGame.shipToPlace = null;
        const placingShipsGameboardWrapper = document.querySelector(".placing-ships-gameboard");
        placingShipsGameboardWrapper.classList.remove("placingShips");

        renderPlaceShipGameboardCells(activeGame.playerPlacingShips.playerGameboard);
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
        activeGame.playerPlacingShips.playerGameboard.placeShip(activeGame.shipToPlace, clickedCellId, activeGame.placementOrientation);

        activeGame.shipToPlace = null;

        const placingShipsGameboardWrapper = document.querySelector(".placing-ships-gameboard");
        placingShipsGameboardWrapper.classList.remove("placingShips");

        renderPlaceShipGameboardCells(activeGame.playerPlacingShips.playerGameboard);
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

export function startPlayerTwoShipPlacements() {
  if (!activeGame.playerPlacingShips.playerGameboard.unplacedShips.size) {
    addShipElementsToPlaceShipsWrapper();
    addPlaceShipDragEventListeners();
    activeGame.playerPlacingShips = activeGame.playerTwo;
    renderPlaceShipGameboardCells();
  } else {
    renderPlacemenErrorMessage("you must place all five ships");
  }
}

// Adds event listeners to ".placing-ships-gameboard" that places ships when game gameboard-cell is clicked and activeGame.shipToPlace is not null
function addGameplayGameboardClickEventListeners() {
  const gameplayGameboardWrapper = document.querySelector(".gameplay-gameboard");
  gameplayGameboardWrapper.forEach((gameboard) => {
    gameboard.addEventListener("click", () => {});
  });

  placingShipsGameboardWrapper.addEventListener("click", (event) => {
    // Places ship when game gameboard-cell is clicked and activeGame.shipToPlace is not null

    if (
      event.target.classList.contains("gameboard-cell") &&
      activeGame.shipToPlace &&
      isMoveValid(activeGame.shipToPlace, event.target.dataset.cellId, activeGame.placementOrientation, activeGame.playerPlacingShips.playerGameboard) === "valid"
    ) {
      if (activeGame.playerPlacingShips.playerGameboard.unplacedShips.size) {
        const clickedCellId = event.target.dataset.cellId;
        activeGame.playerPlacingShips.playerGameboard.placeShip(activeGame.shipToPlace, clickedCellId, activeGame.placementOrientation);

        activeGame.shipToPlace = null;
        const placingShipsGameboardWrapper = document.querySelector(".placing-ships-gameboard");
        placingShipsGameboardWrapper.classList.remove("placingShips");

        renderPlaceShipGameboardCells(activeGame.playerPlacingShips.playerGameboard);
      } else {
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", startGame);

export { game };
