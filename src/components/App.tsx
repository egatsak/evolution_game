import { useCallback, useEffect, useState } from "react";
import { BoardComponent } from "./widgets/BoardComponent/BoardComponent";

import "./App.scss";
import { Board } from "../models/Board";

function App() {
  const [board, setBoard] = useState(new Board());

  const restart = useCallback(() => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.initGame();
    setBoard(newBoard);
  }, []);

  useEffect(() => {
    restart();
  }, [restart]);

  return (
    <div className="App">
      <BoardComponent board={board} setBoard={setBoard} />
    </div>
  );
}

export default App;
