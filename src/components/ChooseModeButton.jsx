import React from 'react';

const ChooseModeButton = ({ click, name }) => {
    return ( 
        <button className='choose-mode' onClick={() => click(name)}>{name}</button>
     );
}
 
export default ChooseModeButton;