import { Cpu } from "../cpu.js";

describe("Cpu", () => {
  const testCpu = new Cpu("hardMode");

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
