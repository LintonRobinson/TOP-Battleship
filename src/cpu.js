import { game } from "./game.js";

export class Cpu {
  constructor(computerMode) {
    this.computerMode = computerMode;
    this.missedCells = new Set();
    this.hitCells = new Set();
    this.cellsToExploreFromHitShip = [];
    this.currentHitShipOriginCoordinate = null;
    this.opponentSunkShips = new Set();
    this.cellsToExploreFromHitShipQueueIndexPosition = 0;
    this.sunkShips = new Set();
    this.discoveredHitCells = [];
    this.isolatedHitCellsFromSunkShip = [];
  }

  resetToDefaultsAfterSunkShip() {
    this.cellsToExploreFromHitShip = [];
    this.currentHitShipOriginCoordinate = null;
    this.discoveredHitCells = [];
  }

  wasNewShipSunk(ship) {
    if (this.opponentSunkShips.has(ship)) {
      return false;
    } else {
      return true;
    }
  }

  addIsolatedHitCellsFromSunkShipHitCells(cell) {
    cell.cellCoordinateOrigin = "cellCoordinateOrigin";
    cell.isCoordinateOriginalSurroundngCell = false;

    this.isolatedHitCellsFromSunkShip.push(cell);
  }

  addCoordinateToDiscoveredHitCells(coordinate) {
    this.discoveredHitCells.push(coordinate);
  }

  getDiscoveredHitCells() {
    return this.discoveredHitCells;
  }

  clearDiscoveredHitCells() {
    this.discoveredHitCells = [];
  }

  removeCoordinateFromdiscoveredHitCells(index) {
    this.discoveredHitCells.splice(index, 1);
  }

  addShipToOpponentSunkShips(sunkShip) {
    this.opponentSunkShips.add(sunkShip);
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

  addCellToCellsToExploreFromHitShip(cell) {
    this.cellsToExploreFromHitShip.push(cell);
  }

  addCellToFrontOfCellsToExploreFromHitShip(cell) {
    this.cellsToExploreFromHitShip.unshift(cell);
  }

  setCurrentHitShipOriginCoordinate(coordinate) {
    this.currentHitShipOriginCoordinate = coordinate;
  }

  getCurrentHitShipOriginCoordinate() {
    return this.currentHitShipOriginCoordinate;
  }

  removeCurrentHitShipOriginCoordinate() {
    this.currentHitShipOriginCoordinate = null;
  }

  removeCellFromCellsToExploreFromHitShip(cellCoordinate) {
    const cellIndex = this.cellsToExploreFromHitShip.findIndex((cell) => cell.cellCoordinate === cellCoordinate);
    this.cellsToExploreFromHitShip.splice(cellIndex);
  }

  generateFutureShot(originCellCoordinate, cellRelativeOrientation, isCoordinateOriginalSurroundngCell) {
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
          isCoordinateOriginalSurroundngCell: isCoordinateOriginalSurroundngCell,
        };
        break;
      case "bottom":
        if (originCellRow === "10") return;
        return {
          cellCoordinate: `${originCellColumn}${Number(originCellRow) + 1}`,
          relativeCellOrientationOrigin: "bottom",
          isCoordinateOriginalSurroundngCell: isCoordinateOriginalSurroundngCell,
        };

        break;
      case "left":
        if (originCellColumn === "A") return;
        return {
          cellCoordinate: `${gameboardColumns[columnletterIndex - 1]}${originCellRow}`,
          relativeCellOrientationOrigin: "left",
          isCoordinateOriginalSurroundngCell: isCoordinateOriginalSurroundngCell,
        };
        break;
      case "right":
        if (originCellColumn === "J") return;
        return {
          cellCoordinate: `${gameboardColumns[columnletterIndex + 1]}${originCellRow}`,
          relativeCellOrientationOrigin: "right",
          isCoordinateOriginalSurroundngCell: isCoordinateOriginalSurroundngCell,
        };
        break;
    }
  }

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

    if (this.cellsToExploreFromHitShip.length > 0) {
      const cellToReturn = {
        cell: this.cellsToExploreFromHitShip[0],
        cellCoordinate: this.cellsToExploreFromHitShip[0].cellCoordinate,
        cellCoordinateOrigin: "cellsToExploreFromHitShip",
        isCoordinateOriginalSurroundngCell: this.cellsToExploreFromHitShip[0].isCoordinateOriginalSurroundngCell,
      };

      this.cellsToExploreFromHitShip.shift();

      return cellToReturn;
    } else if (this.isolatedHitCellsFromSunkShip.length > 0) {
      this.setCurrentHitShipOriginCoordinate(this.isolatedHitCellsFromSunkShip[0].cellCoordinate);
      // Push surrounding cells if they are available
      const topNeighborCell = this.generateFutureShot(this.isolatedHitCellsFromSunkShip[0].cellCoordinate, "top", true);
      const bottomNeighborCell = this.generateFutureShot(this.isolatedHitCellsFromSunkShip[0].cellCoordinate, "bottom", true);
      const leftNeighborCell = this.generateFutureShot(this.isolatedHitCellsFromSunkShip[0].cellCoordinate, "left", true);
      const rightNeighborCell = this.generateFutureShot(this.isolatedHitCellsFromSunkShip[0].cellCoordinate, "right", true);

      if (topNeighborCell && !this.hasCellBeenAttacked(topNeighborCell.cellCoordinate)) this.addCellToCellsToExploreFromHitShip(topNeighborCell);

      if (rightNeighborCell && !this.hasCellBeenAttacked(rightNeighborCell.cellCoordinate)) this.addCellToCellsToExploreFromHitShip(rightNeighborCell);

      if (bottomNeighborCell && !this.hasCellBeenAttacked(bottomNeighborCell.cellCoordinate)) this.addCellToCellsToExploreFromHitShip(bottomNeighborCell);

      if (leftNeighborCell && !this.hasCellBeenAttacked(leftNeighborCell.cellCoordinate)) this.addCellToCellsToExploreFromHitShip(leftNeighborCell);

      const cellToReturn = {
        cell: this.cellsToExploreFromHitShip[0],
        cellCoordinate: this.cellsToExploreFromHitShip[0].cellCoordinate,
        cellCoordinateOrigin: "cellsToExploreFromHitShip",
        isCoordinateOriginalSurroundngCell: this.cellsToExploreFromHitShip[0].isCoordinateOriginalSurroundngCell,
      };

      this.isolatedHitCellsFromSunkShip.shift();
      return cellToReturn;
    } else {
      return { cellCoordinate: this.getRandomAvailableCoordinate(), cellCoordinateOrigin: "random" };
    }
  }
}
