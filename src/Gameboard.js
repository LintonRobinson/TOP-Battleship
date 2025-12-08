import Ship from "./Ship.js";
import { game } from "./game.js";
import { isPlacementValid } from "./helpers.js";
import { removeShipElementFromPlaceShipsWrapper } from "./ui.js";

class Gameboard {
  constructor() {
    this.unplacedShips = new Set(["aircraftCarrier", "battleship", "cruiser", "submarine", "destroyer"]);
    this.placedShips = new Set();
    this.activeShipCells = new Map();
    this.hitShipCells = new Set();
    this.missedCells = new Set();
  }

  resetGameboard() {
    this.unplacedShips = new Set(["aircraftCarrier", "battleship", "cruiser", "submarine", "destroyer"]);
    this.placedShips = new Set();
    this.activeShipCells = new Map();
    this.hitShipCells = new Set();
    this.missedCells = new Set();
  }
  placeShip(shipName, shipPlacementCell, shipOrientation) {
    const shipshipLengths = { aircraftCarrier: 5, battleship: 4, cruiser: 3, submarine: 3, destroyer: 2 };
    const shipLength = shipshipLengths[shipName];
    let currentCell = shipPlacementCell;

    if (
      !this.unplacedShips.has(shipName) ||
      isPlacementValid(shipName, shipPlacementCell, shipOrientation, game.getPlayerGameboard(game.getPlayerPlacingShips())) != "valid"
    ) {
      return false;
    } else {
      this.unplacedShips.delete(shipName);
    }

    const shipToPlace = new Ship(shipName, shipPlacementCell, shipOrientation);
    for (let i = 0; i < shipLength; i++) {
      this.activeShipCells.set(currentCell, shipToPlace);
      this.placedShips.add(shipToPlace);
      shipToPlace.addToActiveShipCoordinates(currentCell);
      currentCell = getNextCell(currentCell, shipOrientation);
    }
    if (document.querySelector("#place-ships").contains(document.querySelector(`#${shipName}`))) {
      removeShipElementFromPlaceShipsWrapper(shipName);
    }

    return true;

    function getNextCell(currentCell, shipOrientation) {
      const gameboardColumns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
      const gameboardRows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
      if (shipOrientation === "horizontal") {
        // Get current column as string and make uppercase
        const currentCellColumn = currentCell.split("")[0].toUpperCase();
        // Get index of gameboardColumns item that matches currentCellColumn
        const letterIndex = gameboardColumns.indexOf(currentCellColumn);
        // Return a string (joined array) that its former array consisted of the incremented column, and same row
        let nextCoordinate = [
          gameboardColumns[letterIndex + 1],
          currentCell.split("").length === 2 ? currentCell.split("")[1] : `${currentCell.split("")[1]}${currentCell.split("")[2]}`,
        ];
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

  receiveAttack(cellToAttack) {
    if (this.activeShipCells.has(cellToAttack)) {
      this.activeShipCells.get(cellToAttack).hitShip();
      this.activeShipCells.delete(cellToAttack);
      this.hitShipCells.add(cellToAttack);
      return true;
    } else {
      this.missedCells.add(cellToAttack);
      return false;
    }
  }

  areAllShipsSunk() {
    const placedShips = [...this.placedShips];
    return placedShips.every((ship) => ship.isSunk());
  }
}

//const testGameboard = new Gameboard();

//testGameboard.placeShip("aircraftCarrier", "F1", "horizontal");

//console.log("Placing ship", testGameboard.placeShip("aircraftCarrier", "F10", "horizontal"));
//console.log("This is the activeShipCells", testGameboard.activeShipCells);

export default Gameboard;
//git add Gameboard.js
