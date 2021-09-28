export const checkWinner = (winningCombinations, board) => {
    for (let i = 0; i <= winningCombinations.length-1; i++) {
      const [posA, posB, posC] = winningCombinations[i];
      const value1 = board[posA];
      const value2 = board[posB];
      const value3 = board[posC];

      if (value1 !== '' && (value1 === value2 && value1 === value3)) {
        return value1
      }
    }
  }