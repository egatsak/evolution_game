import { Board } from "./Board";
import { Cell } from "./Cell";
import { Colors } from "./constants";
import { Checker } from "./Checker";

describe("CHECKER => canMove", () => {
  let board: Board;

  beforeEach(() => {
    board = new Board();
    board.initCells();
  });

  /*   test("gets black checker distance correctly", () => {
    const cell = board.cells.find((cell) => cell.index === 1) as Cell;

    cell!.color = Colors.BLACK;

    const target = board.cells.find((cell) => cell.index === 5) as Cell;

    expect(cell.getDistance(target)).toEqual(4);
  }); */
});
