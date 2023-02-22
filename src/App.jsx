import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square.jsx'
import { TURNS } from './constants.js'
import { checkWinner, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })
    
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

   resetGameStorage()
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
    // guardar aquí la partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    // revisar si hay ganador
    const newWinner = checkWinner(newBoard)//Por parametro le paso el valor correcto, último tablero. Solución a asincronismo. 
    if (newWinner) {
      confetti()
      setWinner(newWinner)
      // setWinner((prevWinner) => {
      //   console.log(`Ganador: ${newWinner}, el anterior era ${prevWinner}`)
      //   return newWinner
      // })
      //Tienes acceso al valor anterior, pero no puedes hacer un async await
      //no devuelve una promesa
    } else if (checkEndGame(newBoard)) { //si chequeo tablero y no hay ganador
      setWinner(false) // empate
    }
  }

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
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

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
