function startGame() {
  const startGameWrapper = document.querySelector("#start-game-wrapper");
  const selectGameModeWrapper = document.querySelector("#select-mode-wrapper");
  const playerVsPlayerBtn = document.querySelector("#player-vs-player");

  document.addEventListener("click", (event) => {
    // Start game button click displays select game mode screen
    if (event.target.id === "startGame") {
      startGameWrapper.classList.add("fadeOut");
      addFadeAnimationDelay(() => (startGameWrapper.style.display = "none"));
      selectGameModeWrapper.classList.add("fadeIn");

      selectGameModeWrapper.classList.add("active-screen");
      addFadeAnimationDelay(() => {
        selectGameModeWrapper.classList.remove("fadeIn");
        selectGameModeWrapper.classList.remove("off-screen-start-position");
      });
    }

    // Start game button click displays select game mode screen
    if (event.target.id === "player-vs-player") {
      selectGameModeWrapper.classList.remove("fadeIn");
      selectGameModeWrapper.classList.add("fadeOut");
      //addFadeAnimationDelay(() => (startGameWrapper.style.display = "none"));
      //playerVsPlayerBtn.classList.add("fadeIn");
    }
  });

  function addFadeAnimationDelay(callback) {
    setTimeout(callback, 1000);
  }
}

export default startGame;
