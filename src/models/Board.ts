import { Cell } from "./Cell";
import { Checker } from "./Checker";
import { CELL_QUANTITY, Colors } from "./constants";
import { Dice } from "./Dice";

export class Board {
  cells: Cell[] = [];
  thrownWhiteCheckers = 0;
  thrownBlackCheckers = 0;
  dice: [Dice, Dice] = [new Dice(), new Dice()];
  isFirstMove = true;
  diceThrownValues: number[] = [];
  initialPossibleMoves: number[] = [];
  possibleMoves: number[] = [];

  public getCopyBoard() {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.thrownWhiteCheckers = this.thrownWhiteCheckers;
    newBoard.thrownBlackCheckers = this.thrownBlackCheckers;
    newBoard.dice = this.dice;
    newBoard.isFirstMove = this.isFirstMove;
    newBoard.diceThrownValues = this.diceThrownValues;
    newBoard.possibleMoves = this.possibleMoves;
    newBoard.initialPossibleMoves = this.initialPossibleMoves;

    return newBoard;
  }

  public initCells() {
    for (let i = 1; i <= CELL_QUANTITY; i++) {
      this.cells.push(new Cell(i, this));
    }
  }

  public initGame() {
    const whiteStartCell = this.cells.find((cell) => cell.index === 1);
    const blackStartCell = this.cells.find((cell) => cell.index === 13);

    if (whiteStartCell) {
      for (let i = 0; i < 15; i++) {
        whiteStartCell.addChecker(new Checker(Colors.WHITE, whiteStartCell));
      }
    }

    if (blackStartCell) {
      for (let i = 0; i < 15; i++) {
        blackStartCell.addChecker(new Checker(Colors.BLACK, blackStartCell));
      }
    }

    do {
      this.throwDice();
    } while (this.dice[0].value === this.dice[1].value);

    if (this.dice[0].value! > this.dice[1].value!) {
      // 1st players moves
    } else {
      //2nd player moves
    }
  }

  throwDice() {
    this.dice.forEach((dice) => dice.throw());
    const firstDiceValue = this.dice[0].value as number;
    const secondDiceValue = this.dice[1].value as number;

    if (firstDiceValue === secondDiceValue) {
      for (let i = 0; i < 4; i++) {
        this.diceThrownValues.push(firstDiceValue);
      }
    } else {
      this.diceThrownValues.push(firstDiceValue);
      this.diceThrownValues.push(secondDiceValue);
    }

    this.initialPossibleMoves = Board.uniqueSubsetSums(this.diceThrownValues);
    this.possibleMoves = [...this.initialPossibleMoves];
    return this.diceThrownValues;
  }

  makeMove() {
    const diceThrownValues = this.throwDice();
  }

  public highlightCells(selectedCell: Cell | null) {
    const topChecker = selectedCell?.checkers.at(-1);

    for (const cell of this.cells) {
      cell.available = !!topChecker?.canMove(cell, this.possibleMoves);
    }
  }

  public moveToNextPlayer() {
    this.throwDice();
  }

  public static uniqueSubsetSums(numbers: number[]) {
    const result = [0];

    for (let i = 0; i < numbers.length; i++) {
      const v = result.length;
      for (let j = 0; j < v; j++) {
        result.push(result[j] + numbers[i]);
      }
    }
    return Array.from(new Set(result.filter((item) => item !== 0)));
  }

  public recalculatePossibleMoves(distance: number, moves: number[]): number[] {
    if (Math.min(...moves) === distance) {
      const max = Math.max(...moves);
      return moves.filter((move) => move !== distance && move !== max);
    }
    return moves.map((move) => move - distance).filter((move) => move > 0);
  }
}
