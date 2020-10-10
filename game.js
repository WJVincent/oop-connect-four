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
  getName() {
    return this.winnerNumber === 3
      ? `${this.player1} ties with ${this.player2}`
      : this.winnerNumber === 2
      ? `${this.player2} Wins!`
      : this.winnerNumber === 1
      ? `${this.player1} Wins!`
      : `${this.player1} vs. ${this.player2}`;
  }

  playInColumn(columnIndex) {
    if (!this.columns[columnIndex].isFull()) {
      this.columns[columnIndex].add(this.currentPlayer);
      this.currentPlayer === 1
        ? (this.currentPlayer = 2)
        : (this.currentPlayer = 1);
    }
  }

  checkForTie() {
    for (let index = 0; index < this.columns.length; index++) {
      if (!this.columns[index].isFull()) {
        return;
      }
    }
    return (this.winnerNumber = 3);
  }

  checkForColumnWin() {
    this.columns.forEach((ele) => {
      let checkedArray = new ColumnWinInspector(ele.tokenArr);
      let value = checkedArray.inspect();
      console.log(value);
      if (value !== undefined) {
        this.winnerNumber = value;
      }
    });
  }

  createColumnGroup(start, end, className) {
    let group = this.columns.slice(start, end);
    return new className(group);
  }

  checkForRowWin() {
    let rows1 = this.createColumnGroup(0, 4, RowWinInspector);
    let rows2 = this.createColumnGroup(1, 5, RowWinInspector);
    let rows3 = this.createColumnGroup(2, 6, RowWinInspector);
    let rows4 = this.createColumnGroup(3, 7, RowWinInspector);

    rows1.inspect()
      ? (this.winnerNumber = rows1.inspect())
      : rows2.inspect()
      ? (this.winnerNumber = rows2.inspect())
      : rows3.inspect()
      ? (this.winnerNumber = rows3.inspect())
      : rows4.inspect()
      ? (this.winnerNumber = rows4.inspect())
      : (this.winnerNumber = this.winnerNumber);
  }

  checkForDiagonalWin() {
    let diagonals1 = this.createColumnGroup(0, 4, DiagonalWinInspector);
    let diagonals2 = this.createColumnGroup(1, 5, DiagonalWinInspector);
    let diagonals3 = this.createColumnGroup(2, 6, DiagonalWinInspector);
    let diagonals4 = this.createColumnGroup(3, 7, DiagonalWinInspector);

    diagonals1.inspect()
      ? (this.winnerNumber = diagonals1.inspect())
      : diagonals2.inspect()
      ? (this.winnerNumber = diagonals2.inspect())
      : diagonals3.inspect()
      ? (this.winnerNumber = diagonals3.inspect())
      : diagonals4.inspect()
      ? (this.winnerNumber = diagonals4.inspect())
      : (this.winnerNumber = this.winnerNumber);
  }

  checkForWinConditions() {
    this.checkForTie();
    this.checkForColumnWin();
    this.checkForRowWin();
    this.checkForDiagonalWin();
  }

  getTokenAt(colIndex, rowIndex) {
    return this.columns[colIndex].getIndexAt(rowIndex);
  }

  isColumnFull(index) {
    return this.columns[index].isFull();
  }
}
