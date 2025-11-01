import Player from "./Player.js";

// Game set up logic
document.addEventListener("submit", (event) => {
  if (event.target.id === "enter-player-names") {
    event.preventDefault();
    const playerOne = new Player("human");
  }
});
