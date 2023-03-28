import { Board } from "./Board";

describe("BOARD => uniqueSubsetSums", () => {
  test("returns correct subset sums for 2 different dice values", () => {
    expect(Board.uniqueSubsetSums([1, 2])).toEqual([1, 2, 3]);
    expect(Board.uniqueSubsetSums([5, 6])).toEqual([5, 6, 11]);
  });

  test("returns correct subset sums for 4 equal dice values", () => {
    expect(Board.uniqueSubsetSums([2, 2, 2, 2])).toEqual([2, 4, 6, 8]);
    expect(Board.uniqueSubsetSums([5, 5, 5, 5])).toEqual([5, 10, 15, 20]);
  });
});

describe("BOARD => recalculatePossibleMoves", () => {
  let board: Board;

  beforeEach(() => {
    board = new Board();
    board.initCells();
  });

  test("returns correct moves for ordinary move", () => {
    const possibleMoves = [3, 5, 8];
    const move = 5;
    expect(board.recalculatePossibleMoves(move, possibleMoves)).toEqual([3]);
  });

  test("returns correct moves for a full points move", () => {
    const possibleMoves = [3, 5, 8];
    const move = 8;
    expect(board.recalculatePossibleMoves(move, possibleMoves)).toEqual([]);
  });

  test("returns correct moves for a double", () => {
    const possibleMoves = [2, 4, 6, 8];
    const move = 6;
    expect(board.recalculatePossibleMoves(move, possibleMoves)).toEqual([2]);
  });

  test("returns correct moves for a double #2", () => {
    const possibleMoves = [2, 4, 6, 8];
    const move = 2;
    expect(board.recalculatePossibleMoves(move, possibleMoves)).toEqual([2, 4, 6]);
  });

  test("returns correct moves for a double for a full points move", () => {
    const possibleMoves = [2, 4, 6, 8];
    const move = 8;
    expect(board.recalculatePossibleMoves(move, possibleMoves)).toEqual([]);
  });
});
