import { FC, useEffect, useState, useCallback } from "react";
//import { useTranslation } from "react-i18next";
import { classNames } from "../../../lib/classNames/classNames";
import { Board } from "../../../models/Board";
import { Cell } from "../../../models/Cell";
import styles from "./BoardComponent.module.scss";
import { CellComponent } from "./CellComponent/CellComponent";

interface BoardComponentProps {
  board: Board;
  setBoard: (board: Board) => void;
  className?: string;
}

export const BoardComponent: FC<BoardComponentProps> = (props) => {
  const { className, board, setBoard } = props;
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  // const { t } = useTranslation();

  const updateBoard = useCallback(() => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }, [board, setBoard]);

  const highlightCells = useCallback(() => {
    board.highlightCells(selectedCell);
    updateBoard();
  }, [board, selectedCell, updateBoard]);

  function clickHandler(cell: Cell) {
    const distance = selectedCell?.getDistance(cell) as number;
    if (selectedCell && selectedCell !== cell && !!selectedCell.checkers.at(-1)?.canMove(cell, distance)) {
      selectedCell.moveChecker(cell, distance);
      //swapPlayer();
      setSelectedCell(null);
      updateBoard();
    } else {
      if (!cell.isEmpty()) {
        setSelectedCell(cell);
      }
    }
  }

  useEffect(() => {
    console.log(board);
  }, [board]);

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  return (
    <div className={classNames(styles.board, {}, [className])}>
      {board.cells.map((cell) => (
        <CellComponent
          key={cell.index}
          cell={cell}
          isSelected={cell.index === selectedCell?.index}
          onClick={clickHandler}
        />
      ))}
    </div>
  );
};
