import Ship from "../Ship.js";

describe("Ship", () => {
  let testShip;
  it("Ship should initialize with the correct shipType property", () => {
    testShip = new Ship("aircraftCarrier");
    expect(testShip.shipType).toBe("aircraftCarrier");
  });

  /*
  it("", () => {
    expect(testShip).toBe();
  })

  */
});
