import Gameboard from "./Gameboard.js";
class Player {
  constructor(playerType, playerName, playerId) {
    this.playerType = playerType === "human" ? "human" : "computer";
    this.playerName = playerType === "human" ? playerName : "AI Opponent";
    this.playerGameboard = new Gameboard();
    this.playerId = playerId;
  }

  createNewGameboard() {
    this.playerGameboard = new Gameboard();
  }
}

export default Player;
