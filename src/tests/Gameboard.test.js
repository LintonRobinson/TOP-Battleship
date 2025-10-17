jest.mock("../Ship", () => {
  return jest.fn((shipName) => {
    const shipLengths = { aircraftCarrier: 5, battleship: 4, cruiser: 3, submarine: 3, destroyer: 2 };
    return {
      shipName: shipName,
      shipLength: shipLengths[shipName],
      timesHit: 0,
      hitShip() {
        this.timesHit = this.timesHit + 1;
      },
      isSunk() {
        if (this.shipLength === this.timesHit) {
          return true;
        } else {
          return false;
        }
      },
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

    describe("when placeShip runs with no errors", () => {
      it("returns true", () => {
        expect(testGameboard.placeShip("aircraftCarrier", "A1", "horizontal")).toBe(true);
      });

      it("adds new ship instance to placedShips Set", () => {
        testGameboard.placeShip("aircraftCarrier", "A1", "horizontal");
        const testShip = Ship.mock.results[0].value;
        expect(Ship.mock.instances.length).toBe(1);
        expect(Ship.mock.calls.length).toBe(1);
        expect(testGameboard.placedShips.has(testShip));
      });

      it.each([
        ["aircraftCarrier", "A1", "horizontal"],
        ["submarine", "C2", "vertical"],
      ])(
        "removes shipName %s of placed ship from unplacedShips Set",
        (currentShipName, startingCell, shipOrientation) => {
          expect(testGameboard.unplacedShips.has(currentShipName)).toBe(true);
          testGameboard.placeShip(currentShipName, startingCell, shipOrientation);
          expect(testGameboard.unplacedShips.has(currentShipName)).toBe(false);
        },
      );

      it.each([
        ["aircraftCarrier", "A1", "horizontal", ["A1", "B1", "C1", "D1", "E1"]],
        ["submarine", "C2", "vertical", ["C2", "C3", "C4"]],
      ])(
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

      it.each([
        ["aircraftCarrier", "A1", "horizontal", "A2"],
        ["submarine", "C2", "vertical", "B2"],
      ])(
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
        ["submarine", "A8", "vertical"],
      ])(
        "prevents placing ship on the board if activeShipCells mapping extends beyond the board grid",
        (currentShipName, startingCell, shipOrientation) => {
          const activeShipCellsSize = testGameboard.activeShipCells.size;
          testGameboard.placeShip(currentShipName, startingCell, shipOrientation);
          expect(testGameboard.activeShipCells.size).toBe(activeShipCellsSize);
          //does not construct instance of second ship when placeShip is called a second time
          expect(Ship.mock.instances.length).toBe(0);
          expect(Ship.mock.calls.length).toBe(0);
          expect(testGameboard.unplacedShips.has(currentShipName)).toBe(true);
        },
      );

      it.each([
        ["aircraftCarrier", "A1", "horizontal", "submarine", "A1", "vertical"],
        ["aircraftCarrier", "C3", "horizontal", "submarine", "C1", "vertical"],
      ])(
        "prevents ship placement if proposed cells overlap existing activeShipCells",
        (
          firstShipName,
          firstStartingCell,
          firstShipOrientation,
          secondShipName,
          secondStartingCell,
          secondShipOrientation,
        ) => {
          // First ship placement attempt
          testGameboard.placeShip(firstShipName, firstStartingCell, firstShipOrientation);
          const activeShipCellsSize = testGameboard.activeShipCells.size;
          testGameboard.placeShip(secondShipName, secondStartingCell, secondShipOrientation);

          // does not increase the size of activeShipCells map
          expect(testGameboard.activeShipCells.size).toBe(activeShipCellsSize);
          // adds no cells from the second (rejected) ship placement to activeShipCells
          testGameboard.activeShipCells.forEach((activeShipCellValue) => {
            expect(activeShipCellValue.shipName).not.toBe(secondShipName);
          });

          //does not construct instance of second ship when placeShip is called a second time
          expect(Ship.mock.instances.length).toBe(1);
          expect(Ship.mock.calls.length).toBe(1);
          expect(Ship.mock.results[0].value.shipName).toBe(firstShipName);
          expect(testGameboard.unplacedShips.has(secondShipName)).toBe(true);
        },
      );

      it.each([
        ["aircraftCarrier", "A1", "horizontal"],
        ["submarine", "C1", "vertical"],
      ])(
        "number of mapped cells equals the ship’s length for both orientations",
        (currentShipName, startingCell, shipOrientation) => {
          testGameboard.placeShip(currentShipName, startingCell, shipOrientation);
          expect(testGameboard.activeShipCells.size).toBe(testGameboard.activeShipCells.get(startingCell).shipLength);
        },
      );
    });

    describe("when placeShip runs into an error", () => {
      describe("when a ship has already been placed", () => {
        it("returns false", () => {
          testGameboard.placeShip("aircraftCarrier", "A1", "horizontal");
          expect(testGameboard.placeShip("aircraftCarrier", "A2", "vertical")).toBe(false);
        });
      });

      describe("when a ship would extend off the board", () => {
        it("returns false", () => {
          expect(testGameboard.placeShip("aircraftCarrier", "I1", "horizontal")).toBe(false);
        });
      });

      describe("when a ship would overlap a previous ship placement", () => {
        it("returns false", () => {
          testGameboard.placeShip("aircraftCarrier", "A2", "horizontal");
          expect(testGameboard.placeShip("submarine", "B1", "vertical")).toBe(false);
        });
      });
    });
  });

  describe("Gameboard.receiveAttack", () => {
    let testGameboard;
    beforeEach(() => {
      testGameboard = new Gameboard();
      jest.clearAllMocks();
    });
    describe("when the passed attack coordinates hits a ship", () => {
      it("increments the hit count on the Ship instance at the matching activeShipCells key", () => {
        testGameboard.placeShip("aircraftCarrier", "A1", "horizontal");
        testGameboard.receiveAttack("A1");
        expect(Ship.mock.results[0].value.timesHit).toBe(1);
      });

      it("removes matching key and value from activeShipCells Map", () => {
        testGameboard.placeShip("aircraftCarrier", "A1", "horizontal");
        testGameboard.receiveAttack("A1");
        expect(testGameboard.activeShipCells.has("A1")).toBe(false);
      });

      it("adds matching key to hitShipCells set", () => {
        testGameboard.placeShip("aircraftCarrier", "A1", "horizontal");
        testGameboard.receiveAttack("A1");
        expect(testGameboard.hitShipCells.has("A1")).toBe(true);
      });

      it("returns true", () => {
        testGameboard.placeShip("aircraftCarrier", "A1", "horizontal");
        expect(testGameboard.receiveAttack("A1")).toBe(true);
      });
    });

    describe("when the passed attack coordinates misses a ship", () => {
      it("adds missed shot coordinate to missedShots Set", () => {
        testGameboard.placeShip("aircraftCarrier", "A1", "horizontal");
        testGameboard.receiveAttack("A5");
        expect(testGameboard.missedShots.has("A5")).toBe(true);
      });

      it("returns false", () => {
        testGameboard.placeShip("aircraftCarrier", "A1", "horizontal");
        expect(testGameboard.receiveAttack("A5")).toBe(false);
      });
    });
  });

  describe("Gameboard.areAllShipsSunk", () => {
    let testGameboard;
    beforeEach(() => {
      testGameboard = new Gameboard();
      jest.clearAllMocks();
    });
    describe("when all placedShips ship instances' isSunk methods return true", () => {
      it("returns true", () => {
        testGameboard.placeShip("aircraftCarrier", "A1", "horizontal");
        testGameboard.receiveAttack("A1");
        testGameboard.receiveAttack("B1");
        testGameboard.receiveAttack("C1");
        testGameboard.receiveAttack("D1");
        testGameboard.receiveAttack("E1");
        testGameboard.placeShip("battleship", "A2", "horizontal");
        testGameboard.receiveAttack("A2");
        testGameboard.receiveAttack("B2");
        testGameboard.receiveAttack("C2");
        testGameboard.receiveAttack("D2");
        testGameboard.placeShip("cruiser", "A3", "horizontal");
        testGameboard.receiveAttack("A3");
        testGameboard.receiveAttack("B3");
        testGameboard.receiveAttack("C3");
        testGameboard.placeShip("submarine", "A4", "horizontal");
        testGameboard.receiveAttack("A4");
        testGameboard.receiveAttack("B4");
        testGameboard.receiveAttack("C4");
        testGameboard.placeShip("destroyer", "A5", "horizontal");
        testGameboard.receiveAttack("A5");
        testGameboard.receiveAttack("B5");
        expect(testGameboard.areAllShipsSunk()).toBe(true);
      });
    });

    describe("when all ships have not been sunk", () => {
      it("returns false", () => {
        testGameboard.placeShip("aircraftCarrier", "A1", "horizontal");
        testGameboard.receiveAttack("A1");
        testGameboard.placeShip("battleship", "A2", "horizontal");
        expect(testGameboard.areAllShipsSunk()).toBe(false);
      });
    });
  });
});

// git add Gameboard.test.js

/*
  
it("", () => {
        
})
  */
