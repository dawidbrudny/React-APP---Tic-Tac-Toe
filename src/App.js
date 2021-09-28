import React, { Component, Fragment } from 'react';
import './App.css'

import Game from './components/Game';

class App extends Component {
    state = {  }
    render() { 
        return ( 
            <Fragment>
                <Game />
            </Fragment>
         );
    }
}
 
export default App;