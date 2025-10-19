import Gameboard from "./Gameboard.js";
class Player {
  constructor(playerType, playerName) {
    this.playerType = playerType === "human" ? "human" : "computer";
    this.playerName = playerType === "human" ? playerName : "AI Opponent";
    this.playerGameboard = new Gameboard();
  }
}

export default Player;
