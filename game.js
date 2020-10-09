import Column from "column.js";

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

  getTokenAt(columnIndex, rowIndex) {
    return this.columns[columnIndex].getTokenAt(rowIndex);
  }
}
