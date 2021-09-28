export const clearStyles = () => {
    const board = document.querySelectorAll('div.cell');

    board.forEach(cell => cell.style.color = '')
}