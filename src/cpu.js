export class Cpu {
  constructor(computerMode) {
    this.computerMode = computerMode;
    this.attackQueue = [];
    this.priorityAttackQueue = [];
    this.currentHitShipOrgin;
    this.missedCells = new Set();
    this.hitCells = new Set();
    this.sunkShips = new Set();
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
    if (this.newCoordinatesToExplore.length > 0) {
    }
  }
}

function getNextCell(currentCell, shipOrientation) {
  const gameboardColumns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const gameboardRows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  if (shipOrientation === "horizontal") {
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
