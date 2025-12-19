import Player from "./Player.js";
import { Cpu } from "./cpu.js";

const game = (() => {
  const activeGame = {
    players: {},
    playerPlacingShips: null,
    playerReceivingAttack: null,
    playerGivingAttack: null,
    shipToPlace: null,
    gameMode: null,
    cpu: null,
    computerDifficulty: null,
    placementOrientation: "vertical",
  };

  function setGameMode(gameMode) {
    activeGame.gameMode = gameMode;
  }

  function getGameMode() {
    return activeGame.gameMode;
  }

  function setComputerDifficulty(computerDifficulty) {
    activeGame.computerDifficulty = computerDifficulty;
  }

  function initializePlayers(playerOneName, playerTwoName) {
    let playerOne;
    let playerTwo;

    switch (activeGame.gameMode) {
      case "onePlayer":
        playerOne = new Player("human", playerOneName, "playerOne");
        playerTwo = new Player("computer", "CPU 🤖", "playerTwo");
        activeGame.cpu = new Cpu();
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

  function checkPlayerForGameLose(player) {
    return player.playerGameboard.areAllShipsSunk();
  }

  function getGameWinnerName() {
    return activeGame.playerGivingAttack.playerName;
  }

  function cpuAttackPlayerOne() {
    const directionOpposite = { top: "bottom", right: "left", bottom: "top", left: "right" };
    const cellToAttack = activeGame.cpu.getCoordinateToAttackPlayerGameboard();

    if (activeGame.players.playerOne.playerGameboard.receiveAttack(cellToAttack.cellCoordinate)) {
      activeGame.cpu.addCoordinateToDiscoveredHitCells(cellToAttack);
      switch (cellToAttack.cellCoordinateOrigin) {
        case "random":
          activeGame.cpu.setCurrentHitShipOriginCoordinate(cellToAttack.cellCoordinate);

          // Push surrounding cells if they are available
          const topNeighborCell = activeGame.cpu.generateFutureShot(cellToAttack.cellCoordinate, "top", true);
          const bottomNeighborCell = activeGame.cpu.generateFutureShot(cellToAttack.cellCoordinate, "bottom", true);
          const leftNeighborCell = activeGame.cpu.generateFutureShot(cellToAttack.cellCoordinate, "left", true);
          const rightNeighborCell = activeGame.cpu.generateFutureShot(cellToAttack.cellCoordinate, "right", true);

          if (topNeighborCell && !activeGame.cpu.hasCellBeenAttacked(topNeighborCell.cellCoordinate)) activeGame.cpu.addCellToCellsToExploreFromHitShip(topNeighborCell);

          if (rightNeighborCell && !activeGame.cpu.hasCellBeenAttacked(rightNeighborCell.cellCoordinate))
            activeGame.cpu.addCellToCellsToExploreFromHitShip(rightNeighborCell);

          if (bottomNeighborCell && !activeGame.cpu.hasCellBeenAttacked(bottomNeighborCell.cellCoordinate))
            activeGame.cpu.addCellToCellsToExploreFromHitShip(bottomNeighborCell);

          if (leftNeighborCell && !activeGame.cpu.hasCellBeenAttacked(leftNeighborCell.cellCoordinate))
            activeGame.cpu.addCellToCellsToExploreFromHitShip(leftNeighborCell);

          break;

        case "cellsToExploreFromHitShip":
          const neighborCell = activeGame.cpu.generateFutureShot(cellToAttack.cellCoordinate, cellToAttack.cell.relativeCellOrientationOrigin, false);
          // If the last attempt in the direction was a hit and the next in the direction was a hit, go in the opposite direction

          if (
            (neighborCell && !activeGame.cpu.hasCellBeenAttacked(neighborCell.cellCoordinate)) ||
            (!neighborCell && !activeGame.cpu.hasCellBeenAttacked(neighborCell.cellCoordinate))
          ) {
            activeGame.cpu.addCellToFrontOfCellsToExploreFromHitShip(neighborCell);
          } else if (neighborCell && activeGame.cpu.hasCellBeenAttacked(neighborCell.cellCoordinate)) {
            const nextOppositeCell = activeGame.cpu.generateFutureShot(
              cellToAttack.cellCoordinate,
              directionOpposite[cellToAttack.cell.relativeCellOrientationOrigin],
              false,
            );

            activeGame.cpu.addCellToFrontOfCellsToExploreFromHitShip(nextOppositeCell);

            // Remove duplicate cell
          }

          // activeGame.cpu.removeCellFromCellsToExploreFromHitShip(cellToAttack.cellCoordinate);

          break;
      }

      activeGame.cpu.addCoordinateToHitCells(cellToAttack.cellCoordinate);

      // For each ship in opponents placed ship, record if a ship is sunk and update cpu set of sunk ships
      //if ship isnt there, add

      // if the ship was sunk, clear cells to explore

      // if the ship is sunk and loop through discoveredHitCells if coordinate is in the ship that is sunk activeShipCoordinates, remove from discovered cells. Get coordinate cpu func will need control statement that checks if random his has lead to sunk ship, get number of sunk ships at start?
      activeGame.players.playerOne.playerGameboard.placedShips.forEach((placedShipObject) => {
        if (placedShipObject.isSunk() && activeGame.cpu.wasNewShipSunk(placedShipObject)) {
          activeGame.cpu.addShipToOpponentSunkShips(placedShipObject);

          const cpuDiscoveredHitCells = activeGame.cpu.getDiscoveredHitCells();

          const activeShipCoordinates = placedShipObject.activeShipCoordinates;
          cpuDiscoveredHitCells.forEach((discoveredHitCell) => {
            if (!activeShipCoordinates.includes(discoveredHitCell.cellCoordinate)) {
              activeGame.cpu.addIsolatedHitCellsFromSunkShipHitCells(discoveredHitCell);
            } else {
            }
          });

          activeGame.cpu.resetToDefaultsAfterSunkShip();

          // AAAADDDDDDDDD HIT SHIP CORRECTLY
        }
      });

      // Check if the number of sunkShips increased. If it has, add remainder of the

      // Get the discovered cells, and the new ship that is sunk.
    } else {
      // Missed SHot
      activeGame.cpu.addCoordinateToMissedCells(cellToAttack.cellCoordinate);
      if (cellToAttack.isCoordinateOriginalSurroundngCell === false) {
        // add opposite from cell orgin
        const neighborCell = activeGame.cpu.generateFutureShot(
          activeGame.cpu.getCurrentHitShipOriginCoordinate(),
          directionOpposite[cellToAttack.cell.relativeCellOrientationOrigin],
        );
        if (neighborCell && !activeGame.cpu.hasCellBeenAttacked(neighborCell.cellCoordinate)) activeGame.cpu.addCellToFrontOfCellsToExploreFromHitShip(neighborCell);
      }
    }

    console.log("THE ATTACKED CELL", cellToAttack);
    console.log("cpu hit CELLS", activeGame.cpu.hitCells);
    console.log("cpu miss CELLS", activeGame.cpu.missedCells);
  }

  return {
    activeGame: activeGame,
    setGameMode: setGameMode,
    getGameMode: getGameMode,
    setComputerDifficulty: setComputerDifficulty,
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
    checkPlayerForGameLose: checkPlayerForGameLose,
    getGameWinnerName: getGameWinnerName,
    cpuAttackPlayerOne: cpuAttackPlayerOne,
  };
})();

document.addEventListener("DOMContentLoaded", startGame);

export { game };
