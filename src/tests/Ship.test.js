import Ship from "../Ship.js";

describe("Ship Clas", () => {
  describe("shipName property", () => {
    it.each([
      ["aircraftCarrier"],
      ["battleship"],
      ["cruiser"],
      ["submarine"],
      ["destroyer"],
    ])("initializes with shipName set to passed ship name", (testShip) => {
      const ship = new Ship(testShip);
      expect(ship.shipName).toBe(testShip);
    });
  });

  describe("shipLength property", () => {
    it.each([
      ["aircraftCarrier", 5],
      ["battleship", 4],
      ["cruiser", 3],
      ["submarine", 3],
      ["destroyer", 2],
    ])(
      "initializes with shipLength based on passed ship name '%s",
      (testShip, expectation) => {
        const ship = new Ship(testShip);
        expect(ship.shipLength).toBe(expectation);
      },
    );
  });

  it("Ship should initialize with the correct length based on shipType property", () => {
    expect(testShip.length).toBe(5);
  });

  describe("hitShip method", () => {
    it("increments timesHit property by one when hitShip() is called ", () => {
      const ship = new Ship();
      ship.hitShip();
      expect(ship.timesHit).toBe(1);
    });

    it("increments timesHit property by two when hitShip() is called twice ", () => {
      const ship = new Ship();
      ship.hitShip();
      ship.hitShip();
      expect(ship.timesHit).toBe(2);
    });
  });

  describe("isSunk method", () => {
    it.each([
      ["aircraftCarrier", 5],
      ["battleship", 4],
      ["cruiser", 3],
      ["submarine", 3],
      ["destroyer", 2],
    ])(
      "return true or false dependent on if timesHit is equal to %s shipLength",
      (testShip, expectation) => {
        const ship = new Ship(testShip);
        ship.timesHit = expectation;
        expect(ship.isSunk()).toBe(true);
      },
    );
  });
});

//npm test Ship.test.js

// // git add Ship.test.js

//test(Ship.test/isSunk): add failing spec for Ship.isSunk returning return true if timesHit is equal to aircraftCarrier shipLength

//test(Ship.test/timesHit): add failing spec for Ship returning correct times hit

//test(Ship.test/timesHit): add failing spec for Ship.hitShip incrementing timesHit property by 1

//test(Ship.test/timesHit): add passing spec for Ship.hitShip confirming two calls to timesHit increments timesHit property by 2

//test(Ship.test/isSunk): add passing spec for Ship.isSunk confirming it return true when timesHit  is equal to aircraftCarrier shipLength
