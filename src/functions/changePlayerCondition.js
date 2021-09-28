export const changePlayerCondition = (board, index, play) => {
    if (board[index] === '' && play) {
        return true
    } else return false
}