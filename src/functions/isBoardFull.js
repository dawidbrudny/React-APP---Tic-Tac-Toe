export const isBoardFull = board => {
    return board.every(field => field !== '')
}