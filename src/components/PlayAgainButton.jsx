import React from 'react';
import { endGameMessage } from '../functions/endGameMessage';

const PlayAgainButton = ({ value, draw, click, pvp }) => {
    return ( 
        <button className='play-again' onClick={click}>{endGameMessage(value, draw, pvp)}</button>
     );
}
 
export default PlayAgainButton;