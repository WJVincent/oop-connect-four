<<<<<<< HEAD
import Column from "column.js";

=======
import Column from './column.js'
>>>>>>> 893b0c915c57147a5cd4607d0fec4ec11d46184b
export default class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayer = 1;
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
    return `${this.player1} vs. ${this.player2}`;
  }

  playInColumn(columnIndex) {
    this.columns[columnIndex].add(this.currentPlayer);
    this.currentPlayer === 1
      ? (this.currentPlayer = 2)
      : (this.currentPlayer = 1);
  }
<<<<<<< HEAD

  getTokenAt(columnIndex, rowIndex) {
    return this.columns[columnIndex].getTokenAt(rowIndex);
=======
  getTokenAt(colIdx, rowIdx){
      return this.columns[colIdx].getIndexAt(rowIdx);
>>>>>>> 893b0c915c57147a5cd4607d0fec4ec11d46184b
  }
}
