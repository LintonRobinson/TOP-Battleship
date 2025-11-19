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
      console.log("Right here just", letterIndex + shipLengths[shipName]);
      return false;
    }
  } else {
    // Get index of starting cell
    // Get current row as string
    const cellRow = shipPlacementCell.split("")[1];
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
      // Return a string (joined array) that its former array consisted of the incremented column, and same row
      let nextCoordinate = [gameboardColumns[letterIndex + 1], currentCell.split("")[1]];
      nextCoordinate = nextCoordinate.join("");
      return nextCoordinate;
    } else {
      // Get current row as string
      const currentCellRow = currentCell.split("")[1];
      // Get index of gameboardRows item that matches currentCellRow
      const numberIndex = gameboardRows.indexOf(currentCellRow);
      // Return a string (joined array) that its former array consisted of the same column and incremented row
      let nextCoordinate = [currentCell.split("")[0], gameboardRows[numberIndex + 1]];
      nextCoordinate = nextCoordinate.join("");
      return nextCoordinate;
    }
  }
}

export function isMoveValid(shipName, shipPlacementCell, shipOrientation, playerGameboard) {
  const shipLengths = { aircraftCarrier: 5, battleship: 4, cruiser: 3, submarine: 3, destroyer: 2 };
  if (!isShipPlacedOnGameboard(shipName, shipPlacementCell, shipOrientation)) {
    return "ship extends off of gameboard";
  } else if (isShipPlacedOverlapping(shipLengths[shipName], shipPlacementCell, shipOrientation, playerGameboard)) {
    return "ship overlaps previously placed ship";
  } else {
    return "valid";
  }
}
