import { WINNER_COMBOS } from "../constants.js"

export const checkWinner = (boardToCheck) => {
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

 // newBoard = ['x', 'o', 'x', null, null, null, null, 'o', null] 
  // 9 posiciones llenas en tablero -> fin del juego
  export const checkEndGame = (newBoard) => {
    // revisamos si hay un empate, si no hay más espacios vacíos en el tablero
    //si todas las squares (posiciones de array newBoard) no son null. true -> game over
    return newBoard.every((square) => square !== null)
  }
