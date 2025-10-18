jest.mock("../Gameboard.js", () => {
  jest.fn(() => {
    return {};
  });
});

import Player from "../Player.js";
import Gameboard from "../Gameboard.js";

describe("Player.js", () => {
  describe("when 'human' is the first argument passed to its constructor", () => {
    it("initializes with playerType being 'human'", () => {
      const testPlayer = new Player("human");
      expect(testPlayer.playerType).toBe("human");
    });
  });

  describe("when 'computer' is the first argument passed to its constructor", () => {
    it("initializes with playerType being 'computer'", () => {
      const testPlayer = new Player("computer");
      expect(testPlayer.playerType).toBe("computer");
    });
  });
});
