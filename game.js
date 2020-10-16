import Column from "./column.js";
import ColumnWinInspector from "./columnWin.js";
import RowWinInspector from "./rowWin.js";
import DiagonalWinInspector from "./diagonalWin.js";

export default class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayer = 1;
    this.winnerNumber = 0;
    this.columns = Array.from(new Array(7), () => new Column());
  }

  /*Check the value of winner number and return an template string based on the value
  of winner number */
  getName() {
    return this.winnerNumber === 3
      ? `${this.player1} ties with ${this.player2}`
      : this.winnerNumber === 2
      ? `${this.player2} Wins!`
      : this.winnerNumber === 1
      ? `${this.player1} Wins!`
      : `${this.player1} vs. ${this.player2}`;
  }

  /*If the instance of column in the columns array is not full, then call the add
  method on that column instance array. Switch the value of current player. */
  playInColumn(columnIndex) {
    if (!this.columns[columnIndex].isFull()) {
      this.columns[columnIndex].add(this.currentPlayer);
      this.currentPlayer === 1
        ? (this.currentPlayer = 2)
        : (this.currentPlayer = 1);
    }
  }

  /*Check each of the column instances in the columns array, to see if there are
  any more playable locations. */
  checkForTie() {
    for (let index = 0; index < this.columns.length; index++) {
      if (!this.columns[index].isFull()) {
        return;
      }
    }
    return (this.winnerNumber = 3);
  }

  /*For each of the column instances make a win inspector and run the inspect
  method on the new instance. If there is a value returned from that inspect
  method set the winner number to that value.*/
  checkForColumnWin() {
    this.columns.forEach((ele) => {
      let checkedArray = new ColumnWinInspector(ele.tokenArr);
      let value = checkedArray.inspect();
      if (value !== undefined) {
        this.winnerNumber = value;
      }
    });
  }

  /*Helper function to create a new instance of a win inspector for
  a set group of columns*/
  createColumnGroup(start, end, className) {
    let group = this.columns.slice(start, end);
    return new className(group);
  }

  /*Create the groups to inspect the rows of the board with the helper
  function. If any of the groups of rows return a truthy value, set
  the winner number to that value. */
  checkForRowWin() {
    const startNums = [0, 1, 2, 3];
    startNums.forEach((ele) => {
      let group = this.createColumnGroup(ele, ele + 4, RowWinInspector);
      if (group.inspect()) {
        this.winnerNumber = group.inspect();
      }
    });
  }

  /*Create the groups to inspect the diagonals of the board with the helper
  function. If any of the groups of diagonals return a truthy value, set
  the winner number to that value.  */
  checkForDiagonalWin() {
    const startNums = [0, 1, 2, 3];
    startNums.forEach((ele) => {
      let group = this.createColumnGroup(ele, ele + 4, DiagonalWinInspector);
      if (group.inspect()) {
        this.winnerNumber = group.inspect();
      }
    });
  }

  /*Run all methods that check for win/tie conditions */
  checkForWinConditions() {
    this.checkForTie();
    this.checkForColumnWin();
    this.checkForRowWin();
    this.checkForDiagonalWin();
  }

  /*Check the value of the column instance, at a specific index of that instances
  array */
  getTokenAt(colIndex, rowIndex) {
    return this.columns[colIndex].getIndexAt(rowIndex);
  }

  /*Check if the specific column instance is full */
  isColumnFull(index) {
    return this.columns[index].isFull();
  }
}
