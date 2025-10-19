import Player from "../Player.js";
import Gameboard from "../Gameboard.js";

describe("Player", () => {
  describe("when 'human' is the first argument passed to its constructor", () => {
    it("initializes with playerType being 'human'", () => {
      const testPlayer = new Player("human");
      expect(testPlayer.playerType).toBe("human");
    });

    it("initializes with playerName being the second argument passed to its constructor", () => {
      const testPlayer = new Player("human", "Linton");
      expect(testPlayer.playerName).toBe("Linton");
    });
  });

  describe("when 'computer' is the first argument passed to its constructor", () => {
    it("initializes with playerType being 'computer'", () => {
      const testPlayer = new Player("computer");
      expect(testPlayer.playerType).toBe("computer");
    });

    it("initializes with playerName being 'AI Opponent'", () => {
      const testPlayer = new Player("computer");
      expect(testPlayer.playerName).toBe("AI Opponent");
    });
  });

  it("initializes with playerGameboard being its own instance of Gameboard", () => {
    const testPlayer = new Player("human", "Linton");
    expect(testPlayer.playerGameboard).toBeInstanceOf(Gameboard);
  });
});
