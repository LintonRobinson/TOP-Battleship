import Gameboard from "../Gameboard.js";
import Ship from "../Ship.js";

describe("Gameboard Class", () => {
  it.each([["aircraftCarrier"], ["battleship"], ["cruiser"], ["submarine"], ["destroyer"]])(
    "activeShipFleet initializes with an array with string values; aircraftCarrier, battleship, cruiser, submarine, destroyer",
    (testShip) => {
      const testGameboard = new Gameboard();
      expect(testGameboard.activeShipFleet).toContain(testShip);
    },
  );
});

describe("placeShip method", () => {
  jest.mock("../Ship", () => {
    return jest.fn(() => {
      return {
        shipName: "aircraftCarrier",
        shipLength: 5,
      };
    });
  });

  describe("placeShip horizontal", () => {
    const testGameboard = new Gameboard();
    const testShip = new Ship("aircraftCarrier");

    testGameboard.placeShip("aircraftCarrier", "A1", "horizontal");
    it.each([["A1"], ["B1"], ["C1"], ["D1"], ["E1"]])(
      "adds shipLength number of entries to activeShipCells Map with cells as keys and the ship instance as values, starting from the passed coordinate and extending based on horizontal orientation",
      (expectationCell) => {
        expect(testGameboard.activeShipCells.has(expectationCell)).toBe(true);
        expect(testGameboard.activeShipCells.get(expectationCell)).toEqual(testShip);
      },
    );
  });

  describe("placeShip vertical", () => {
    const testGameboard = new Gameboard();
    const testShip = new Ship("submarine");

    testGameboard.placeShip("submarine", "C2", "vertical");
    it.each([["C2"], ["C3"], ["C4"]])(
      "adds shipLength number of entries to activeShipCells Map with cells as keys and the ship instance as values, starting from the passed coordinate and extending based on vertical orientation",
      (expectationCell) => {
        expect(testGameboard.activeShipCells.has(expectationCell)).toBe(true);
        expect(testGameboard.activeShipCells.get(expectationCell)).toEqual(testShip);
      },
    );
  });

  // Arguments: shipName, shipPlacementCell, orientation
  // Create new variable ship for new instance of Ship's (new Ship(shipName)), and variable shipLength for ship length (ship.length)
  // Dependent on shipLength, passed shipPlacementCell, orientation the following actions iterate the same amount of times as shipLength: iteravley increments cell entries either "column letter" or "row number" based on orientation, and entry to activeCells with cell entry being key and ship being value
});
//

// Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.

//Game board limits to adding cells to ships 10 by j10

//Gameboard this.ship is new Shop dependency inject

//Game board has array/map or active  cells that show how many cells each ship takes up, and ship instance . Object. Key A1 Object

// git add Gameboard.test.js

/*
  
re amend commit
  */
