export default class Deserializer {
  constructor() {
    this.tokenArray = [];
    this.playerNames = [];
    this.currentPlayer = "";
    this.winnerNumber = undefined;
  }

  deserialize() {
    let jsonString = localStorage.getItem("gameState");
    let object = JSON.parse(jsonString);
    if (object !== null) {
      this.tokenArray = object[0];
      this.playerNames = object[1];
      this.currentPlayer = object[2];
      this.winnerNumber = object[3];
    }
  }
}
