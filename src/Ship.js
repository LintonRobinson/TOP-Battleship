// Aircraft Carrier: The largest ship, taking up five spaces on the board.
// Battleship: The second-largest ship, covering four spaces.
// Cruiser: A three-space ship.
// Submarine: Another three-space ship.
// Destroyer: The smallest ship in the game, occupying two spaces.

class Ship {
  constructor(shipName) {
    this.shipName = shipName;
    switch (shipName) {
      case "aircraftCarrier":
        this.shipLength = 5;
        break;
      case "battleship":
        this.shipLength = 4;
        break;
      case "cruiser":
        this.shipLength = 3;
        break;
    }
  }
}

export default Ship;

// git add Ship.js

// feat(Ship): return correct length for battleship
