class Player {
  constructor(playerType, playerName) {
    this.playerType = playerType === "human" ? "human" : "computer";
    this.playerName = playerType === "human" ? playerName : "AI Opponent";
  }
}

export default Player;
