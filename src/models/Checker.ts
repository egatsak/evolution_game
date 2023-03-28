import { Cell } from "./Cell";
import { Colors } from "./constants";

export class Checker {
  readonly color: Colors;
  cell: Cell | null;
  doneDistance = 0;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
  }

  canMove(target: Cell, distances?: number[] | number): boolean {
    if (!this.cell || (target.color && target.color !== this.color)) {
      return false;
    }
    const dist = this.cell!.getDistance(target);

    if (this.doneDistance + dist >= 24) {
      return false;
    }
    // handle intermediate moves!!

    if (this.cell.board.possibleMoves.length > 2 && dist > 6) {
      const mutablePossibleMoves = [...this.cell.board.possibleMoves];
      const twoLeastMoves = mutablePossibleMoves.sort((a, b) => a - b).slice(0, 2);
      // console.log(this.cell.getTargetCell(twoLeastMoves[0])?.color);
      //console.log(this.cell.getTargetCell(twoLeastMoves[1])?.color);

      if (
        this.cell.getTargetCell(twoLeastMoves[0])?.color &&
        this.cell.getTargetCell(twoLeastMoves[0])?.color !== this.color &&
        this.cell.getTargetCell(twoLeastMoves[1])?.color &&
        this.cell.getTargetCell(twoLeastMoves[1])?.color !== this.color
      ) {
        return false;
      }
    }

    if (this.cell.board.possibleMoves.includes(dist)) {
      return true;
    }

    return false;
  }

  isInHouse(): boolean {
    if (this.cell) {
      if (this.color === Colors.BLACK) {
        return this.cell.index >= 19 && this.cell.index <= 24;
      } else {
        return this.cell.index >= 7 && this.cell.index <= 12;
      }
    }
    return false;
  }
}
