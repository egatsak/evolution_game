import { Board } from "./Board";
import { Cell } from "./Cell";
import { Checker } from "./Checker";
import { Colors } from "./constants";

describe("CELL => getDistance", () => {
  let board: Board;

  beforeEach(() => {
    board = new Board();
    board.initCells();
  });

  test("gets white checker distance correctly", () => {
    const cell = board.cells.find((cell) => cell.index === 1) as Cell;

    cell!.color = Colors.WHITE;

    const target = board.cells.find((cell) => cell.index === 5) as Cell;

    expect(cell.getDistance(target)).toEqual(4);
  });

  test("gets black checker distance correctly", () => {
    const cell = board.cells.find((cell) => cell.index === 1) as Cell;

    cell!.color = Colors.BLACK;

    const target = board.cells.find((cell) => cell.index === 6) as Cell;

    expect(cell.getDistance(target)).toEqual(5);
  });

  test("gets black checker distance correctly with move to lower deck", () => {
    const cell = board.cells.find((cell) => cell.index === 20) as Cell;

    cell!.color = Colors.BLACK;

    const target = board.cells.find((cell) => cell.index === 3) as Cell;

    expect(cell.getDistance(target)).toEqual(7);
  });
});

describe("CELL => getTargetIndex", () => {
  let board: Board;

  beforeEach(() => {
    board = new Board();
    board.initCells();
  });

  test("gets target index correctly for white checker move", () => {
    const initialIndex = 1;
    const cell = board.cells.find((cell) => cell.index === initialIndex) as Cell;

    cell.color = Colors.WHITE;
    const distance = 3;

    const target = board.cells.find((cell) => cell.index === initialIndex + distance) as Cell;

    expect(cell.getTargetIndex(distance)).toEqual(target.index);
  });

  test("gets target index correctly for black checker move", () => {
    const initialIndex = 13;
    const cell = board.cells.find((cell) => cell.index === initialIndex) as Cell;

    cell.color = Colors.BLACK;
    const distance = 3;

    const target = board.cells.find((cell) => cell.index === initialIndex + distance) as Cell;

    expect(cell.getTargetIndex(distance)).toEqual(target.index);
  });

  test("gets target index correctly for black checker move with shift to lower deck", () => {
    const initialIndex = 21;
    const cell = board.cells.find((cell) => cell.index === initialIndex) as Cell;

    cell.color = Colors.BLACK;
    const distance = 5;

    const target = board.cells.find((cell) => cell.index === initialIndex + distance - 24) as Cell;

    expect(cell.getTargetIndex(distance)).toEqual(target.index);
  });
});

describe("CELL => addChecker", () => {
  let board: Board;
  let checker: Checker;

  beforeEach(() => {
    board = new Board();
    board.initCells();
    checker = new Checker(Colors.BLACK, board.cells[0]);
    checker.cell = null;
  });

  test("adds checker to empty cell correctly", () => {
    const cell = board.cells.find((cell) => cell.index === 5) as Cell;

    expect(cell.color).toBe(null);

    cell.addChecker(checker);

    expect(cell.checkers).toHaveLength(1);
    expect(cell.color).toEqual(checker.color);
    expect(checker.cell).toEqual(cell);
  });

  test("adds black checker to black cell correctly", () => {
    const cell = board.cells.find((cell) => cell.index === 5) as Cell;

    cell.addChecker(checker);

    expect(cell.checkers).toHaveLength(1);

    const secondChecker = new Checker(Colors.BLACK, board.cells[0]);
    cell.addChecker(secondChecker);
    expect(secondChecker.cell).toEqual(cell);
    expect(cell.checkers).toHaveLength(2);
  });

  test("doesn't add white checker to the cell with black checker", () => {
    const cell = board.cells.find((cell) => cell.index === 5) as Cell;

    cell.addChecker(checker);
    const secondChecker = new Checker(Colors.WHITE, board.cells[0]);
    cell.addChecker(secondChecker);

    expect(secondChecker.cell).toEqual(board.cells[0]);
    expect(cell.checkers).toHaveLength(1);
  });
});

describe("CELL => removeChecker", () => {
  let board: Board;

  beforeEach(() => {
    board = new Board();
    board.initCells();
  });

  test("removes checker from the cell correctly", () => {
    const cell = board.cells.find((cell) => cell.index === 5) as Cell;

    const checker = new Checker(Colors.WHITE, board.cells[0]);
    const checker1 = new Checker(Colors.WHITE, board.cells[0]);

    cell.addChecker(checker);
    cell.addChecker(checker1);

    cell.removeChecker();

    expect(cell.checkers).toHaveLength(1);
    expect(cell.color).toBe(checker.color);

    cell.removeChecker();

    expect(cell.checkers).toHaveLength(0);
    expect(cell.color).toBe(null);
  });

  test("does nothing with empty cell", () => {
    const cell = board.cells.find((cell) => cell.index === 5) as Cell;

    expect(cell.checkers).toHaveLength(0);

    cell.removeChecker();

    expect(cell.checkers).toHaveLength(0);
  });
});
