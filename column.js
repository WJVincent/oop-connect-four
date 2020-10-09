export default class Column {
  constructor() {
    this.colArr = [null, null, null, null, null, null];
  }
  add(currentPlayer) {
    for (let i = this.colArr.length - 1; i >= 0; i--) {
      let currPos = this.colArr[i];
      if ((currPos = null)) {
        currPos = currentPlayer;
      } else {
        this.isFull();
      }
    }
  }
  isFull() {
    if (this.colArr.includes(null) !== false) return true;
  }
  getIndexAt(index) {
    return this.colArr[index];
  }
}
