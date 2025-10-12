import Ship from "./Ship.js";

class Gameboard {
  constructor() {
    this.unplacedShips = new Set(["aircraftCarrier", "battleship", "cruiser", "submarine", "destroyer"]);
    this.activeShipCells = new Map();
  }
  placeShip(shipName, shipPlacementCell, orientation) {
    if (!this.unplacedShips.has(shipName)) {
      return;
    }

    const shipToPlace = new Ship(shipName);
    const shipLength = shipToPlace.shipLength;
    let currentCell = shipPlacementCell;

    for (let i = 0; i < shipLength; i++) {
      this.activeShipCells.set(currentCell, shipToPlace);
      currentCell = getNextCell(currentCell, orientation);
    }

    this.unplacedShips.delete(shipName);

    function getNextCell(currentCell, orientation) {
      const gameboardColumns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
      const gameboardRows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
      if (orientation === "horizontal") {
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
        const letterIndex = gameboardRows.indexOf(currentCellRow);
        // Return a string (joined array) that its former array consisted of the same column and incremented row
        let nextCoordinate = [currentCell.split("")[0], gameboardRows[letterIndex + 1]];
        nextCoordinate = nextCoordinate.join("");
        return nextCoordinate;
      }
    }
  }
}

export default Gameboard;
//git add Gameboard.js
