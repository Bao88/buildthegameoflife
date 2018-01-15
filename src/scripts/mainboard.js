import React from 'react';
import '../css/mainboard.css';

class Cell extends React.Component {
    state = {
    //     dead: true,
        old: false
    }

    toggleCell = (event) => {
        this.setState({dead: !this.state.dead});
        // this.props.change(event);
    }
    render(){
        return (
            <span id={this.props.n} onClick={this.props.onClick} style={{backgroundColor: this.props.status.dead ? "black": (this.props.status.old ? "red" : "lightcoral")}} className="cell"></span>
        );
    }
}




class MainBoard extends React.Component {
    constructor(props){
        super(props);
        var cells = [];
        var arraySize = props.x*props.y;
        while(arraySize--) cells[arraySize] = {dead:true, old: false};
        // var tmp = Array.from(new Array(props.x*props.y), function(val, i) { 
        //     cells[i] = {dead:true, old: false};
        //     return <Cell n={"c" + i} key={i} status={cells[i]}/> 
        //     // ref={(input) => { this.textInput = input; }} />
        // });

        // console.log(cells.length);
        this.state = {
            // board: tmp,
            x: props.x,
            y: props.y,
            rCells: cells,
            speed: 1000,
            execution: null
        };
        // console.log(tmp.length);
    }

//      Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
//      Any live cell with two or three live neighbours lives on to the next generation.
//      Any live cell with more than three live neighbours dies, as if by overpopulation.
//      Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    executeGameOfLife = (event) => {
        // console.log("Called");
        var tmp = this.state.rCells;
        var currentCell = {};
        var newStatus = {};
        var neighboors = 0;
        for(var i = 0; i < tmp.length; i++){
            neighboors = 0;
            currentCell = tmp[i];

            // Cell is dead
            if(currentCell.dead){
                console.log("Dead");

            } else {
                // cell is alive
                console.log("Alive");
            }
            // Find the top edge
            if(i < this.state.x){
                // currentCell.dead = false;
                // tmp[i] = currentCell;
            }

            // Find the left edge
            if(i % this.state.x == 0){
                // currentCell.dead = false;
                // tmp[i] = currentCell;
            }

            // Find right edge
            if(i % this.state.x == this.state.x-1){
                // currentCell.dead = false;
                // tmp[i] = currentCell;
            }

            // Find the bottom edges
            if(i > this.state.x*this.state.y - this.state.x-1){
                // currentCell.dead = false;
                // tmp[i] = currentCell;
            }
        }
        this.setState({rCells: tmp});
    }
    populateBoard = () => {
        var tmp = this.state.rCells;
        for(var i = 0; i < tmp.length; i++){
            var random = Math.random() >= 0.5;
            console.log(random);
            tmp[i] = {dead: random ? true : false, old: false};
        }

        console.log(tmp);
        this.setState({rCells: tmp});
    }

    change = (event) => {
        // console.log(event.target.id.substring(1));
        var tmp = this.state.rCells;
        tmp[event.target.id.substring(1)] = {dead: !tmp[event.target.id.substring(1)].dead, old: false};
        // console.log(tmp[event.target.id.substring(1,4)].dead);
        this.setState({rCells: tmp});
    }

    // Buttons start, stop and clear
    start = (event) => {
        console.log("start");
        // var st = setInterval(this.executeGameOfLife, this.state.speed);
        // this.setState({execution: st});
        this.executeGameOfLife();
    }

    stop = (event) => {
        console.log("stop");
        clearInterval(this.state.execution);
    }

    clear = (event) => {
        console.log("clear");
        var size = this.props.x*this.props.y;
        var tmp = this.state.rCells;
        while(size--) tmp[size] = {dead:true, old: false};
        this.setState({rCells: tmp});
    }
 render(){
        // console.log(this.state.board);
        return (
            <div id="main">
                <div className="buttons">
                    <button onClick={this.start}>Start</button>
                    <button onClick={this.stop}>Stop</button>
                    <button onClick={this.populateBoard}>Populate</button>
                    <button onClick={this.clear}>Clear</button>
                </div>
                <div className="board">
                    {
                        // this.state.board
                        this.state.rCells.map((x, i) => (
                            <Cell n={"c" + i} key={i} status={x} onClick={this.change}/>
                            // <Cell n={"c" + i} key={i} change={this.change} />
                        ), this)
                    }
                </div>
            </div>
        );
    }
}

export default MainBoard;