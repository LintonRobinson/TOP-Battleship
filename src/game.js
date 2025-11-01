function startGame() {
  const startGameWrapper = document.querySelector("#start-game-wrapper");
  const selectGameModeWrapper = document.querySelector("#select-mode-wrapper");
  const enterPlayerNamesWrapper = document.querySelector("#enter-player-names-wrapper");
  const enterPlayerNameWrapper = document.querySelector("#enter-player-name-wrapper");
  const selectComputerDifficultyWrapper = document.querySelector("#select-computer-difficulty-wrapper");
  const placePlayerShipsWrapper = document.querySelector("#place-ships-screen-wrapper");

  document.addEventListener("click", (event) => {
    // Start game button click  hides start game screen and displays select game mode screen
    if (event.target.id === "startGame") {
      // Hide start game screen
      startGameWrapper.classList.add("fadeOut");
      addFadeAnimationDelay(() => (startGameWrapper.style.display = "none"));
      // Show select game mode screen
      selectGameModeWrapper.classList.add("fadeIn");
      selectGameModeWrapper.classList.add("active-screen");
      // remove fadeIn/off-screen-start-position class from selectGameModeWrapper (select game mode screen)
      addFadeAnimationDelay(() => {
        selectGameModeWrapper.classList.remove("fadeIn");
        selectGameModeWrapper.classList.remove("off-screen-start-position");
      });
    }

    // Player vs player button click  hides select game mode screen and displays enter player names screen
    if (event.target.id === "player-vs-player") {
      // Hide select game mode screen
      selectGameModeWrapper.classList.add("fadeOut");
      addFadeAnimationDelay(() => (selectGameModeWrapper.style.display = "none"));
      // Show place player ships screen
      enterPlayerNamesWrapper.classList.add("fadeIn");
      enterPlayerNamesWrapper.classList.add("active-screen");
      // remove fadeIn/off-screen-start-position class from enterPlayerNamesWrapper (enter player names screen)
      addFadeAnimationDelay(() => {
        enterPlayerNamesWrapper.classList.remove("fadeIn");
        enterPlayerNamesWrapper.classList.remove("off-screen-start-position");
      });
    }
    // Player vs computer button click hides select game mode screen and displays select computer difficulty screen
    if (event.target.id === "player-vs-computer") {
      // Hide select game mode screen
      selectGameModeWrapper.classList.add("fadeOut");
      addFadeAnimationDelay(() => (selectGameModeWrapper.style.display = "none"));
      // Show place player ships screen
      selectComputerDifficultyWrapper.classList.add("fadeIn");
      selectComputerDifficultyWrapper.classList.add("active-screen");
      // remove fadeIn/off-screen-start-position class from enterPlayerNamesWrapper (enter player names screen)
      addFadeAnimationDelay(() => {
        selectComputerDifficultyWrapper.classList.remove("fadeIn");
        selectComputerDifficultyWrapper.classList.remove("off-screen-start-position");
      });
    }

    // Select computer diffiulty button click hides select select computer difficulty and displays enter player name screen
    if (event.target.classList.contains("select-computer-difficulty-button")) {
      // Hide select game mode screen
      selectComputerDifficultyWrapper.classList.add("fadeOut");
      addFadeAnimationDelay(() => (selectComputerDifficultyWrapper.style.display = "none"));
      // Show place player ships screen
      enterPlayerNameWrapper.classList.add("fadeIn");
      enterPlayerNameWrapper.classList.add("active-screen");
      // remove fadeIn/off-screen-start-position class from enterPlayerNamesWrapper (enter player names screen)
      addFadeAnimationDelay(() => {
        enterPlayerNameWrapper.classList.remove("fadeIn");
        enterPlayerNameWrapper.classList.remove("off-screen-start-position");
      });
    }
  });

  document.addEventListener("submit", (event) => {
    // Place player ships button click hides enter player names screen and displays place player ships screen
    if (event.target.id === "enter-player-names") {
      event.preventDefault();
      // Hide enter player names screen
      enterPlayerNamesWrapper.classList.add("fadeOut");
      addFadeAnimationDelay(() => (enterPlayerNamesWrapper.style.display = "none"));
      // Show enter player names screen
      placePlayerShipsWrapper.classList.add("fadeIn");
      placePlayerShipsWrapper.classList.add("active-screen");
      // remove fadeIn/off-screen-start-position class from enterPlayerNamesWrapper (enter player names screen)
      addFadeAnimationDelay(() => {
        placePlayerShipsWrapper.classList.remove("fadeIn");
        placePlayerShipsWrapper.classList.remove("off-screen-start-position");
      });
    }

    // Place player ships button click hides enter player name screen and displays place player ships screen
    if (event.target.id === "enter-player-name") {
      event.preventDefault();
      // Hide enter player names screen
      enterPlayerNameWrapper.classList.add("fadeOut");
      addFadeAnimationDelay(() => (enterPlayerNameWrapper.style.display = "none"));
      // Show enter player names screen
      placePlayerShipsWrapper.classList.add("fadeIn");
      placePlayerShipsWrapper.classList.add("active-screen");
      // remove fadeIn/off-screen-start-position class from enterPlayerNamesWrapper (enter player names screen)
      addFadeAnimationDelay(() => {
        placePlayerShipsWrapper.classList.remove("fadeIn");
        placePlayerShipsWrapper.classList.remove("off-screen-start-position");
      });
    }
  });

  function addFadeAnimationDelay(callback) {
    setTimeout(callback, 1000);
  }
}

export default startGame;
