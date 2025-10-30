function startGame() {
  const startGameWrapper = document.querySelector("#start-game-wrapper");
  const selectGameModeWrapper = document.querySelector("#select-mode-wrapper");
  const enterPlayerNamesWrapper = document.querySelector("#enter-player-names-wrapper");

  document.addEventListener("click", (event) => {
    // Start game button click  hides start game screen and displays select game mode screen
    if (event.target.id === "startGame") {
      // Hide start game screen
      startGameWrapper.classList.add("fadeOut");
      addFadeAnimationDelay(() => (startGameWrapper.style.display = "none"));
      // Show select game mode screen
      selectGameModeWrapper.classList.add("fadeIn");
      selectGameModeWrapper.classList.add("active-screen");
      // remove fadeIn/off-screen-start-position class from selectGameModeWrapper (sekect game mode screen)
      addFadeAnimationDelay(() => {
        selectGameModeWrapper.classList.remove("fadeIn");
        selectGameModeWrapper.classList.remove("off-screen-start-position");
      });
    }

    // Start game button click displays select game mode screen
    if (event.target.id === "player-vs-player") {
      selectGameModeWrapper.classList.add("fadeOut");
      addFadeAnimationDelay(() => (selectGameModeWrapper.style.display = "none"));

      enterPlayerNamesWrapper.classList.add("fadeIn");
      enterPlayerNamesWrapper.classList.add("active-screen");
      //addFadeAnimationDelay(() => (startGameWrapper.style.display = "none"));
      //playerVsPlayerBtn.classList.add("fadeIn");
    }
  });

  function addFadeAnimationDelay(callback) {
    setTimeout(callback, 1000);
  }
}

export default startGame;
