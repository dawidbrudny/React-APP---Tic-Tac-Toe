export const updateEmptyCells = (board) => {
    const emptyCells = Object.entries(board).filter(cellEntry => cellEntry[1] === '').map(cellEntry => cellEntry[0]);
    return emptyCells
}