import { FC } from "react";
import { classNames } from "../../../../lib/classNames/classNames";
import { Cell } from "../../../../models/Cell";
//import { useTranslation } from "react-i18next";

//import { classNames } from "shared/lib/classNames/classNames";
import styles from "./CellComponent.module.scss";

interface CellComponentProps {
  cell: Cell;
  onClick: (cell: Cell) => void;
  className?: string;
  isSelected?: boolean;
}

export const CellComponent: FC<CellComponentProps> = (props) => {
  const { className, cell, isSelected, onClick } = props;
  //const { t } = useTranslation();

  return (
    <div
      className={classNames(styles["cell-component"], { [styles.selected]: isSelected }, [className])}
      onClick={() => onClick(cell)}
    >
      {cell.index}
      <div>{cell.checkers.length}</div>
      {cell.available && <div className={styles.available} />}
    </div>
  );
};
