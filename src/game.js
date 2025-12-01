import Player from "./Player.js";
import Gameboard from "./Gameboard.js";
import { renderPlaceShipGameboardCells, addShipElementsToPlaceShipsWrapper, renderPlacemenErrorMessage, updatePlaceYourShipsTitle } from "./ui.js";
import { isPlacementValid, randomlyPlacePlayerShips } from "./helpers.js";

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
        playerTwo = new Player("computer", playerTwoName);
        break;
      case "twoPlayer":
        playerOne = new Player("human", playerOneName);
        playerTwo = new Player("human", playerTwoName);
        break;
    }

    activeGame.players.playerOne = playerOne;
    activeGame.players.playerTwo = playerTwo;
  }

  function initializeGame() {
    // Setting playerPlacingShips and playerReceivingAttack
    activeGame.playerPlacingShips = activeGame.players[0];
    activeGame.playerReceivingAttack = activeGame.players[1];
  }

  function setPlayerPlacingShips(player) {
    activeGame.playerPlacingShips = player;
  }

  function getPlayerPlacingShips() {
    return activeGame.playerPlacingShips;
  }

  function setPlacementOrientation(shipOrientation) {
    activeGame.placementOrientation = shipOrientation;
  }

  function getPlacementOrientation(shipOrientation) {
    return activeGame.placementOrientation;
  }

  function setShipToPlace(shipToPlace) {
    activeGame.shipToPlace = shipToPlace;
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

  function getPlayerName(player) {
    console.log("kdkdkdk", player);
    return player.playerName;
  }

  function getPlayerGameboard(player) {
    return player.playerGameboard;
  }

  function getPlayerPlacingShips() {
    return activeGame.playerPlacingShips;
  }

  function getShipToPlace() {
    return activeGame.shipToPlace;
  }

  function togglePlaceShipOrientation() {
    activeGame.placementOrientation === "horizontal" ? (activeGame.placementOrientation = "vertical") : (activeGame.placementOrientation = "horizontal");
  }

  function randomlyPlacePlayerShips() {
    const shipNames = ["aircraftCarrier", "battleship", "cruiser", "submarine", "destroyer"];
    const shipOrientations = ["horizontal", "vertical"];
    const gameboardColumns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const gameboardRows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    // Initializing random placeShip variables
    let randomColumn;
    let randomRow;
    let randomCellCoordinate;
    let randomShipName;
    let randomShipOrientation;

    function generateRandomShipPlacement() {
      randomColumn = gameboardColumns[Math.floor(Math.random() * 10)];
      randomRow = gameboardRows[Math.floor(Math.random() * 10)];
      randomCellCoordinate = `${randomColumn}${randomRow}`;
      randomShipName = shipNames[Math.floor(Math.random() * 5)];
      randomShipOrientation = shipOrientations[Math.floor(Math.random() * 2)];
    }

    getPlayerPlacingShips().createNewGameboard();
    // Loop until there are no ships to place
    while (activeGame.playerPlacingShips.playerGameboard.unplacedShips.size) {
      generateRandomShipPlacement();
      activeGame.playerPlacingShips.playerGameboard.placeShip(randomShipName, randomCellCoordinate, randomShipOrientation);
      // game.getPlayerGameboard(game.getPlayerPlacingShips()).placeShip(randomShipName, randomCellCoordinate, randomShipOrientation);
    }
    console.log("playerPlacingShipsGameboard.unplacedShips.size", activeGame.players.playerOne);
    console.log("new plea ppc", activeGame.playerPlacingShips);
  }

  function playerHasShipsToPlace(player) {
    if (player.playerGameboard.unplacedShips.size) {
      return true;
    } else {
      return false;
    }
  }

  function placePlayerShip(clickedCellId) {
    activeGame.playerPlacingShips.playerGameboard.placeShip(activeGame.shipToPlace, clickedCellId, activeGame.placementOrientation);
  }

  function startPlayerTwoShipPlacements() {
    activeGame.playerPlacingShips = activeGame.players.playerTwo;
  }

  return {
    activeGame: activeGame,
    setGameMode: setGameMode,
    initializePlayers: initializePlayers,
    initializeGame: initializeGame,
    setPlacementOrientation: setPlacementOrientation,
    getPlacementOrientation: getPlacementOrientation,
    togglePlaceShipOrientation: togglePlaceShipOrientation,
    setShipToPlace: setShipToPlace,
    setPlayerPlacingShips: setPlayerPlacingShips,
    setPlayerReceivingAttack: setPlayerReceivingAttack,
    allPlayerShipsPlaced: allPlayerShipsPlaced,
    getPlayer: getPlayer,
    getPlayerName: getPlayerName,
    getPlayerGameboard: getPlayerGameboard,
    getPlayerPlacingShips: getPlayerPlacingShips,
    getShipToPlace: getShipToPlace,
    randomlyPlacePlayerShips: randomlyPlacePlayerShips,
    playerHasShipsToPlace: playerHasShipsToPlace,
    placePlayerShip: placePlayerShip,
    startPlayerTwoShipPlacements: startPlayerTwoShipPlacements,
  };
})();

/*

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

*/

// Adds event listeners to ".placing-ships-gameboard" that places ships when game gameboard-cell is clicked and activeGame.shipToPlace is not null

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
      isPlacementValid(activeGame.shipToPlace, event.target.dataset.cellId, activeGame.placementOrientation, activeGame.playerPlacingShips.playerGameboard) === "valid"
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
