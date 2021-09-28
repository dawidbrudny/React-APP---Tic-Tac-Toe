import React, { Component, Fragment } from 'react';

import { aiMode } from '../functions/aiMode';
import { checkCell } from '../functions/checkCell';
import { checkWinner } from '../functions/checkWinner';
import { clearStyles } from '../functions/clearStyles';
import { isBoardFull } from '../functions/isBoardFull';
import { changePlayerCondition } from '../functions/changePlayerCondition';
import { updateEmptyCells } from '../functions/updateEmptyCells';

import Board from './Board';
import CurrentPlayerInfo from './CurrentPlayerInfo';
import PlayAgainButton from './PlayAgainButton';
import ChooseModeSection from './ChooseModeSection';
import { chooseMode } from '../functions/chooseMode';

class Game extends Component {

    static defaultProps = {
        square: 'Krzyżyk',
        circle: 'Kółko',
        winningCombinations: [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
          ]
    }

    state = { 
        board: ['','','','','','','','',''],
        emptyCells: null,
        currentPlayer: true,
        play: false,
        draw: false,
        pvp: true,
        isModeSelected: false
    }

    handleCellClick = (e, id = e.target.id) => {
        const { board, currentPlayer, play, pvp } = this.state;

        const changePlayerConditionFunc = changePlayerCondition(board, id, play);
        checkCell(e, board, id, currentPlayer, play, pvp);
        const emptyCells = updateEmptyCells(board);

        if (play && changePlayerConditionFunc) {
            this.setState(prevState => ({
                board,
                emptyCells,
                currentPlayer: !prevState.currentPlayer
            }))
        }
    }

    handleChooseModeButtonClick = name => {
        const mode = chooseMode(name);
        this.setState({
            pvp: mode,
            play: true,
            isModeSelected: true
        })
    }

    setDafaults = () => {
        clearStyles();
        this.setState({
            board: ['','','','','','','','',''],
            currentPlayer: true,
            draw: false,
            isModeSelected: false
        })
    }

    componentDidUpdate = () => {
        const { winningCombinations } = this.props;
        const { board, play, currentPlayer, pvp, emptyCells } = this.state;
        // Checking the winner
        if (checkWinner(winningCombinations, board) && play) {
            this.setState({
                play: false,
            })
        } 
        // Checking that is result of the game is draw
        if (isBoardFull(board) && play) {
            this.setState({
                play: false,
                draw: true
            })
        }
        // AI MODE
        if (play && !currentPlayer && !pvp && !checkWinner(winningCombinations, board) && !isBoardFull(board)) {
            aiMode(emptyCells, board, winningCombinations);
            this.setState(prevState => ({
                board,
                currentPlayer: !prevState.currentPlayer
            }))
        }
    }

    render() { 

        const { currentPlayer, board, play, draw, pvp, isModeSelected } = this.state;
        const { square, circle, winningCombinations } = this.props;
        const { handleCellClick, setDafaults, handleChooseModeButtonClick } = this;

        return ( 
            <Fragment>
                <CurrentPlayerInfo currentPlayer={currentPlayer} square={square} circle={circle} play={play} pvp={pvp} mode={isModeSelected} />
                <Board board={board} click={handleCellClick} />
                {isModeSelected && !play ? <PlayAgainButton value={checkWinner(winningCombinations, board)} draw={draw} click={setDafaults} pvp={pvp} /> : null}
                {isModeSelected ? null : <ChooseModeSection click={handleChooseModeButtonClick} />}
            </Fragment>
         );
    }
}
 
export default Game;