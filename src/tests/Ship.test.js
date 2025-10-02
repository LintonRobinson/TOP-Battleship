import Ship from "../Ship.js";

describe("Ship", () => {
  describe("shipName property", () => {
    it.each([
      ["aircraftCarrier"],
      ["battleship"],
      ["cruiser"],
      ["submarine"],
      ["destroyer"],
    ])("initializes with shipName set to passed ship name", (testShip) => {
      let ship = new Ship(testShip);
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
        let ship = new Ship(testShip);
        expect(ship.shipLength).toBe(expectation);
      },
    );
  });

  it("Ship should initialize with the correct length based on shipType property", () => {
    expect(testShip.length).toBe(5);
  });

  /*
  it("", () => {
    expect(testShip).toBe();
  })

  */
});

//npm test Ship.test.js

// // git add Ship.test.js

//test(Ship.test): add failing spec for battleship returning correct length
