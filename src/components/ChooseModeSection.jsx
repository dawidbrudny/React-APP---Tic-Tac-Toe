import React from 'react';
import ChooseModeButton from './ChooseModeButton';

const ChooseModeSection = ({ click }) => {
    return ( 
        <section className='choose-mode'>
            <ChooseModeButton click={click} name='pvp' />
            <ChooseModeButton click={click} name='komputer' />
        </section>
     );
}
 
export default ChooseModeSection;