import Ship from "./Ship.js";

class Gameboard {
  constructor() {
    this.unplacedShips = new Set(["aircraftCarrier", "battleship", "cruiser", "submarine", "destroyer"]);
    this.activeShipCells = new Map();
  }
  placeShip(shipName, shipPlacementCell, shipOrientation) {
    const shipshipLengths = { aircraftCarrier: 5, battleship: 4, cruiser: 3, submarine: 3, destroyer: 1 };
    const shipLength = shipshipLengths[shipName];
    let currentCell = shipPlacementCell;

    //
    const isShipPlacedOverlapping = (shipLength, shipPlacementCell, shipOrientation) => {
      const shipCells = [];
      let currentCell = shipPlacementCell;
      for (let i = 0; i < shipLength; i++) {
        shipCells.push(currentCell);
        currentCell = getNextCell(currentCell, shipOrientation);
      }

      for (const shipCell of shipCells) {
        if (this.activeShipCells.has(shipCell)) {
          return true;
        }
      }
    };

    if (
      !this.unplacedShips.has(shipName) ||
      !isShipPlacedOnGameboard(shipName, shipPlacementCell, shipOrientation) ||
      isShipPlacedOverlapping(shipLength, shipPlacementCell, shipOrientation)
    ) {
      return false;
    }

    const shipToPlace = new Ship(shipName);
    for (let i = 0; i < shipLength; i++) {
      this.activeShipCells.set(currentCell, shipToPlace);
      currentCell = getNextCell(currentCell, shipOrientation);
    }

    this.unplacedShips.delete(shipName);

    return true;

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
        if (letterIndex + shipLengths[shipName] < 9) {
          return true;
        } else {
          return false;
        }
      } else {
        // Get index of starting cell
        // Get current row as string
        const cellRow = shipPlacementCell.split("")[1];
        // Get index of gameboardRows item that matches cellRow
        const numberIndex = gameboardRows.indexOf(cellRow);
        if (numberIndex + shipLengths[shipName] < 9) {
          return true;
        } else {
          return false;
        }
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
}

//const testGameboard = new Gameboard();

//testGameboard.placeShip("aircraftCarrier", "H1", "horizontal");
//console.log("This is the activeShipCells", testGameboard.activeShipCells);

export default Gameboard;
//git add Gameboard.js
