export const checkCell = (e, board, index, currentPlayer, play, pvp) => {   
    if (board[index] === '' && currentPlayer && play) {
        board[index] = 'x';
    }
    
    if (board[index] === '' && !currentPlayer && play && pvp) {
        e.target.style.color = 'blue';
        board[index] = 'o';
    }
}