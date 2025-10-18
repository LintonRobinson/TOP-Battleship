class Player {
  constructor(playerType) {
    this.playerType = playerType === "human" ? "human" : "computer";
  }
}

export default Player;
