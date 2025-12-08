import Player from "./Player.js";
import { renderPlaceShipGameboardCells, addShipElementsToPlaceShipsWrapper, renderPlacemenErrorMessage, updatePlaceYourShipsTitle } from "./ui.js";
import { isPlacementValid, randomlyPlacePlayerShips } from "./helpers.js";

const game = (() => {
  const activeGame = {
    players: {},
    playerPlacingShips: null,
    playerReceivingAttack: null,
    playerGivingAttack: null,
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
        playerOne = new Player("human", playerOneName, "playerOne");
        playerTwo = new Player("computer", playerTwoName, "playerTwo");
        break;
      case "twoPlayer":
        playerOne = new Player("human", playerOneName, "playerOne");
        playerTwo = new Player("human", playerTwoName, "playerTwo");
        break;
    }

    activeGame.players.playerOne = playerOne;
    activeGame.players.playerTwo = playerTwo;
  }

  function initializeGame() {
    // Setting playerPlacingShips and playerReceivingAttack
    activeGame.playerPlacingShips = activeGame.players.playerOne;
    activeGame.playerReceivingAttack = activeGame.players.playerTwo;
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

  function getPlacementOrientation() {
    return activeGame.placementOrientation;
  }

  function setShipToPlace(shipToPlace) {
    activeGame.shipToPlace = shipToPlace;
  }
  function setPlayerReceivingAttack(player) {
    activeGame.playerReceivingAttack = player;
  }

  function getPlayerReceivingAttack() {
    return activeGame.playerReceivingAttack;
  }

  function setPlayerGivingAttack(player) {
    activeGame.playerGivingAttack = player;
  }

  function getPlayerGivingAttack() {
    return activeGame.playerReceivingAttack;
  }

  function getPlayerReceivingAttackName() {
    return activeGame.playerReceivingAttack.playerName;
  }

  function getPlayerReceivingAttackId() {
    return activeGame.playerReceivingAttack.playerId;
  }

  function getPlayerReceivingAttackGameboard() {
    return activeGame.playerReceivingAttack.playerGameboard;
  }

  function getPlayerGivingAttackName() {
    return activeGame.playerGivingAttack.playerName;
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

  function togglePlayerReceivingGivingAttack() {
    activeGame.playerReceivingAttack.playerId === "playerOne"
      ? (activeGame.playerReceivingAttack = activeGame.players.playerTwo)
      : (activeGame.playerReceivingAttack = activeGame.players.playerOne);

    activeGame.playerGivingAttack.playerId === "playerOne"
      ? (activeGame.playerGivingAttack = activeGame.players.playerTwo)
      : (activeGame.playerGivingAttack = activeGame.players.playerOne);
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

  function receivePlayerAttack(cellToAttack) {
    activeGame.playerReceivingAttack.playerGameboard.receiveAttack(cellToAttack);
  }

  function getPlayerReceivingAttackMissedShots() {
    return activeGame.playerReceivingAttack.playerGameboard.missedShots;
  }

  function getPlayerReceivingAttackHitShots() {
    return activeGame.playerReceivingAttack.playerGameboard.hitShots;
  }

  function isShipSunk(shipInstance) {
    return shipInstance.isSunk();
  }

  function getShipActiveShipCoordinates(shipInstance) {
    return shipInstance.getActiveShipCoordinates();
  }

  function getGameboardHitShipCells(playerGameboard) {
    return playerGameboard.hitShipCells;
  }

  function getGameboardMissedShipCells(playerGameboard) {
    return playerGameboard.missedCells;
  }

  function getGameboardPlacedShips(playerGameboard) {
    return playerGameboard.placedShips;
  }

  function getShipName(shipInstance) {
    return shipInstance.shipName;
  }

  function checkForGameWin() {
    return activeGame.playerReceivingAttack.playerGameboard.areAllShipsSunk();
  }

  function getGameWinnerName() {
    return activeGame.playerGivingAttack.playerName;
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
    setPlayerGivingAttack: setPlayerGivingAttack,
    getPlayerGivingAttack: getPlayerGivingAttack,
    togglePlayerReceivingGivingAttack: togglePlayerReceivingGivingAttack,
    getPlayerReceivingAttack: getPlayerReceivingAttack,
    getPlayerReceivingAttackName: getPlayerReceivingAttackName,
    getPlayerReceivingAttackId: getPlayerReceivingAttackId,
    getPlayerReceivingAttackGameboard: getPlayerReceivingAttackGameboard,
    getPlayerGivingAttackName: getPlayerGivingAttackName,
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
    receivePlayerAttack: receivePlayerAttack,
    getPlayerReceivingAttackMissedShots: getPlayerReceivingAttackMissedShots,
    getPlayerReceivingAttackHitShots: getPlayerReceivingAttackHitShots,
    isShipSunk: isShipSunk,
    getShipName: getShipName,
    getShipActiveShipCoordinates: getShipActiveShipCoordinates,
    getGameboardHitShipCells: getGameboardHitShipCells,
    getGameboardMissedShipCells: getGameboardMissedShipCells,
    getGameboardPlacedShips: getGameboardPlacedShips,
    checkForGameWin: checkForGameWin,
    getGameWinnerName: getGameWinnerName,
  };
})();

document.addEventListener("DOMContentLoaded", startGame);

export { game };
