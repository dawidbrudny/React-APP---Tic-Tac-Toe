export const endGameMessage = (value, draw, pvp) => {
    if (value && pvp) return `wygrana dla ${value === 'x' ? 'x' : 'o'}. jeszcze raz?`
    else if (value && !pvp) return `${value === 'x' ? 'wygrana!' : 'przegrana...'} jeszcze raz?`;

    if (draw) return `remis. jeszcze raz?`
}