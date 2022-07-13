import { useState } from "react";
import Board from "./components/Board";
import Restart from "./components/Restart";

function App() {
  
 const [square, setSquares] = useState(
    {
    history: [
     {
       squares: Array(9).fill(null),
     },
    ],
    xIsNext: true,
    stepNumber : 0,
    }
)


const handleClick = (i) => {
  // ensures that if we go back a step and made a new move from there. it will remove all the "future" history that would have been incorrect.
  const history = square.history.slice(0, square.stepNumber + 1);
  const current = history[history.length - 1];
  // we will create a copy of the array using slice()
  const squares = current.squares.slice();
  if (calculateWinner(squares) || squares[i]) {
    return;
  }
  squares[i] = square.xIsNext ? "X" : "O";
  //we use concat() instead of push() as it doesn't mutate the orriginal array
  setSquares({ 
    history: history.concat([{
      squares: squares,
    }]),
    stepNumber: history.length,
    xIsNext: !square.xIsNext 
  });
}

const jumpTo = () => {
 setSquares({
  history: [
   {
     squares: Array(9).fill(null),
   },
  ],
  xIsNext: true,
  stepNumber : 0,
  })
}
  
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return (squares[a]);
      }
    }
    return null;
  };

  const history = square.history;
  const step = square.stepNumber
  const current = history[step];
  const winner = calculateWinner(current.squares);
  let status;
  if (winner){
    status = 'Winner is ' + winner;
  }else{
    status = 'Next player: ' + (square.xIsNext ? 'X' : 'O')
  }

  return (
    
    <div className="game">
    <div className="game-board">
      <Board 
      squares={current.squares}
      onClick={(i) => handleClick(i)}/>
    </div>
    <div className="game-info">
      <div>{ status }</div>
      <ol><Restart onClick={() => jumpTo()}/></ol>
    </div>
  </div>
  );
}

export default App;
