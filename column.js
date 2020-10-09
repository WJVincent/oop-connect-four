<<<<<<< HEAD
import Game from "./game";

export default class Column {
  constructor() {
    this.columnArr = [null, null, null, null, null, null];
  }
  add(currentPlayer) {
    for (let i = this.columnArr.length - 1; i >= 0; i--) {
      let currPos = this.columnArr[i];
      if ((currPos = null)) {
        currPos = currentPlayer;
      }
=======
export default class Column{
    constructor(){
        this.colArr = [null, null, null, null, null, null]
    }
    add(currentPlayer){
        for(let i = this.colArr.length-1; i >= 0; i --){
            let currPos = this.colArr[i];
            if (currPos = null){
                currPos = currentPlayer;
            } else {
                this.isFull()
            }
        }
    }
    isFull(){
        if (this.colArr.includes(null) !== false) return true;
    }
    getIndexAt(index){
        return this.colArr[index]
>>>>>>> 893b0c915c57147a5cd4607d0fec4ec11d46184b
    }
  }
  getTokenAt(index) {
    return this.columnArr[index];
  }
}
