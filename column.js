export default class Column {
  constructor() {
    this.tokenArr = Array.from(new Array(6), () => null);
  }

  /*Add the value of currentPlayer(1 or 2) into the column instance array
  from the last index forward.*/
  add(currentPlayer) {
    for (let i = this.tokenArr.length - 1; i >= 0; i--) {
      if (this.tokenArr[i] === null) {
        this.tokenArr[i] = currentPlayer;
        break;
      }
    }
  }

  /* Check if column instance array contains any null values */
  isFull() {
    return !this.tokenArr.includes(null);
  }

  /* Gives the value of the instance array at whatever index is passed in. */
  getIndexAt(index) {
    return this.tokenArr[index];
  }
}
