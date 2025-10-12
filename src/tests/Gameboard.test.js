jest.mock("../Ship", () => {
  return jest.fn((shipName) => {
    const shipLengths = { aircraftCarrier: 5, submarine: 3 };
    return {
      shipName: "aircraftCarrier",
      shipLength: shipLengths[shipName],
    };
  });
});

import Gameboard from "../Gameboard.js";
import Ship from "../Ship.js";

describe("Gameboard Class", () => {
  describe("Gameboard.unplacedShips", () => {
    it("initializes with array unplacedShips with string values; aircraftCarrier, battleship, cruiser, submarine, destroyer", () => {
      const testGameboard = new Gameboard();
      const unplacedShips = ["aircraftCarrier", "battleship", "cruiser", "submarine", "destroyer"];
      unplacedShips.forEach((unplacedShip) => {
        expect(testGameboard.unplacedShips).toContain(unplacedShip);
      });
    });
  });

  describe("Gameboard.placeShip ", () => {
    let testGameboard;
    beforeEach(() => {
      testGameboard = new Gameboard();
      jest.clearAllMocks();
    });

    const orientationLengthTestCases = [
      ["aircraftCarrier", "A1", "horizontal", ["A1", "B1", "C1", "D1", "E1"]],
      ["submarine", "C2", "vertical", ["C2", "C3", "C4"]],
    ];

    it.each(orientationLengthTestCases)(
      "maps shipLength cells to the same ship instance (cells as keys, ship instance as value) starting at %s %s %s",
      (currentShipName, startingCell, shipOrientation, expectationCells) => {
        testGameboard.placeShip(currentShipName, startingCell, shipOrientation);
        // test ship should be instance of ship
        const testShip = Ship.mock.results[0].value;
        expectationCells.forEach((expectationCell) => {
          expect(testGameboard.activeShipCells.has(expectationCell)).toBe(true);
          expect(testGameboard.activeShipCells.get(expectationCell)).toEqual(testShip);
        });
        expect(testGameboard.activeShipCells.size).toEqual(testShip.shipLength);
      },
    );

    const removeShipNameTestCases = [
      ["aircraftCarrier", "A1", "horizontal"],
      ["submarine", "C2", "vertical"],
    ];

    it.each(removeShipNameTestCases)(
      "removes shipName %s of placed ship from unplacedShips Set",
      (currentShipName, startingCell, shipOrientation) => {
        expect(testGameboard.unplacedShips.has(currentShipName)).toBe(true);
        testGameboard.placeShip(currentShipName, startingCell, shipOrientation);
        expect(testGameboard.unplacedShips.has(currentShipName)).toBe(false);
      },
    );

    const preventExecutionTestCases = [
      ["aircraftCarrier", "A1", "horizontal", "A2"],
      ["submarine", "C2", "vertical", "B2"],
    ];

    it.each(preventExecutionTestCases)(
      "prevents the continuation of this function if shipName %s is not in unplacedShips Set and already been placed",
      (currentShipName, firstStartingCell, shipOrientation, secondStartingCell) => {
        testGameboard.placeShip(currentShipName, firstStartingCell, shipOrientation);
        const activeShipCellsSize = testGameboard.activeShipCells.size;
        testGameboard.placeShip(currentShipName, secondStartingCell, shipOrientation);
        expect(testGameboard.activeShipCells.size).toBe(activeShipCellsSize);
      },
    );

    it.each([
      ["aircraftCarrier", "I1", "horizontal"],
      ["battleship", "A8", "vertical"],
    ])(
      "prevents placing ship on the board if activeShipCells mapping extends beyond the board grid",
      (currentShipName, firstStartingCell, shipOrientation) => {
        const activeShipCellsSize = testGameboard.activeShipCells.size;
        testGameboard.placeShip(currentShipName, firstStartingCell, shipOrientation);
        expect(testGameboard.activeShipCells.size).toBe(activeShipCellsSize);
      },
    );

    // One more test that will not fontinue if ship is not in unplaced ships
  });
});

// Stay on board edge case

// Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.

//Game board limits to adding cells to ships 10 by j10

//Gameboard this.ship is new Shop dependency inject

//Game board has array/map or active  cells that show how many cells each ship takes up, and ship instance . Object. Key A1 Object

// git add Gameboard.test.js

/*
  
re amend commit
  */
