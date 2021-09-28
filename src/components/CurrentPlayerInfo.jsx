import React from 'react';
import { currentPlayerInfo } from '../functions/currentPlayerInfo';

const CurrentPlayerInfo = ({ currentPlayer, square, circle, play, pvp, mode }) => {
    return ( 
        <h3 className='current-player'>{currentPlayerInfo(play, currentPlayer, square, circle, pvp, mode)}</h3>
     );
}
 
export default CurrentPlayerInfo;