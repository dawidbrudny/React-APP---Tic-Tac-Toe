import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Board from '../components/Board';
import CurrentPlayerInfo from '../components/CurrentPlayerInfo';
import Game from '../components/Game';
import PlayAgainButton from '../components/PlayAgainButton';

let board;
let currentPlayer = true;
let play = false;
let pvp = true;
let isModeSelected = false;
let value = 'x';
let draw = false;
const square = 'krzyżyk';
const circle = 'kółko';

afterEach(() => {
    board = ['','','','','','','','',''];
    currentPlayer = true;
    play = false;
    pvp = true;
    isModeSelected = false;
    value = 'x';
    draw = false;
})

const checkCell = (cell, currentPlayer) => {
        if (currentPlayer) {
            cell.innerHTML = 'x';
            currentPlayer = !currentPlayer;
        }
        else {
            cell.innerHTML = 'o';
            currentPlayer = !currentPlayer;
        }
}

describe('(1) Tests for "Game" component before start playing', () => {
    it('Display components in "Game" component (select mode information, board and two buttons of mode selection (also click on cell gives no value because of not selection the mode)', () => {
        const { container, getByText, getByRole } = render(<Game />);

        const selectModeInfo = getByText(/wybierz tryb/i);
        const pvpModeButton = getByRole('button', {name: /pvp/i});
        const aiModeButton = getByRole('button', {name: /komputer/i});
        const board = container.querySelector('.table');
        const cells = container.querySelectorAll('.cell');

        expect(board).toBeTruthy();
        expect(cells).toBeTruthy();
        expect(cells.length).toEqual(9);
        expect(selectModeInfo).toBeTruthy();
        expect(pvpModeButton).toBeTruthy();
        expect(aiModeButton).toBeTruthy();

        cells.forEach(cell => {
            expect(cell.innerHTML).toBe('');
            fireEvent.click(cell);
            checkCell(cell, currentPlayer);
        });

        setTimeout(() => {
            cells.forEach(cell => {
                expect(cell.innerHTML).toBe('');
                expect(checkCell).toBeCalledTimes(9);
            })
        })
    });

    it('Click PVP Mode Button select the mode and display information about who is current player', () => {
        const { container, getByRole, getByTestId } = render(<Game />);

        const pvpModeButton = getByRole('button', {name: /pvp/i});
        const aiModeButton = getByRole('button', {name: /komputer/i});
        const currentPlayerInfo = getByTestId('current-player-info');

        fireEvent.click(pvpModeButton);
        
        setTimeout(() => {
            expect(currentPlayerInfo.innerHTML).toBe(square);
            expect(pvpModeButton).toBeFalsy();
            expect(aiModeButton).toBeFalsy();
        })
    });

    it('Click AI Mode Button select the mode and display information about that player is playing against computer', () => {
        const { container, getByRole, getByTestId } = render(<Game />);

        const pvpModeButton = getByRole('button', {name: /pvp/i});
        const aiModeButton = getByRole('button', {name: /komputer/i});
        const currentPlayerInfo = getByTestId('current-player-info');

        fireEvent.click(aiModeButton);
        
        setTimeout(() => {
            expect(currentPlayerInfo.innerHTML).toBe(/gra z komputerem/i);
            expect(pvpModeButton).toBeFalsy();
            expect(aiModeButton).toBeFalsy();
        })
    });
});

describe('(2) Tests for "Game" component after game', () => {
    it('Display button with possibility to play again and also display information about winner', () => {
        play = false;
        isModeSelected = true;

        const { getByRole } = render(<PlayAgainButton value={value} draw={draw} pvp={pvp}/>);
        const playAgainButton = getByRole('button', {name: `wygrana dla ${value}. jeszcze raz?`});

        expect(playAgainButton).toBeTruthy();
        expect(playAgainButton.innerHTML).toBeTruthy();
    });

    it('Disiplay information about that game is over and block possibility to checking cells on board', () => {
        play = false;
        isModeSelected = true;
        board = ['x','x','x','x','x','x','x','x','x'];

        const checkCellWithOneChar = cell => {
            if (play) return cell.innerHTML = 'o';
        }

        const { getByText } = render(<CurrentPlayerInfo mode={isModeSelected} play={play} />);
        const { container } = render(<Board board={board} />);

        const endGameInfo = getByText(/koniec gry/i);
        const cells = container.querySelectorAll('.table>.cell');

        expect(endGameInfo).toBeTruthy();
        expect(cells).toBeTruthy();
        expect(cells.length).toEqual(9);

        cells.forEach(cell => {
            fireEvent.click(cell);
            expect(cell.innerHTML).toBe('x');
            checkCellWithOneChar(cell);
        })

        setTimeout(() => {
            cells.forEach(cell => {
                expect(cell.innerHTML).toBe('x');
                expect(checkCellWithOneChar).toBeCalledTimes(9);
            })
        })
    })
});

describe('(3) Tests for "Board" component', () => {
    
    it('check cell with square when value of the current player is true (also switch player and change information about who is current player)', () => {
        play = true;
        pvp = true;
        isModeSelected = true;

        const { container } = render(<Board board={board} click={checkCell} />);
        const { getByTestId } = render(<CurrentPlayerInfo currentPlayer={currentPlayer} pvp={pvp} mode={isModeSelected} play={play} square={square} circle={circle} />);

        const cell = container.querySelector('div.cell');
        const currentPlayerInfo = getByTestId('current-player-info').innerHTML;

        expect(currentPlayerInfo).toBe(square);

        fireEvent.click(cell);
        checkCell(cell, currentPlayer);

        setTimeout(() => {
            expect(cell.innerHTML).toBe('x');
            expect(currentPlayerInfo).toBe(circle)
        })
    })
    
    it('Click on every cell trigger checkCell function (check cell with char depending by current player and also give some information about when game is over)', () => {
        const { container } = render(<Board board={board} click={checkCell} />);
        const { getByTestId } = render(<CurrentPlayerInfo currentPlayer={currentPlayer} pvp={pvp} mode={isModeSelected} />);

        const cells = container.querySelectorAll('div.cell');
        const currentPlayerInfo = getByTestId('current-player-info').innerHTML;

        cells.forEach(cell => {
        fireEvent.click(cell, currentPlayer);
        checkCell(cell);
        })

        setTimeout(() => {
        expect((cells[0] && cells[2] && cells[3] && cells[5] && cells[6] && cells[8]).innerHTML).toBe('x');
        expect((cells[1] && cells[4] && cells[7]).innerHTML).toBe('o');
        expect(checkCell).toBeCalledTimes(9);
        expect(currentPlayerInfo).toBe(/koniec gry/i);
        })
    })
})