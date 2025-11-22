import { addPlaceShipGameboardClickEventListeners, activeGame, togglePlaceShipOrientation } from "./game.js";
import { isMoveValid, randomlyPlacePlayerShips } from "./helpers.js";

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
  addPlaceShipDragEventListeners();
  //addPlaceShipGameboarDragEventListeners();

  // If the cell to add is in the hash map at the end off looping, remove that many cells and add ship to span grid
}

function renderGameboardCells(playerGameboard) {
  const gameboard = document.querySelector(".gameboard");
  // Clear gameboard cells
  console.log("playerGameboard.activeShipCells.size", playerGameboard);
  const gameboardCells = gameboard.querySelectorAll("*");

  gameboardCells.forEach((gameboardCell) => {
    gameboardCell.remove();
  });

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

      placedShipElement.classList.add(`${ship.shipOrientation}-placement-ship`);
      placedShipElement.classList.add(ship.shipName);
      // Remove
      for (let i = 0; i < ship.shipLength; i++) {
        const shipCell = document.createElement("div");
        shipCell.classList.add("ship-cell");
        placedShipElement.appendChild(shipCell);
      }

      // Grid placement
      if (ship.shipOrientation === "horizontal") {
        placedShipElement.style.gridColumnStart = `${shipGridColumnStartIndex}`;
        placedShipElement.style.gridColumnEnd = `${shipGridColumnStartIndex + ship.shipLength}`;
        placedShipElement.style.gridRowStart = `${shipGridRowStart}`;
        placedShipElement.style.gridRowEnd = `${Number(shipGridRowStart) + 1}`;
      } else {
        placedShipElement.style.gridColumnStart = `${shipGridColumnStartIndex}`;
        placedShipElement.style.gridColumnEnd = `${shipGridColumnStartIndex + 1}`;
        placedShipElement.style.gridRowStart = `${shipGridRowStart}`;
        placedShipElement.style.gridRowEnd = `${Number(shipGridRowStart) + ship.shipLength}`;
      }
      gameboard.appendChild(placedShipElement);
    });
  }

  addGameboardCellDragEventListeners();
  addPlaceShipGameboardClickEventListeners();
}

function addPlaceShipsWrapperEventListeners() {
  // Add event listener to placeShipsWrapper that sets state of activeGame.shipToPlace to clicked ship child element
  const placeShipsWrapper = document.querySelector("#place-ships");

  placeShipsWrapper.addEventListener("click", (event) => {
    const placingShipsGameboardWrapper = document.querySelector(".placing-ships-gameboard");
    const clickedShip = event.target;

    if (event.target.classList.contains("placement-ship")) {
      if (event.target.id === activeGame.shipToPlace) {
        activeGame.shipToPlace = null;
        event.target.classList.remove("activeShipToPlace");
        placingShipsGameboardWrapper.classList.remove("placingShips");
      } else {
        console.log("currrr Ships", document.querySelectorAll(".placement-ship"));
        document.querySelectorAll(".placement-ship").forEach((placementShip) => {
          placementShip.classList.remove("activeShipToPlace");
        });

        activeGame.shipToPlace = event.target.id;
        clickedShip.classList.add("activeShipToPlace");
        placingShipsGameboardWrapper.classList.add("placingShips");
      }
    }

    // Place ships rotation button
    if (event.target.id === "toggleShipOrientation" && event.target.parentElement.id === "ship-placement-btns") {
      const placementShips = document.querySelectorAll(".placement-ship");

      placementShips.forEach((placementShip) => {
        if (activeGame.placementOrientation === "horizontal") {
          placementShip.classList.remove("horizontal-placement-ship");
          placementShip.classList.add("vertical-placement-ship");
        } else {
          placementShip.classList.remove("vertical-placement-ship");
          placementShip.classList.add("horizontal-placement-ship");
        }
      });

      togglePlaceShipOrientation();
    }

    if (event.target.id === "randomShipPlacements" && event.target.parentElement.id === "ship-placement-btns") {
      //randomlyPlacePlayerShips(activeGame.playerPlacingShips.playerGameboard);
      //renderGameboardCells(activeGame.playerPlacingShips.playerGameboard);
    }
  });
}

let draggedShip;
function addPlaceShipDragEventListeners() {
  const placementShips = document.querySelectorAll(".placement-ship");

  placementShips.forEach((placementShip) => {
    placementShip.addEventListener("dragstart", (event) => {
      // Remove activeShipToPlace class from all placement ships
      document.querySelectorAll(".placement-ship").forEach((placementShip) => {
        placementShip.classList.remove("activeShipToPlace");
      });
      // Reassign activeGame.shipToPlace
      activeGame.shipToPlace = event.target.id;
      draggedShip = event.target;
      // Set hover image to have mouse start in top left corner
      const draggedShipClone = event.target.cloneNode(true);
      draggedShipClone.style.position = "absolute";
      draggedShipClone.style.top = "-9999px";
      draggedShipClone.style.left = "-9999px";
      document.body.appendChild(draggedShipClone);

      event.dataTransfer.setDragImage(draggedShipClone, 0, 0);
    });

    //
    placementShip.addEventListener("drag", (event) => {
      // Prevent ship dragging snapback
      event.preventDefault();
    });
  });

  // WHen the first ship cell child of dragged ship is dragged over a cell, change the background color
}

function addGameboardCellDragEventListeners() {
  //ALL SHIP CELLS IN PLACEMENT SHIP TO SEE IF IT IS ENTERING  GAMEBOARD CELLS
  const gameboardCells = document.querySelectorAll(".gameboard-cell");
  gameboardCells.forEach((gameboardCell) => {
    gameboardCell.addEventListener("dragover", (event) => {
      // Prevent ship dragging snapback
      event.preventDefault();
      gameboardCell.classList.add("activeCell");
      toggleHighlightAdjacentShipCells(event.target.dataset.cellId, "add");
    });

    gameboardCell.addEventListener("dragleave", (event) => {
      // Prevent ship dragging snapback
      event.preventDefault();
      gameboardCell.classList.remove("activeCell");
      toggleHighlightAdjacentShipCells(event.target.dataset.cellId, "remove");
    });

    gameboardCell.addEventListener("drop", (event) => {
      // Prevent ship dragging snapback
      const gameboardCells = document.querySelectorAll(".gameboard-cell");
      gameboardCells.forEach((gameboardCell) => {
        gameboardCell.classList.remove("activeCell");
        gameboardCell.classList.remove("badCellPlacement");
      });
    });
  });

  function toggleHighlightAdjacentShipCells(currentCellId, addOrRemoveHighlight) {
    let shipPlacementResult = isMoveValid(activeGame.shipToPlace, currentCellId, activeGame.placementOrientation, activeGame.playerPlacingShips.playerGameboard);
    console.log("oooopppppp", currentCellId);
    // Store ship lengths
    const shipLengths = {
      aircraftCarrier: 5,
      battleship: 4,
      cruiser: 3,
      submarine: 3,
      destroyer: 2,
    };

    const gameboardColumns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const currentCellColumn = currentCellId.split("")[0];
    const currentCellRow = currentCellId.split("").length === 2 ? currentCellId.split("")[1] : `${currentCellId.split("")[1]}${currentCellId.split("")[2]}`;
    let incrementingCellColumnIndex = gameboardColumns.findIndex((cellId) => cellId === currentCellColumn);
    let incrementingCellRow = Number(currentCellRow);
    let nextCellId;
    // Loop activeGame.shipToPlace shipLengths amount to calculate nextCellId and add or remove activeCell
    for (let i = 0; i < shipLengths[activeGame.shipToPlace]; i++) {
      if (activeGame.placementOrientation === "horizontal") {
        nextCellId = `${gameboardColumns[incrementingCellColumnIndex]}${currentCellRow}`;
        if (shipPlacementResult === "valid") {
          addOrRemoveHighlight === "add"
            ? document.querySelector(`[data-cell-id=${nextCellId}`)?.classList.add("activeCell")
            : document.querySelector(`[data-cell-id=${nextCellId}`)?.classList.remove("activeCell");
        } else {
          addOrRemoveHighlight === "add"
            ? document.querySelector(`[data-cell-id=${nextCellId}`)?.classList.add("badCellPlacement")
            : document.querySelector(`[data-cell-id=${nextCellId}`)?.classList.remove("badCellPlacement");
          renderPlacemenErrorMessage(shipPlacementResult);
        }

        incrementingCellColumnIndex++;
      } else {
        nextCellId = `${currentCellColumn}${incrementingCellRow}`;
        if (shipPlacementResult === "valid") {
          addOrRemoveHighlight === "add"
            ? document.querySelector(`[data-cell-id=${nextCellId}`)?.classList.add("activeCell")
            : document.querySelector(`[data-cell-id=${nextCellId}`)?.classList.remove("activeCell");
        } else {
          addOrRemoveHighlight === "add"
            ? document.querySelector(`[data-cell-id=${nextCellId}`)?.classList.add("badCellPlacement")
            : document.querySelector(`[data-cell-id=${nextCellId}`)?.classList.remove("badCellPlacement");
          renderPlacemenErrorMessage(shipPlacementResult);
        }
        incrementingCellRow++;
      }
    }
  }
}

function removeShipElementFromPlaceShipsWrapper(passedShipToRemove) {
  document.querySelectorAll(".placement-ship").forEach((placementShip) => {
    if (placementShip.id != activeGame.shipToPlace) placementShip.classList.remove("activeShipToPlace");
  });
  const shipToRemove = document.querySelector(`#${passedShipToRemove}`);
  shipToRemove?.remove();
}

function addShipElementsToPlaceShipsWrapper() {
  const placeShipsWrapper = document.querySelector("#place-ships");
  const shipPacementInstructionsElement = document.querySelector("#ship-placement-instructions");
  const aircraftCarrierShipElement = document.createElement("div");
  const battleshipShipElement = document.createElement("div");
  const cruiserShipElement = document.createElement("div");
  const submarineShipElement = document.createElement("div");
  const destroyerShipElement = document.createElement("div");

  aircraftCarrierShipElement.id = "aircraftCarrier";
  aircraftCarrierShipElement.classList.add("aircraftCarrier");
  aircraftCarrierShipElement.classList.add("placement-ship");
  aircraftCarrierShipElement.classList.add("vertical-placement-ship");
  aircraftCarrierShipElement.setAttribute("draggable", "true");

  battleshipShipElement.id = "battleship";
  battleshipShipElement.classList.add("battleship");
  battleshipShipElement.classList.add("placement-ship");
  battleshipShipElement.classList.add("vertical-placement-ship");
  battleshipShipElement.setAttribute("draggable", "true");

  cruiserShipElement.id = "cruiser";
  cruiserShipElement.classList.add("cruiser");
  cruiserShipElement.classList.add("placement-ship");
  cruiserShipElement.classList.add("vertical-placement-ship");
  cruiserShipElement.setAttribute("draggable", "true");

  submarineShipElement.id = "submarine";
  submarineShipElement.classList.add("submarine");
  submarineShipElement.classList.add("placement-ship");
  submarineShipElement.classList.add("vertical-placement-ship");
  submarineShipElement.setAttribute("draggable", "true");

  destroyerShipElement.id = "destroyer";
  destroyerShipElement.classList.add("destroyer");
  destroyerShipElement.classList.add("placement-ship");
  destroyerShipElement.classList.add("vertical-placement-ship");
  destroyerShipElement.setAttribute("draggable", "true");

  addShipCellElementsToShipElement(aircraftCarrierShipElement, 5);
  addShipCellElementsToShipElement(battleshipShipElement, 4);
  addShipCellElementsToShipElement(cruiserShipElement, 3);
  addShipCellElementsToShipElement(submarineShipElement, 3);
  addShipCellElementsToShipElement(destroyerShipElement, 2);
  placeShipsWrapper.insertBefore(aircraftCarrierShipElement, shipPacementInstructionsElement);
  placeShipsWrapper.insertBefore(battleshipShipElement, shipPacementInstructionsElement);
  placeShipsWrapper.insertBefore(cruiserShipElement, shipPacementInstructionsElement);
  placeShipsWrapper.insertBefore(submarineShipElement, shipPacementInstructionsElement);
  placeShipsWrapper.insertBefore(destroyerShipElement, shipPacementInstructionsElement);

  function addShipCellElementsToShipElement(shipParent, numOfShipCells) {
    for (let i = 0; i < numOfShipCells; i++) {
      const shipCellElement = document.createElement("div");
      shipCellElement.classList.add("ship-cell");
      shipParent.appendChild(shipCellElement);
    }
  }
}

function renderPlacemenErrorMessage(errorMessage) {
  if (document.querySelector("#placement-error-message").textContent.length === 0) {
    document.querySelector("#placement-error-message").textContent = `Invalid Placement: ${errorMessage}`;

    setTimeout(() => {
      document.querySelector("#placement-error-message").textContent = "";
    }, 3000);
  }
}

document.addEventListener("DOMContentLoaded", startGameSetupUI);

export { startGameSetupUI, renderGameboardCells, removeShipElementFromPlaceShipsWrapper, addShipElementsToPlaceShipsWrapper, addPlaceShipDragEventListeners };

// MAKE SHIP ORIENTATION PROP ON SHIP, AND SHIP INSTANCES MAP ON GAMEBOARD CLASS

// Changes: shipOrientation
