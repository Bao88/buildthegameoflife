import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';

class Cell extends React.Component {
    state = {
        dead: true
    }

    toggleCell = (event) => {
        this.setState({dead: !this.state.dead});
        this.props.change(event);
    }
    render(){
        return (
            <span id={this.props.n} onClick={this.toggleCell} style={{backgroundColor: this.state.dead ? "black":"lightcoral"}} className="cell"></span>
        );
    }
}




class MainBoard extends React.Component {
    constructor(props){
        super(props);

        var tmp = [];
        var tmp2 = [];
        for(var i = 0; i < this.props.x; i++){
            for(var j = 0; j < this.props.y; j++){
                tmp2[j] = false;
            }
            tmp[i] = tmp2;
        }
        // console.log(tmp);
        this.state = {
            board: tmp,
            x: props.x,
            y: props.y
        };
    }

    populateBoard = () => {
        // alert("Hello");
        // var tmp = [];
        // var tmp2 = [];
        // for(var i = 0; i < this.props.x; i++){
        //     for(var j = 0; j < this.props.y; j++){
        //         tmp2[j] = false;
        //     }
        //     tmp[i] = tmp2;
        // }
        // this.setState({board: tmp});
    }

    change = (event) => {
        console.log(event.target.id);
    }
    render(){
       console.log(this.state.board);
        return (
            <div className="board">
                {
                    // Array.apply(null, Array(this.state.x)).map((x, ix) => (
                    //     Array.apply(null, Array(this.state.y)).map((y, iy) => (
                    //         <Cell n={"c" + ix + "-" + iy} key={y} change={this.change}/>
                    //     ))
                    // ))
                    this.state.board.map((x, ix) => (
                        this.state.board[ix].map((y, iy) => (
                            <Cell n={"c" + ix + "-" + iy} key={ix+x+y+iy} change={this.change}/>
                        ))
                    ))
                }
            </div>
        );
    }
}

ReactDOM.render(<MainBoard x={50} y={30}/>, document.getElementById('root'));
