import Game from "./game";

export default class Column {
  constructor() {
    this.columnArr = [null, null, null, null, null, null];
  }
  add(currentPlayer) {
    for (let i = this.columnArr.length - 1; i >= 0; i--) {
      let currPos = this.columnArr[i];
      if ((currPos = null)) {
        currPos = currentPlayer;
      }
    }
  }
  getTokenAt(index) {
    return this.columnArr[index];
  }
}
