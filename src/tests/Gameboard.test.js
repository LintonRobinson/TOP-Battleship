import Gameboard from "../Gameboard.js";

describe("Gameboard Class", () => {
  it.each([
    ["aircraftCarrier"],
    ["battleship"],
    ["cruiser"],
    ["submarine"],
    ["destroyer"],
  ])(
    "activeShipFleet initializes with an array with string values; aircraftCarrier, battleship, cruiser, submarine, destroyer",
    (testShip) => {
      const testGameboard = new Gameboard();
      expect(testGameboard.activeShipFleet).toContain(testShip);
    },
  );
});

//

// Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.

//Game board limits to adding cells to ships 10 by j10

//Gameboard this.ship is new Shop dependency inject

//Game board has array/map or active  cells that show how many cells each ship takes up, and ship instance . Object. Key A1 Object

// git add Gameboard.test.js
