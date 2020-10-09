export default class Column {
  constructor() {
    this.tokenArr = [null, null, null, null, null, null];
  }
  add(currentPlayer) {
    for (let i = this.tokenArr.length - 1; i >= 0; i--) {
      if (this.tokenArr[i] === null) {
        this.tokenArr[i] = currentPlayer;
        break;
      }
    }
  }

  isFull() {
    return !this.tokenArr.includes(null);
  }

  getIndexAt(index) {
    return this.tokenArr[index];
  }
}
