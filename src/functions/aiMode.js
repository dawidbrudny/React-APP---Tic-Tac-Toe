export const aiMode = (emptyCells, board, winningCombinations) => {
    const cells = document.querySelectorAll('div.cell');

    for ( let i = 0; i <= winningCombinations.length-1; i++) {
        const [posA, posB, posC] = winningCombinations[i];
        const value1 = board[posA];
        const value2 = board[posB];
        const value3 = board[posC];

        if (value1 === value2 && value1 !== '' && value3 === '') {
            board[posC] = 'o';
            cells[posC].style.color = 'blue';
            return
        }

        if (value1 === value3 && value1 !== '' && value2 === '') {
            board[posB] = 'o';
            cells[posB].style.color = 'blue';
            return
        }

        if (value2 === value3 && value2 !== '' && value1 === '') {
            board[posA] = 'o';
            cells[posA].style.color = 'blue';
            return
        }
    }

    const randomCell = Math.floor(Math.random() * emptyCells.length);
    const emptyCell = emptyCells[randomCell];
    cells[emptyCell].style.color = 'blue';
    board[emptyCell] = 'o';
}