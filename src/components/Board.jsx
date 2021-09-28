import React from 'react';

const Board = ({ board, click }) => {

    return ( 
        <section className='table'>
            {board.map((field, id) =>
            <div key={id} id={id} className='cell' onClick={click}>{field}</div>
            )}
        </section>
     );
}
 
export default Board;