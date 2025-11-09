import { addPlaceShipGameboardClickEventListeners, activeGame } from "./game.js";

function startUI() {
  const startGameWrapper = document.querySelector("#start-game-wrapper");
  const selectGameModeWrapper = document.querySelector("#select-mode-wrapper");
  const enterPlayerNamesWrapper = document.querySelector("#enter-player-names-wrapper");
  const enterPlayerNameWrapper = document.querySelector("#enter-player-name-wrapper");
  const selectComputerDifficultyWrapper = document.querySelector("#select-computer-difficulty-wrapper");
  const placePlayerShipsWrapper = document.querySelector("#place-ships-screen-wrapper");
  const placeShipsWrapper = document.querySelector("#place-ships");

  // Screen navigation
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

  // Use submits player names
  document.addEventListener("submit", (event) => {
    const placeYourShipsTitle = document.querySelector("#placeYourShipsTitle");
    let playerOneName;
    let playerTwoName;

    // Place player ships button click hides enter player names screen and displays place player ships screen
    if (event.target.id === "enter-player-names") {
      event.preventDefault();
      playerOneName = document.querySelector("#playerOneName").value;
      placeYourShipsTitle.textContent = `${playerOneName}, Place Your Ships`;
      // Hide enter player names screen
      enterPlayerNamesWrapper.classList.add("fadeOut");
      addFadeAnimationDelay(() => (enterPlayerNamesWrapper.style.display = "none"));

      // Show enter player names screen
      placePlayerShipsWrapper.classList.add("fadeIn");
      placePlayerShipsWrapper.classList.add("active-screen");
      //
      renderGameboardCells();

      // -->
      // remove fadeIn/off-screen-start-position class from enterPlayerNamesWrapper (enter player names screen)
      addFadeAnimationDelay(() => {
        placePlayerShipsWrapper.classList.remove("fadeIn");
        placePlayerShipsWrapper.classList.remove("off-screen-start-position");
      });
    }

    // Place player ships button click hides enter player name screen and displays place player ships screen
    if (event.target.id === "enter-player-name") {
      event.preventDefault();
      // Hide enter player name screen
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

  addPlaceShipsWrapperEventListeners();

  // If the cell to add is in the hash map at the end off looping, remove that many cells and add ship to span grid
}

function renderGameboardCells(playerGameboard) {
  const gameboard = document.querySelector(".gameboard");
  // Clear gameboard cells

  if (playerGameboard) {
    const gameboardCells = gameboard.querySelectorAll("*");

    gameboardCells.forEach((gameboardCell) => {
      gameboard.removeChild(gameboardCell);
    });
  }

  const gameboardColumns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  for (let i = 1; i < 11; i++) {
    for (let j = 0; j < 10; j++) {
      const gameboardCell = document.createElement("div");
      gameboardCell.classList.add("gameboard-cell");
      gameboardCell.dataset.cellId = `${gameboardColumns[j]}${i}`;
      gameboard.appendChild(gameboardCell);
    }
  }

  if (playerGameboard) {
    const placedShips = playerGameboard.placedShips;
    placedShips.forEach((ship) => {
      const initialShipPlacementCellColumn = ship.initialShipPlacementCell.split("")[0];
      const initialShipPlacementCellRow =
        ship.initialShipPlacementCell.split("").length < 3
          ? ship.initialShipPlacementCell.split("")[1]
          : ship.initialShipPlacementCell.split("")[1] + ship.initialShipPlacementCell.split("")[2];

      const shipGridColumnStartIndex = gameboardColumns.findIndex((column) => column === initialShipPlacementCellColumn) + 1;

      const shipGridRowStart = initialShipPlacementCellRow;

      // Remove ship.shipLength cells from gameboard
      const gameboardCells = gameboard.querySelectorAll(".gameboard-cell");
      gameboardCells.forEach((gameboardCell) => {
        if (playerGameboard.activeShipCells.has(gameboardCell.dataset.cellId)) gameboardCell.remove();
      });

      const placedShipElement = document.createElement("div");
      placedShipElement.classList.add("placement-ship");
      placedShipElement.classList.add(`${ship.shipOrientation}-ship`);
      placedShipElement.classList.add(ship.shipName);
      // Remove
      for (let i = 0; i < ship.shipLength; i++) {
        const shipCell = document.createElement("div");
        shipCell.classList.add("ship-cell");
        placedShipElement.appendChild(shipCell);
      }

      // Grid placement
      if ((ship.shipOrientation = "horizontal")) {
        placedShipElement.style.gridColumnStart = `${shipGridColumnStartIndex}`;
        placedShipElement.style.gridColumnEnd = `${shipGridColumnStartIndex + ship.shipLength}`;
        placedShipElement.style.gridRowStart = `${shipGridRowStart}`;
        placedShipElement.style.gridRowEnd = `${Number(shipGridRowStart) + 1}`;
      } else {
      }
      gameboard.appendChild(placedShipElement);
    });
  }

  addPlaceShipGameboardClickEventListeners();
}

function addPlaceShipsWrapperEventListeners() {
  // Add event listener to placeShipsWrapper that sets state of activeGame.shipToPlace to clicked ship child element
  const placeShipsWrapper = document.querySelector("#place-ships");

  placeShipsWrapper.addEventListener("click", (event) => {
    const placingShipsGameboardWrapper = document.querySelector(".placing-ships-gameboard");
    const clickedShip = event.target;
    if (activeGame.shipToPlace != clickedShip.id && clickedShip.classList.contains("placement-ship")) {
      document.querySelectorAll(".placement-ship").forEach((placementShip) => {
        if (placementShip.id != activeGame.shipToPlace) placementShip.classList.remove("activeShipToPlace");
      });

      activeGame.shipToPlace = event.target.id;
      console.log("Active ship to place is", activeGame.shipToPlace);
      console.log("Event targ,", event.target.id);
      clickedShip.classList.add("activeShipToPlace");
      console.log("Should have added activeShipToPlace to", event.target);
      placingShipsGameboardWrapper.classList.add("placingShips");
    } else {
      activeGame.shipToPlace = null;
      event.target.classList.remove("activeShipToPlace");
      placingShipsGameboardWrapper.classList.remove("placingShips");
    }
  });
}

function removeShipElementFromPlaceShipsWrapper(passedShipToRemove) {
  const shipToRemove = document.querySelector(`#${passedShipToRemove}`);
  shipToRemove.remove();
}

document.addEventListener("DOMContentLoaded", startUI);

export { startUI, renderGameboardCells, removeShipElementFromPlaceShipsWrapper };

// MAKE SHIP ORIENTATION PROP ON SHIP, AND SHIP INSTANCES MAP ON GAMEBOARD CLASS

// Changes: shipOrientation
