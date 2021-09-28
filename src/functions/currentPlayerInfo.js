export const currentPlayerInfo = (play, currentPlayer, square, circle, pvp, mode) => {
    if (!mode) return 'wybierz tryb';
    if (play && pvp) return currentPlayer ? square : circle;
    else if (play && !pvp) return 'gra z komputerem';
    else return 'koniec gry';
}