import { game } from "./game.js";
import { isPlacementValid, randomlyPlacePlayerShips } from "./helpers.js";

function startGameSetupUI() {
  // Screen navigation
  document.addEventListener("click", (event) => {
    // Start game button click  hides start game screen and displays select game mode screen
    if (event.target.id === "startGame") {
      advanceScreen("#start-game-wrapper", "#select-mode-wrapper");
    }

    // Player vs player button click  hides select game mode screen and displays enter player names screen
    if (event.target.id === "player-vs-player") {
      const enterPlayerNameWrapper = document.querySelector("#enter-player-name-wrapper");
      enterPlayerNameWrapper.remove();
      game.setGameMode("twoPlayer");
      advanceScreen("#select-mode-wrapper", "#enter-player-names-wrapper");
    }

    // Player vs computer button click hides select game mode screen and displays select computer difficulty screen
    if (event.target.id === "player-vs-computer") {
      const enterPlayerNamesWrapper = document.querySelector("#enter-player-names-wrapper");
      enterPlayerNamesWrapper.remove();
      game.setGameMode("onePlayer");

      advanceScreen("#select-mode-wrapper", "#select-computer-difficulty-wrapper");
    }

    // Select computer diffiulty button click hides select select computer difficulty and displays enter player name screen
    if (event.target.classList.contains("select-computer-difficulty-button")) {
      game.setComputerDifficulty(event.target.id);
      advanceScreen("#select-computer-difficulty-wrapper", "#enter-player-name-wrapper");
    }

    if (event.target.id === "saveShipPlacements") {
      // If player one is player placing ships,

      if (game.playerHasShipsToPlace(game.getPlayerPlacingShips())) {
        renderPlacemenErrorMessage("you must place all five ships");
      }

      if (game.getPlayerPlacingShips() === game.getPlayer("playerOne") && !game.playerHasShipsToPlace(game.getPlayer("playerOne"))) {
        game.startPlayerTwoShipPlacements();
        if (game.getGameMode() === "twoPlayer") {
          updatePlaceYourShipsTitle(game.getPlayerPlacingShips());
          game.setPlacementOrientation("vertical");
          addShipElementsToPlaceShipsWrapper();
          renderPlaceShipGameboardCells();
        }
      }

      // Advance to gameplay screen and Update Gameboard text
      if (
        (game.getGameMode() === "twoPlayer" && !game.playerHasShipsToPlace(game.getPlayer("playerTwo"))) ||
        (game.getGameMode() === "onePlayer" && !game.playerHasShipsToPlace(game.getPlayer("playerOne")))
      ) {
        alert("Should have ran");
        advanceScreen("#place-ships-screen-wrapper", "#gameplay-screen-wrapper");
        updateGameplayScreenPlayerText();
        startGameplayUI();
      }
    }

    function updateGameplayScreenPlayerText() {
      const playerOneGameboardTitle = document.querySelector("#playerOneGameboardTitle");
      const playerTwoGameboardTitle = document.querySelector("#playerTwoGameboardTitle");
      playerOneGameboardTitle.textContent = `${game.getPlayerName(game.getPlayer("playerOne"))}'s Gameboard`;
      playerTwoGameboardTitle.textContent = `${game.getPlayerName(game.getPlayer("playerTwo"))}'s Gameboard`;

      const playerOneFleetTitle = document.querySelector("#playerOneFleetTitle");
      const playerTwoFleetTitle = document.querySelector("#playerTwoFleetTitle");
      playerOneFleetTitle.textContent = `${game.getPlayerName(game.getPlayer("playerOne"))}'s Feet`;
      playerTwoFleetTitle.textContent = `${game.getPlayerName(game.getPlayer("playerTwo"))}'s Fleet`;
    }
  });

  const mainWrapper = document.querySelector("main");
  // Use submits player names
  mainWrapper.addEventListener("submit", (event) => {
    const playerOneName = document.querySelector("#playerOneName").value;
    event.preventDefault();
    // Place player ships button click hides enter player names screen and displays place player ships screen
    if (event.target.id === "enter-player-names") {
      const playerTwoName = document.querySelector("#playerTwoName").value;

      // From game.js
      game.initializePlayers(playerOneName, playerTwoName);
      game.setPlayerPlacingShips(game.getPlayer("playerOne"));

      // Update placeYourShipTitles with playerOne's playerName
      updatePlaceYourShipsTitle(game.getPlayer("playerOne"));

      advanceScreen("#enter-player-names-wrapper", "#place-ships-screen-wrapper");
    }

    // Place player ships button click hides enter player name screen and displays place player ships screen
    if (event.target.id === "enter-player-name") {
      alert("Ya Mama Runnin");
      game.initializePlayers(playerOneName);
      game.setPlayerPlacingShips(game.getPlayer("playerOne"));

      // Update placeYourShipTitles with playerOne's playerName
      updatePlaceYourShipsTitle(game.getPlayer("playerOne"));
      advanceScreen("#enter-player-name-wrapper", "#place-ships-screen-wrapper");
    }

    game.setPlayerPlacingShips(game.getPlayer("playerOne"));
    startPlaceShipsUI();
  });

  function advanceScreen(unactiveScreenSelector, activeScreenSelector) {
    const screenToMakeUnactiveWrapper = document.querySelector(unactiveScreenSelector);
    const screenToMakeActiveWrapper = document.querySelector(activeScreenSelector);
    // Remove start game screen
    screenToMakeUnactiveWrapper.classList.add("fadeOut");
    addFadeAnimationDelay(() => screenToMakeUnactiveWrapper.remove());
    // Show screen
    screenToMakeActiveWrapper.classList.add("fadeIn");
    screenToMakeActiveWrapper.classList.add("active-screen");
    // remove fadeIn/off-screen-start-position class from screen (animation in and start)
    addFadeAnimationDelay(() => {
      screenToMakeActiveWrapper.classList.remove("fadeIn");
      screenToMakeActiveWrapper.classList.remove("off-screen-start-position");
    });
  }

  function addFadeAnimationDelay(callback) {
    setTimeout(callback, 1000);
  }
  //addPlaceShipGameboarDragEventListeners();

  // If the cell to add is in the hash map at the end off looping, remove that many cells and add ship to span grid
}

function startPlaceShipsUI() {
  addShipActivationEventListener();
  function addShipActivationEventListener() {
    // Add event listener to placeShipsWrapper that sets state of activeGame.shipToPlace to clicked ship child element
    const placeShipsWrapper = document.querySelector("#place-ships");
    placeShipsWrapper.addEventListener("click", (event) => {
      const placingShipsGameboardWrapper = document.querySelector(".placing-ships-gameboard");
      const clickedShip = event.target;
      // Clicking a ship - Removing activeShipToPlace highlight from all clicked ships, adds activeShipToPlace and highlights clicked ship
      if (event.target.classList.contains("placement-ship")) {
        if (event.target.id === game.getShipToPlace()) {
          game.setShipToPlace("null");
          // Unhighlight ship and remove ability to interact with board
          event.target.classList.remove("activeShipToPlace");
          placingShipsGameboardWrapper.classList.remove("placingShips");
        } else {
          game.setShipToPlace(event.target.id);
          // Unhighlight all ships, highlight clicked ship, and allow gameboard  to be clicked
          document.querySelectorAll(".placement-ship").forEach((placementShip) => {
            placementShip.classList.remove("activeShipToPlace");
          });
          clickedShip.classList.add("activeShipToPlace");
          placingShipsGameboardWrapper.classList.add("placingShips");
        }
      }

      // Rotate Ship Orientations click
      if (event.target.id === "toggleShipOrientation") {
        const placementShips = document.querySelectorAll(".placement-ship");
        // Remove horizontal-placement-ship / vertical-placement-ship for ships element to reflect orientation toggle
        placementShips.forEach((placementShip) => {
          if (game.getPlacementOrientation() === "horizontal") {
            placementShip.classList.remove("horizontal-placement-ship");
            placementShip.classList.add("vertical-placement-ship");
          } else {
            placementShip.classList.remove("vertical-placement-ship");
            placementShip.classList.add("horizontal-placement-ship");
          }
        });
        // Changing orientation in activeGame object
        game.togglePlaceShipOrientation();
      }

      if (event.target.id === "randomShipPlacements") {
        game.randomlyPlacePlayerShips(game.getPlayerGameboard(game.getPlayerPlacingShips()));
        renderPlaceShipGameboardCells(game.getPlayerGameboard(game.getPlayerPlacingShips()));
        // Not allow gameboard to be clicked
        placingShipsGameboardWrapper.classList.remove("placingShips");
      }

      if (event.target.id === "resetShipPlacements") {
        game.getPlayerPlacingShips().createNewGameboard();
        resetPlaceShipWrapper();
        // addPlaceShipDragEventListeners();
        renderPlaceShipGameboardCells(game.getPlayerGameboard(game.getPlayerPlacingShips()));
        game.setPlacementOrientation("vertical");
      }

      if (event.target.id === "saveShipPlacements") {
        // If player one is player placing ships,
        if (game.allPlayerShipsPlaced(game.getPlayer("playerOne"))) {
          game.setPlayerPlacingShips(game.getPlayer("playerTwo"));
          if (game.getGameMode() === "twoPlayer") {
            updatePlaceYourShipsTitle(activeGame.playerPlacingShips);
            game.setPlacementOrientation("vertical");
          }
        } else {
          if (activeGame.playerPlacingShips.playerGameboard.unplacedShips.size) {
            renderPlacemenErrorMessage("you must place all five ships");
          }
        }

        if (game.getGameMode() === "onePlayer") {
          game.randomlyPlacePlayerShips();
        }
      }
    });
  }

  addPlaceShipDragEventListeners();
  function addPlaceShipDragEventListeners() {
    let draggedShip;
    const placeShipsWrapper = document.querySelector("#place-ships");
    placeShipsWrapper.addEventListener("dragstart", (event) => {
      if (event.target.classList.contains("placement-ship")) {
        // Remove activeShipToPlace class from all placement ships
        document.querySelectorAll(".placement-ship").forEach((placementShip) => {
          placementShip.classList.remove("activeShipToPlace");
        });

        // Reassign activeGame.shipToPlace
        game.setShipToPlace(event.target.id);
        draggedShip = event.target;

        // Set hover image to have mouse start in top left corner
        const draggedShipClone = event.target.cloneNode(true);
        draggedShipClone.style.position = "absolute";
        draggedShipClone.style.top = "-9999px";
        draggedShipClone.style.left = "-9999px";
        document.body.appendChild(draggedShipClone);

        event.dataTransfer.setDragImage(draggedShipClone, 0, 0);
      }
    });

    placeShipsWrapper.addEventListener("drag", (event) => {
      // Prevent ship dragging snapback
      event.preventDefault();
    });

    const placementShips = document.querySelectorAll(".placement-ship");

    placementShips.forEach((placementShip) => {
      placementShip.addEventListener("dragstart", (event) => {});

      //
      placementShip;
    });

    // WHen the first ship cell child of dragged ship is dragged over a cell, change the background color
  }

  addPlaceShipGameboardShipPlacementEventListeners();
  function addPlaceShipGameboardShipPlacementEventListeners() {
    const placingShipsGameboardWrapper = document.querySelector(".placing-ships-gameboard");
    placingShipsGameboardWrapper.addEventListener("click", handleUserGameboardEvents);
    placingShipsGameboardWrapper.addEventListener("drop", handleUserGameboardEvents);
    function handleUserGameboardEvents(event) {
      // Places ship when game gameboard-cell is clicked and activeGame.shipToPlace is not null
      if (event.target.classList.contains("gameboard-cell")) {
        // If there is a ship to place, the move is valid, and the player has unplaces ships
        if (
          game.getShipToPlace() &&
          isPlacementValid(game.getShipToPlace(), event.target.dataset.cellId, game.getPlacementOrientation(), game.getPlayerGameboard(game.getPlayerPlacingShips())) ===
            "valid" &&
          game.playerHasShipsToPlace(game.getPlayerPlacingShips())
        ) {
          const clickedCellId = event.target.dataset.cellId;
          game.placePlayerShip(clickedCellId);
          renderPlaceShipGameboardCells(game.getPlayerGameboard(game.getPlayerPlacingShips()));
          game.setShipToPlace(null);
          placingShipsGameboardWrapper.classList.remove("placingShips");
        }
      }
    }
  }

  addGameboardCellDragHighlightEventListeners();
  function addGameboardCellDragHighlightEventListeners() {
    const placingShipsGameboardWrapper = document.querySelector(".placing-ships-gameboard");
    placingShipsGameboardWrapper.addEventListener("dragover", (event) => {
      if (event.target.classList.contains("gameboard-cell")) {
        // Prevent ship dragging snapback
        event.preventDefault();
        event.target.classList.add("activeCell");
        toggleHighlightAdjacentShipCells(event.target.dataset.cellId, "add");
      }
    });

    placingShipsGameboardWrapper.addEventListener("dragleave", (event) => {
      if (event.target.classList.contains("gameboard-cell")) {
        // Prevent ship dragging snapback
        event.preventDefault();
        event.target.classList.remove("activeCell");
        toggleHighlightAdjacentShipCells(event.target.dataset.cellId, "remove");
      }
    });

    placingShipsGameboardWrapper.addEventListener("drop", (event) => {
      if (event.target.classList.contains("gameboard-cell")) {
        // Prevent ship dragging snapback
        const gameboardCells = document.querySelectorAll(".gameboard-cell");
        gameboardCells.forEach((gameboardCell) => {
          gameboardCell.classList.remove("activeCell");
          gameboardCell.classList.remove("badCellPlacement");
        });
      }
    });

    //ALL SHIP CELLS IN PLACEMENT SHIP TO SEE IF IT IS ENTERING  GAMEBOARD CELLS

    function toggleHighlightAdjacentShipCells(currentCellId, addOrRemoveHighlight) {
      let shipPlacementResult = isPlacementValid(
        game.getShipToPlace(),
        currentCellId,
        game.getPlacementOrientation(),
        game.getPlayerGameboard(game.getPlayerPlacingShips()),
      );
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
      for (let i = 0; i < shipLengths[game.getShipToPlace()]; i++) {
        if (game.getPlacementOrientation() === "horizontal") {
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

  renderPlaceShipGameboardCells();
}

function startGameplayUI() {
  const turnMessasageElement = document.querySelector("#turnMessage");

  //
  game.setPlayerGivingAttack(game.getPlayer("playerOne"));
  game.setPlayerReceivingAttack(game.getPlayer("playerTwo"));
  //
  document.querySelector(`#${game.getPlayerReceivingAttackId()}Gameboard`).classList.add("receivingAttack");
  //
  turnMessasageElement.textContent = `${game.getPlayerGivingAttackName()} - Attack! (click ${game.getPlayerReceivingAttackName()}'s gameboard)`;
  //
  renderGameplayGameboardCells("playerOneGameboard");
  renderGameplayGameboardCells("playerTwoGameboard");
  const gameplayScreenWrapper = document.querySelector("#gameplay-screen-wrapper");

  gameplayScreenWrapper.addEventListener("click", (event) => {
    if (event.target.classList.contains("gameboard-cell") & event.target.parentElement.classList.contains("receivingAttack")) {
      handleGameplayGameboardTurnClick(event);
    }
  });

  function handleGameplayGameboardTurnClick(event) {
    if (
      game.getGameboardHitShipCells(game.getPlayerReceivingAttackGameboard()).has(event.target.dataset.cellId) ||
      game.getGameboardMissedShipCells(game.getPlayerReceivingAttackGameboard()).has(event.target.dataset.cellId)
    ) {
      return;
    }
    // Add conditional for hit/miss
    game.receivePlayerAttack(event.target.dataset.cellId);
    renderGameplayGameboardCells(`${game.getPlayerReceivingAttackId()}Gameboard`, game.getPlayerReceivingAttackGameboard());
    updatePlaceSunkShipSidebarUi();
    if (game.checkForGameWin()) {
      //Update wiwin modal with winner name
      const winnerMessageWrapperElement = document.querySelector("#winner-message-wrapper");
      const winnerMessageElement = document.querySelector("#winner-message");
      const winnerName = game.getGameWinnerName();
      winnerMessageElement.textContent = `${winnerName} Wins! 🎉`;
      winnerMessageWrapperElement.classList.remove("hidden");
    }

    game.togglePlayerReceivingGivingAttack();
    toggleGameTurnMessage();
    toggleClickablePlayerGameboard();

    function toggleGameTurnMessage() {
      turnMessasageElement.textContent = `${game.getPlayerGivingAttackName()} - Attack! (click/attack ${game.getPlayerReceivingAttackName()}'s gameboard)`;
    }

    function updatePlaceSunkShipSidebarUi() {
      const playerGameboard = game.getPlayerReceivingAttackGameboard();
      const playerReceivingAttackPlacedShips = game.getGameboardPlacedShips(playerGameboard);
      const sunkShipNames = [];
      const playerReceivingAttackId = game.getPlayerReceivingAttackId();

      playerReceivingAttackPlacedShips.forEach((placedShip) => {
        if (game.isShipSunk(placedShip)) {
          let shipName = game.getShipName(placedShip);
          let example = shipName.slice(0, 1);
          console.log("shipName.slice(0, 1)", example);

          const shipNameCapitalFirstLetter = shipName.slice(0, 1).toUpperCase();
          const shipNameWithoutFirstLetter = shipName.slice(1, shipName.length);
          shipName = shipNameCapitalFirstLetter;
          shipName = shipName.concat(shipNameWithoutFirstLetter);
          sunkShipNames.push(shipName);
        }
      });

      sunkShipNames.forEach((sunkShipName) => {
        console.log(playerReceivingAttackId, sunkShipName);
        const sunkShipElement = document.querySelector(`#${playerReceivingAttackId}${sunkShipName}`);
        sunkShipElement.classList.add("sunk-ship");
      });
    }

    function toggleClickablePlayerGameboard() {
      const gameplayGameboards = document.querySelectorAll(".gameplay-gameboard");
      gameplayGameboards.forEach((gameboard) => {
        gameboard.classList.remove("receivingAttack");
      });
      document.querySelector(`#${game.getPlayerReceivingAttackId()}Gameboard`).classList.add("receivingAttack");
    }
  }
}

function renderPlaceShipGameboardCells(playerGameboard) {
  const gameboard = document.querySelector(".gameboard");
  // Clear gameboard cells
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
}

function renderGameplayGameboardCells(playerGameboardId, playerGameboard) {
  const gameboard = document.querySelector(`#${playerGameboardId}`);

  // Clear gameboard cells
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

  addGameplayGameboardCellHoverEventListeners();

  // Change bg of hit shots, for each hit shot. Loop through all cells if cell is in hit cell set change bg

  // Remove ship.shipLength cells from gameboard

  if (playerGameboard) {
    const gameboardCells = gameboard.querySelectorAll(".gameboard-cell");

    gameboardCells.forEach((gameboardCell) => {
      if (game.getGameboardHitShipCells(playerGameboard).has(gameboardCell.dataset.cellId)) gameboardCell.classList.add("hit-cell");
      if (game.getGameboardMissedShipCells(playerGameboard).has(gameboardCell.dataset.cellId)) gameboardCell.classList.add("missed-cell");
    });
    // Change bg of hit shots, for each hit shot. Loop through all cells if cell is in hit cell set change bg

    const placedShips = playerGameboard.placedShips;
    placedShips.forEach((ship) => {
      if (game.isShipSunk(ship)) {
        const initialShipPlacementCellColumn = ship.getInitialShipPlacementCell().split("")[0];
        const initialShipPlacementCellRow =
          ship.getInitialShipPlacementCell().split("").length < 3
            ? ship.getInitialShipPlacementCell().split("")[1]
            : ship.getInitialShipPlacementCell().split("")[1] + ship.getInitialShipPlacementCell().split("")[2];

        const shipGridColumnStartIndex = gameboardColumns.findIndex((column) => column === initialShipPlacementCellColumn) + 1;

        const shipGridRowStart = initialShipPlacementCellRow;

        const gameboardCells = gameboard.querySelectorAll(".gameboard-cell");

        // Change bg of hit shots, for each hit shot. Loop through all cells if cell is in hit cell set change bg

        // Remove ship.shipLength cells from gameboard
        const shipCoordinates = ship.getActiveShipCoordinates();
        gameboardCells.forEach((gameboardCell) => {
          if (shipCoordinates.includes(gameboardCell.dataset.cellId)) gameboardCell.remove();
        });

        const sunkShipElement = document.createElement("div");

        sunkShipElement.classList.add(`${ship.shipOrientation}-placement-ship`);
        sunkShipElement.classList.add(ship.shipName);
        // Remove
        for (let i = 0; i < ship.shipLength; i++) {
          const shipCell = document.createElement("div");
          shipCell.classList.add("ship-cell");
          shipCell.classList.add("sunk-cell");
          sunkShipElement.appendChild(shipCell);
        }

        // Grid placement
        if (ship.shipOrientation === "horizontal") {
          sunkShipElement.style.gridColumnStart = `${shipGridColumnStartIndex}`;
          sunkShipElement.style.gridColumnEnd = `${shipGridColumnStartIndex + ship.shipLength}`;
          sunkShipElement.style.gridRowStart = `${shipGridRowStart}`;
          sunkShipElement.style.gridRowEnd = `${Number(shipGridRowStart) + 1}`;
        } else {
          sunkShipElement.style.gridColumnStart = `${shipGridColumnStartIndex}`;
          sunkShipElement.style.gridColumnEnd = `${shipGridColumnStartIndex + 1}`;
          sunkShipElement.style.gridRowStart = `${shipGridRowStart}`;
          sunkShipElement.style.gridRowEnd = `${Number(shipGridRowStart) + ship.shipLength}`;
        }
        gameboard.appendChild(sunkShipElement);
      }
    });
  }

  function addGameplayGameboardCellHoverEventListeners() {
    const gameplayGameboards = document.querySelectorAll(".gameplay-gameboard");
    gameplayGameboards.forEach((gameboard) => {
      gameboard.addEventListener("mouseover", (event) => {
        if (event.target.classList.contains("gameboard-cell") && event.target.parentElement.classList.contains("receivingAttack")) {
          if (
            !game.getGameboardHitShipCells(game.getPlayerReceivingAttackGameboard()).has(event.target.dataset.cellId) &&
            !game.getGameboardMissedShipCells(game.getPlayerReceivingAttackGameboard()).has(event.target.dataset.cellId)
          )
            event.target.style.backgroundColor = "#f4fff2";
        }
      });
      gameboard.addEventListener("mouseout", (event) => {
        if (event.target.classList.contains("gameboard-cell") && event.target.parentElement.classList.contains("receivingAttack")) {
          if (
            !game.getGameboardHitShipCells(game.getPlayerReceivingAttackGameboard()).has(event.target.dataset.cellId) &&
            !game.getGameboardMissedShipCells(game.getPlayerReceivingAttackGameboard()).has(event.target.dataset.cellId)
          )
            event.target.style.backgroundColor = "rgb(51, 51, 51)";
        }
      });
      //(gameboard.addEventListener("mouseout"), () => {});
    });
  }
}

function addSaveShipPlacementsBtnEventListenerr() {
  const saveShipPlacementsBtn = document.querySelector("#saveShipPlacements");
  saveShipPlacementsBtn.addEventListener("click", (event) => {});
}

function addSaveShipPlacementsBtnEventListener() {
  const saveShipPlacementsBtn = document.querySelector("#saveShipPlacements");
  saveShipPlacementsBtn.addEventListener("click", (event) => {
    if (event.target.id === "saveShipPlacements") {
      const playerOneGameboardTitle = document.querySelector("#playerOneGameboardTitle");
      const playerTwoGameboardTitle = document.querySelector("#playerTwoGameboardTitle");
      // If player one is player placing ships,

      if (activeGame.playerPlacingShips === activeGame.playerOne) {
        startPlayerTwoShipPlacements();
        updatePlaceYourShipsTitle(activeGame.playerPlacingShips);
        activeGame.placementOrientation = "vertical";
      } else {
        if (activeGame.playerPlacingShips.playerGameboard.unplacedShips.size) {
          renderPlacemenErrorMessage("you must place all five ships");
        }
      }

      // Advance to gameplay screen
      if (!activeGame.playerTwo.playerGameboard.unplacedShips.size) {
        // Remove place ships screen
        placePlayerShipsWrapper.classList.add("fadeOut");
        addFadeAnimationDelay(() => placePlayerShipsWrapper.remove());
        // Show gameplay ships screen
        gameplayWrapper.classList.add("fadeIn");
        gameplayWrapper.classList.add("active-screen");

        // remove fadeIn/off-screen-start-position class from gameplayWrapper
        addFadeAnimationDelay(() => {
          gameplayWrapper.classList.remove("fadeIn");
          gameplayWrapper.classList.remove("off-screen-start-position");
        });
        renderGameplayGameboardCells("playerOneGameboard");
        renderGameplayGameboardCells("playerTwoGameboard");
        //addGameplayGameboardClickEventListeners();

        playerOneGameboardTitle.textContent = `${activeGame.playerOne.playerName}'s Gameboard`;
        playerTwoGameboardTitle.textContent = `${activeGame.playerTwo.playerName}'s Gameboard`;
      }
    }
  });
}

function removeShipElementFromPlaceShipsWrapper(passedShipToRemove) {
  document.querySelectorAll(".placement-ship").forEach((placementShip) => {
    if (placementShip.id != game.getShipToPlace()) placementShip.classList.remove("activeShipToPlace");
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

function updatePlaceYourShipsTitle(player) {
  console.log("The passed player", player);
  const placeYourShipsTitle = document.querySelector("#placeYourShipsTitle");
  const playerName = player.playerName;
  placeYourShipsTitle.textContent = `${playerName}, Place Your Ships`;
}

function resetPlaceShipWrapper() {
  removeShipElementFromPlaceShipsWrapper("aircraftCarrier");
  removeShipElementFromPlaceShipsWrapper("battleship");
  removeShipElementFromPlaceShipsWrapper("cruiser");
  removeShipElementFromPlaceShipsWrapper("submarine");
  removeShipElementFromPlaceShipsWrapper("destroyer");
  addShipElementsToPlaceShipsWrapper();
}

document.addEventListener("DOMContentLoaded", startGameSetupUI);

export {
  startGameSetupUI,
  renderPlaceShipGameboardCells,
  removeShipElementFromPlaceShipsWrapper,
  addShipElementsToPlaceShipsWrapper,
  renderPlacemenErrorMessage,
  updatePlaceYourShipsTitle,
};

// MAKE SHIP ORIENTATION PROP ON SHIP, AND SHIP INSTANCES MAP ON GAMEBOARD CLASS

// Changes: shipOrientation
