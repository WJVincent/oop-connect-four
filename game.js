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
    this.columns = [
      new Column(),
      new Column(),
      new Column(),
      new Column(),
      new Column(),
      new Column(),
      new Column(),
    ];
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

  checkForRowWin() {
    let group1 = this.columns.slice(0, 4);
    let group2 = this.columns.slice(1, 5);
    let group3 = this.columns.slice(2, 6);
    let group4 = this.columns.slice(3, 7);

    let rows1 = new RowWinInspector(group1);
    let rows2 = new RowWinInspector(group2);
    let rows3 = new RowWinInspector(group3);
    let rows4 = new RowWinInspector(group4);

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
    let group1 = this.columns.slice(0, 4);
    let group2 = this.columns.slice(1, 5);
    let group3 = this.columns.slice(2, 6);
    let group4 = this.columns.slice(3, 7);

    let diagonals1 = new DiagonalWinInspector(group1);
    let diagonals2 = new DiagonalWinInspector(group2);
    let diagonals3 = new DiagonalWinInspector(group3);
    let diagonals4 = new DiagonalWinInspector(group4);

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
