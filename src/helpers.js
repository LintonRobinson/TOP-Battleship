import {} from "./game.js";
import { renderPlaceShipGameboardCells } from "./ui.js";

function isShipPlacedOnGameboard(shipName, shipPlacementCell, shipOrientation) {
  const shipLengths = { aircraftCarrier: 5, battleship: 4, cruiser: 3, submarine: 3, destroyer: 2 };
  const gameboardColumns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const gameboardRows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  if (shipOrientation === "horizontal") {
    // Get index of starting cell
    // Get current column as string and make uppercase
    const cellColumn = shipPlacementCell.split("")[0].toUpperCase();
    // Get index of gameboardColumns item that matches cellColumn
    const letterIndex = gameboardColumns.indexOf(cellColumn);
    // Add the ship length to the index. If greater than 9, out of bounds
    if (letterIndex + shipLengths[shipName] - 1 < 10) {
      return true;
    } else {
      return false;
    }
  } else {
    // Get index of starting cell
    // Get current row as string
    const cellRow = shipPlacementCell.split("").length === 2 ? shipPlacementCell.split("")[1] : `${shipPlacementCell.split("")[1]}${shipPlacementCell.split("")[2]}`;
    // Get index of gameboardRows item that matches cellRow
    const numberIndex = gameboardRows.indexOf(cellRow);
    if (numberIndex + shipLengths[shipName] - 1 < 10) {
      return true;
    } else {
      return false;
    }
  }
}

function isShipPlacedOverlapping(shipLength, shipPlacementCell, shipOrientation, playerGameboard) {
  const shipCells = [];
  let currentCell = shipPlacementCell;
  for (let i = 0; i < shipLength; i++) {
    shipCells.push(currentCell);
    currentCell = getNextCell(currentCell, shipOrientation);
  }

  for (const shipCell of shipCells) {
    if (playerGameboard.activeShipCells.has(shipCell)) {
      return true;
    }
  }

  function getNextCell(currentCell, shipOrientation) {
    const gameboardColumns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const gameboardRows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    if (shipOrientation === "horizontal") {
      // Get current column as string and make uppercase
      const currentCellColumn = currentCell.split("")[0].toUpperCase();
      // Get index of gameboardColumns item that matches currentCellColumn
      const letterIndex = gameboardColumns.indexOf(currentCellColumn);
      const cellRow = currentCell.split("").length === 2 ? currentCell.split("")[1] : `${currentCell.split("")[1]}${currentCell.split("")[2]}`;
      // Return a string (joined array) that its former array consisted of the incremented column, and same row
      let nextCoordinate = [gameboardColumns[letterIndex + 1], cellRow];
      nextCoordinate = nextCoordinate.join("");
      return nextCoordinate;
    } else {
      // Get current row as string
      const currentCellRow = currentCell.split("").length === 2 ? currentCell.split("")[1] : `${currentCell.split("")[1]}${currentCell.split("")[2]}`;
      // Get index of gameboardRows item that matches currentCellRow
      const numberIndex = gameboardRows.indexOf(currentCellRow);
      // Return a string (joined array) that its former array consisted of the same column and incremented row
      let nextCoordinate = [currentCell.split("")[0], gameboardRows[numberIndex + 1]];
      nextCoordinate = nextCoordinate.join("");
      return nextCoordinate;
    }
  }
}

export function isPlacementValid(shipName, shipPlacementCell, shipOrientation, playerGameboard) {
  const shipLengths = { aircraftCarrier: 5, battleship: 4, cruiser: 3, submarine: 3, destroyer: 2 };
  if (!isShipPlacedOnGameboard(shipName, shipPlacementCell, shipOrientation)) {
    return "ship extends off of gameboard";
  } else if (isShipPlacedOverlapping(shipLengths[shipName], shipPlacementCell, shipOrientation, playerGameboard)) {
    return "ship overlaps previously placed ship";
  } else {
    return "valid";
  }
}

// Reset player gameboard, generate new placeShip parameter values and update playerGameboard UI
export function randomlyPlacePlayerShips(playerPlacingShipsGameboard) {
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

  activeGame.playerPlacingShips.playerGameboard.resetGameboard();
  // Loop until there are no ships to place
  while (playerPlacingShipsGameboard.unplacedShips.size) {
    generateRandomShipPlacement();
    playerPlacingShipsGameboard.placeShip(randomShipName, randomCellCoordinate, randomShipOrientation);
  }
  renderPlaceShipGameboardCells(activeGame.playerPlacingShips.playerGameboard);
}

// placeShip(shipName, shipPlacementCell, shipOrientation)
