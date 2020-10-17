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
    switch (this.winnerNumber) {
      case 0:
        return `${this.player1} vs. ${this.player2}`;
      case 1:
        return `${this.player1} Wins!`;
      case 2:
        return `${this.player2} Wins!`;
      case 3:
        return `${this.player1} ties with ${this.player2}`;
    }
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
    this.checkForWinConditions();
  }

  /*Check each of the column instances in the columns array, to see if there are
  any more playable locations. */
  checkForTie() {
    if (this.columns.every((column) => column.isFull())) {
      return (this.winnerNumber = 3);
    }
  }

  /*For each of the column instances make a win inspector and run the inspect
  method on the new instance. If there is a value returned from that inspect
  method set the winner number to that value.*/
  checkForColumnWin() {
    this.columns.forEach((ele) => {
      let checkedArray = new ColumnWinInspector(ele.tokenArr);
      if (checkedArray.inspect()) {
        this.winnerNumber = checkedArray.inspect();
      }
    });
  }

  /*Helper function to create a new instance of a win inspector for
  a set group of columns*/
  createGroup(start, end, className) {
    let group = this.columns.slice(start, end);
    return new className(group);
  }

  /*Create the groups to inspect the rows and diagonals of the board with the helper
  function. If any of the groups return a truthy value, set
  the winner number to that value. */
  checkForRowAndDiagonalWin() {
    const startNums = [0, 1, 2, 3];
    startNums.forEach((ele) => {
      let rowGroup = this.createGroup(ele, ele + 4, RowWinInspector);
      let diagonalGroup = this.createGroup(ele, ele + 4, DiagonalWinInspector);
      if (rowGroup.inspect()) {
        this.winnerNumber = rowGroup.inspect();
      } else if (diagonalGroup.inspect()) {
        this.winnerNumber = diagonalGroup.inspect();
      }
    });
  }

  /*Run all methods that check for win/tie conditions */
  checkForWinConditions() {
    this.checkForTie();
    this.checkForColumnWin();
    this.checkForRowAndDiagonalWin();
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
