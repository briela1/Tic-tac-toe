import { useState } from 'react'


export const TURNS = { // turnos
  X: 'X',
  O: 'O'
}


const Square = ({children, updateBoard, index, isSelected}) =>{

  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  const [turn, setTurn] = useState(TURNS.X)
    // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
      // revisamos todas las combinaciones ganadoras para ver si X u O ganó
      for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo  //e.g. [0, 3, 6]
        if (
          boardToCheck[a] && // posición 0 -> x u o
          boardToCheck[a] === boardToCheck[b] && //0 y 3 -> x->x  u o->o  Tienen lo mismo?
          boardToCheck[a] === boardToCheck[c] // 0 y 6  son iguales -> 3 en raya
        ) {
          return boardToCheck[a] //x u o, el ganador
        }
      }
      // si no hay ganador
      return null
    }

  const updateBoard = (index) => {
    // no actualizamos esta posición si ya tiene algo O si hay un ganador ya
    if (board[index] || winner) return 
    // actualizar el tablero
    const newBoard = [...board] //evita modificar original
    newBoard[index] = turn
    setBoard(newBoard) //Es ASINCRONA
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // revisar si hay ganador
    const newWinner = checkWinner(newBoard)//Por parametro le paso el valor correcto, último tablero. Solución a asincronismo. 
    if (newWinner) {
      
      setWinner(newWinner)
      // setWinner((prevWinner) => {
      //   console.log(`Ganador: ${newWinner}, el anterior era ${prevWinner}`)
      //   return newWinner
      // })
      //Tienes acceso al valor anterior, pero no puedes hacer un async await
      //no devuelve una promesa
    }
  }

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
                updateBoard={updateBoard}
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
