import { addPlaceShipGameboardClickEventListeners, activeGame, togglePlaceShipOrientation } from "./game.js";

function startGameSetupUI() {
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
  addPlaceShipGameboarDragEventListeners();

  // If the cell to add is in the hash map at the end off looping, remove that many cells and add ship to span grid
}

function renderGameboardCells(playerGameboard) {
  const gameboard = document.querySelector(".gameboard");
  // Clear gameboard cells

  if (document.querySelector(".placingShips") && document.querySelector(".gameboard-cell")) {
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
      if (document.querySelector(".gameboard-cell")) {
        const gameboardCells = gameboard.querySelectorAll(".gameboard-cell");
        gameboardCells.forEach((gameboardCell) => {
          if (playerGameboard.activeShipCells.has(gameboardCell.dataset.cellId)) gameboardCell.remove();
        });
      }

      const placedShipElement = document.createElement("div");
      placedShipElement.classList.add("placement-ship");
      placedShipElement.classList.add(`${ship.shipOrientation}-eplacement-ship`);
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
    console.log("This is the event target parent", event.target.parentElement);
    const placingShipsGameboardWrapper = document.querySelector(".placing-ships-gameboard");
    const clickedShip = event.target;

    if (activeGame.shipToPlace != event.target.id && event.target.classList.contains("placement-ship")) {
      document.querySelectorAll(".placement-ship").forEach((placementShip) => {
        if (placementShip.id != activeGame.shipToPlace) placementShip.classList.remove("activeShipToPlace");
      });

      activeGame.shipToPlace = event.target.id;
      clickedShip.classList.add("activeShipToPlace");
      placingShipsGameboardWrapper.classList.add("placingShips");
    } else if (event.target.classList.contains("placement-ship")) {
      activeGame.shipToPlace = null;
      event.target.classList.remove("activeShipToPlace");
      placingShipsGameboardWrapper.classList.remove("placingShips");
    }

    // Place ships rotation button
    if (event.target.id === "toggleShipOrientation" && event.target.parentElement.id === "ship-placement-btns") {
      const placementShips = document.querySelectorAll(".placement-ship");

      placementShips.forEach((placementShip) => {
        if (activeGame.placementOrientation === "horizontal") {
          placementShip.classList.remove("horizontal-placement-ship");
          placementShip.classList.add("vertical-placement-ship");
        } else {
          console.log("Ya Mama Runnin!!");
          placementShip.classList.remove("vertical-placement-ship");
          placementShip.classList.add("horizontal-placement-ship");
        }
      });

      togglePlaceShipOrientation();
    }
  });
}

function addPlaceShipGameboarDragEventListeners() {
  const placementShips = document.querySelectorAll(".placement-ship");
  const gameboard = document.querySelector(".gameboard");

  placementShips.forEach((placementShip) => {
    placementShip.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text", event.target.id);
    });

    placementShip.addEventListener("drop", (event) => {
      // Prevent ship dragging snapback
      event.preventDefault();
    });
  });

  // Prevent ship dragging snapback
  gameboard.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  // WHen the first ship cell child of dragged ship is dragged over a cell, change the background color
}

function addRemoveGameboardCellDragEventListeners(addOrRemoveEventListener) {
  function addGameboardCellDragEventListeners(event) {
    const gameboardCells = document.querySelectorAll(".gameboard-cell");
    gameboardCells.forEach((gameboardCell) => {
      gameboardCell.addEventListener("dragenter", (event) => {
        console.log("entering ya ");
        const draggedShipPosition = document.querySelector(`#${event.dataTransfer.getData("text")}`).getBoundingClientRect();
        const currentCellPosition = document.querySelector(`#${event.target.id}`).getBoundingClientRect();
        if (
          !(
            draggedShipPosition.right < currentCellPosition.left ||
            draggedShipPosition.left > currentCellPosition.right ||
            draggedShipPosition.bottom < currentCellPosition.top ||
            draggedShipPosition.top > currentCellPosition.bottom
          )
        ) {
          gameboardCell.style.backgroundColor = "#82ff6b";
        }
      });
    });
  }

  if (addOrRemoveEventListener === "add") {
  }
}

function removeShipElementFromPlaceShipsWrapper(passedShipToRemove) {
  document.querySelectorAll(".placement-ship").forEach((placementShip) => {
    if (placementShip.id != activeGame.shipToPlace) placementShip.classList.remove("activeShipToPlace");
  });
  const shipToRemove = document.querySelector(`#${passedShipToRemove}`);
  shipToRemove.remove();
}

document.addEventListener("DOMContentLoaded", startGameSetupUI);

export { startGameSetupUI, renderGameboardCells, removeShipElementFromPlaceShipsWrapper };

// MAKE SHIP ORIENTATION PROP ON SHIP, AND SHIP INSTANCES MAP ON GAMEBOARD CLASS

// Changes: shipOrientation
