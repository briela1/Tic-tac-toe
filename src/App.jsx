import { useState } from 'react'


export const TURNS = { // turnos
  X: 'X',
  O: 'O'
}


const Square = ({children, updateBoard, index}) =>{
  return (
    <div className='square'>
      {children}
    </div>
  )
}
function App() {
  const [board, setBorad] = useState(
    Array(9).fill(null)
  )
  const [turn, setTurn] = useState(TURNS.X)

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
            
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
    </main>
  )
}

export default App
