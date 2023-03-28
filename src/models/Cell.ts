import { Board } from "./Board";
import { Checker } from "./Checker";
import { BLACK_HEAD_INDEX, Colors, WHITE_HEAD_INDEX } from "./constants";

export class Cell {
  readonly index: number;
  checkers: Checker[] = [];
  color: Colors | null = null;
  board: Board;
  available = false;

  constructor(index: number, board: Board) {
    this.index = index;
    this.board = board;
  }

  isEmpty(): boolean {
    return this.checkers.length === 0;
  }

  isHead(): boolean {
    if (this.color === Colors.BLACK && this.index === BLACK_HEAD_INDEX) {
      return true;
    }

    if (this.color === Colors.WHITE && this.index === WHITE_HEAD_INDEX) {
      return true;
    }
    return false;
  }

  addChecker(checker: Checker): void {
    if (!this.color || this.color === checker.color) {
      this.checkers.push(checker);
      this.color = checker.color;
      checker.cell = this;
    }
  }

  removeChecker() {
    if (!this.isEmpty()) {
      const checker = this.checkers.pop() as Checker;
      checker.cell = null;
      if (this.isEmpty()) {
        this.color = null;
      }
      return checker;
    }
  }

  getDistance(target: Cell): number {
    if (this.color === Colors.WHITE) {
      return target.index - this.index;
    } else {
      if (this.index >= 13 && target.index <= 12) {
        return target.index - this.index + 24;
      } else {
        return target.index - this.index;
      }
    }
  }

  getTargetIndex(distance: number): number {
    if (this.color === Colors.WHITE) {
      return this.index + distance;
    } else {
      if (this.index >= 13 && this.index + distance >= 24) {
        return this.index + distance - 24;
      } else {
        return this.index + distance;
      }
    }
  }

  getTargetCell(distance: number): Cell | null {
    const index = this.getTargetIndex(distance);
    return this.board.cells.find((cell) => cell.index === index) || null;
  }

  moveChecker(target: Cell, distance: number) {
    if (this.board.diceThrownValues.length > 0) {
      if (!this.isEmpty() && this.checkers.at(-1)?.canMove(target, distance)) {
        const checker = this.removeChecker() as Checker;
        target.addChecker(checker);
        checker.doneDistance += distance;
        const restMoves = this.board.recalculatePossibleMoves(distance, this.board.possibleMoves);
        this.board.possibleMoves = restMoves;
      }
    }
  }
}
