export class Cpu {
  constructor(computerMode) {
    this.computerMode = computerMode;
    this.attackQueue = [];
    this.priorityAttackQueue = [];
    this.currentHitShipOrgin;
    this.missedCells = new Set();
    this.hitCells = new Set();
    this.coordinatesToExploreFromHitShip = [];
    this.sunkShips = new Set();
    this.discoveredHitCells = [];
  }

  hasCellBeenAttacked(cellCoordinateToCheck) {
    if (this.hitCells.has(cellCoordinateToCheck) || this.missedCells.has(cellCoordinateToCheck)) {
      return true;
    } else {
      return false;
    }
  }

  addCoordinateToHitCells(coordinateToAdd) {
    this.hitCells.add(coordinateToAdd);
  }

  addCoordinateToMissedCells(coordinateToAdd) {
    this.missedCells.add(coordinateToAdd);
  }

  addCellToCoordinatesToExploreFromHitShip(cell) {
    this.coordinatesToExploreFromHitShip.push(cell);
  }

  generateFutureShot(originCellCoordinate, cellRelativeOrientation) {
    const gameboardColumns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    // Get current column as string and make uppercase
    const originCellColumn = originCellCoordinate.split("")[0].toUpperCase();
    // Get index of gameboardColumns item that matches currentCellColumn
    const columnletterIndex = gameboardColumns.indexOf(originCellColumn);

    const originCellRow =
      originCellCoordinate.split("").length === 2 ? originCellCoordinate.split("")[1] : `${originCellCoordinate.split("")[1]}${originCellCoordinate.split("")[2]}`;

    switch (cellRelativeOrientation) {
      case "top":
        if (originCellRow === "1") return;
        return {
          cellCoordinate: `${originCellColumn}${Number(originCellRow) - 1}`,
          relativeCellOrientationOrigin: "top",
        };
        break;
      case "bottom":
        if (originCellRow === "10") return;
        return {
          cellCoordinate: `${originCellColumn}${Number(originCellRow) + 1}`,
          relativeCellOrientationOrigin: "bottom",
        };

        break;
      case "left":
        if (originCellColumn === "A") return;
        return `${gameboardColumns[columnletterIndex - 1]}${originCellRow}`;
        break;
      case "right":
        if (originCellColumn === "J") return;
        return `${gameboardColumns[columnletterIndex + 1]}${originCellRow}`;
        break;
    }
  }

  findNextShots() {}

  getRandomAvailableCoordinate() {
    const gameboardColumns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const gameboardRows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    // Initializing random variables
    let randomColumn;
    let randomRow;
    let randomCellCoordinate;

    function generateRandomCoordinate() {
      randomColumn = gameboardColumns[Math.floor(Math.random() * 10)];
      randomRow = gameboardRows[Math.floor(Math.random() * 10)];
      randomCellCoordinate = `${randomColumn}${randomRow}`;
    }

    generateRandomCoordinate();

    // Loop until there are no ships to place
    while (this.missedCells.has(randomCellCoordinate) || this.hitCells.has(randomCellCoordinate)) {
      generateRandomCoordinate();
    }
    return randomCellCoordinate;
  }

  getCoordinateToAttackPlayerGameboard() {
    // If a potential hit, randomly select random targeted (existing random cell to sink), or discovered
    if (this.coordinatesToExploreFromHitShip.length > 0) {
    } else if (this.discoveredHitCells.length > 0) {
    } else {
      return { cellCoordinate: this.getRandomAvailableCoordinate(), cellCoordinateOrigin: "random" };
    }
  }
}

// when a random selection is made, thats what to pull from

// vertical, horizontal

// when there is a hit, get the origin of the object cell

// active previous hit array?

// random cell has all surrounding

//targeted hit (more than two cells in a row) takes priority

// If hit turn into sunk ship no suggestions

// If hit cell was consecutive, move opposite orientation cell to priority

// Last shot cell object variable

// Last shot

// potential shot object has property that says if it should be active,

// linked list?
