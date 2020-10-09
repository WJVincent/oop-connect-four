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
    if (this.winnerNumber === 3) {
      return `${this.player1} ties with ${this.player2}`;
    } else if (this.winnerNumber === 2) {
      return `${this.player2} Wins!`;
    } else if (this.winnerNumber === 1) {
      return `${this.player1} Wins!`;
    } else {
      return `${this.player1} vs. ${this.player2}`;
    }
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

    if (rows1.inspect()) {
      this.winnerNumber = rows1.inspect();
    }

    if (rows2.inspect()) {
      this.winnerNumber = rows2.inspect();
    }

    if (rows3.inspect()) {
      this.winnerNumber = rows3.inspect();
    }

    if (rows4.inspect()) {
      this.winnerNumber = rows4.inspect();
    }
  }

  checkForDiagonalWin() {
    let group1 = this.columns.slice(0, 4);
    let group2 = this.columns.slice(1, 5);
    let group3 = this.columns.slice(2, 6);
    let group4 = this.columns.slice(3, 7);

    let rows1 = new DiagonalWinInspector(group1);
    let rows2 = new DiagonalWinInspector(group2);
    let rows3 = new DiagonalWinInspector(group3);
    let rows4 = new DiagonalWinInspector(group4);

    if (rows1.inspect()) {
      this.winnerNumber = rows1.inspect();
    }

    if (rows2.inspect()) {
      this.winnerNumber = rows2.inspect();
    }

    if (rows3.inspect()) {
      this.winnerNumber = rows3.inspect();
    }

    if (rows4.inspect()) {
      this.winnerNumber = rows4.inspect();
    }
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
