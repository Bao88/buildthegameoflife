import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import MainBoard from "./scripts/mainboard";

class App extends React.Component {
  
    render(){
        return (
             <div>
                <MainBoard x={50} y={30}/>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
