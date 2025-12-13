import { Cpu } from "../cpu.js";

describe("Cpu", () => {
  const testCpu = new Cpu("hardMode");

  describe("Cpu.getCoordinateToAttackPlayerGameboard()", () => {
    describe("when there are no coordinatesToExploreFromHitShip or discoveredHitCells", () => {
      const gameboardCoordinates = [
        "A1",
        "A2",
        "A3",
        "A4",
        "A5",
        "A6",
        "A7",
        "A8",
        "A9",
        "A10",
        "B1",
        "B2",
        "B3",
        "B4",
        "B5",
        "B6",
        "B7",
        "B8",
        "B9",
        "B10",
        "C1",
        "C2",
        "C3",
        "C4",
        "C5",
        "C6",
        "C7",
        "C8",
        "C9",
        "C10",
        "D1",
        "D2",
        "D3",
        "D4",
        "D5",
        "D6",
        "D7",
        "D8",
        "D9",
        "D10",
        "E1",
        "E2",
        "E3",
        "E4",
        "E5",
        "E6",
        "E7",
        "E8",
        "E9",
        "E10",
        "F1",
        "F2",
        "F3",
        "F4",
        "F5",
        "F6",
        "F7",
        "F8",
        "F9",
        "F10",
        "G1",
        "G2",
        "G3",
        "G4",
        "G5",
        "G6",
        "G7",
        "G8",
        "G9",
        "G10",
        "H1",
        "H2",
        "H3",
        "H4",
        "H5",
        "H6",
        "H7",
        "H8",
        "H9",
        "H10",
        "I1",
        "I2",
        "I3",
        "I4",
        "I5",
        "I6",
        "I7",
        "I8",
        "I9",
        "I10",
        "J1",
        "J2",
        "J3",
        "J4",
        "J5",
        "J6",
        "J7",
        "J8",
        "J9",
        "J10",
      ];
      it("returns an object with a random cellCoordinate and has the property of cellCoordinateOrigin with its value being the 'random", () => {
        const testCoordinate = testCpu.getCoordinateToAttackPlayerGameboard();
        expect(testCoordinate).toHaveProperty("cellCoordinate");
        expect(gameboardCoordinates).toContain(testCoordinate.cellCoordinate);
        expect(testCoordinate).toHaveProperty("cellCoordinateOrigin");
        expect(testCoordinate.cellCoordinateOrigin).toBe("random");
      });
    });
  });

  describe("Cpu.getRandomAvailableCoordinate()", () => {
    it("return a random coordinate that is not in missedCells or hitCells", () => {
      testCpu.hitCells = new Set(["A1", "A2", "A3", "D2", "E2", "F2", "G2"]);
      testCpu.missedCells = new Set(["B1", "E7", "D3", "J1", "B4", "C7", "A"]);

      for (let i = 0; i < 200; i++) {
        expect(testCpu.hitCells.has(testCpu.getRandomAvailableCoordinate())).toBe(false);
        expect(testCpu.missedCells.has(testCpu.getRandomAvailableCoordinate())).toBe(false);
      }
    });
  });

  describe("Cpu.generateFutureShot()", () => {
    it("returns the correct relative cell coordinate", () => {
      expect(testCpu.generateFutureShot("C3", "top")).toHaveProperty("cellCoordinate", "C2");
      expect(testCpu.generateFutureShot("C3", "bottom")).toHaveProperty("cellCoordinate", "C4");
      expect(testCpu.generateFutureShot("C3", "left")).toBe("B3");
      expect(testCpu.generateFutureShot("C3", "right")).toBe("D3");

      expect(testCpu.generateFutureShot("D1", "top")).toBeUndefined();
      expect(testCpu.generateFutureShot("D10", "bottom")).toBeUndefined();
      expect(testCpu.generateFutureShot("A5", "left")).toBeUndefined();
      expect(testCpu.generateFutureShot("J5", "right")).toBeUndefined();
    });
  });
});
