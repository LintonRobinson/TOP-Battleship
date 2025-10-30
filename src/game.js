function startGame() {
  document.addEventListener("click", (event) => {
    if (event.target.id === "startGame") {
      document.querySelector("#start-game-wrapper").classList.add("fadeOut");
      document.querySelector("#select-mode-wrapper").classList.add("fadeIn");
    }
  });

  function addFadeAnimationDelay(callback) {
    setTimeout(callback, 1000);
  }
}

export default startGame;
