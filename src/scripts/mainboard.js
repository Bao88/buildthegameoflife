import React from 'react';
import '../css/mainboard.css';

class Cell extends React.Component {
    state = {
        //     dead: true,
        old: false
    }

    toggleCell = (event) => {
        this.setState({ dead: !this.state.dead });
        // this.props.change(event);
    }
    render() {
        return (
            <span id={this.props.n} onClick={this.props.onClick} style={{ backgroundColor: this.props.status.old ? "red" : (this.props.status.alive ? "lightcoral" : "black") }} className="cell"></span>
        );
    }
}

class MainBoard extends React.Component {
    constructor(props) {
        super(props);
        var cells = [];
        var arraySize = props.x * props.y;
        while (arraySize--) cells[arraySize] = { alive: 0, old: 0 };

        this.state = {
            x: props.x,
            y: props.y,
            rCells: cells,
            rEmpty: cells,
            speed: 100,
            execution: null,
            generation: 0
        };
    }

    executeGameOfLife = (event) => {
        var tmp = this.state.rEmpty;
        var newArray = [];
        var neighboors, len = this.state.x, total = this.state.x * this.state.y;
        for (var i = 0; i < tmp.length; i++) {
            neighboors = 0;

            if (i < len) {
                // Top edge
                neighboors += this.state.rCells[total + i - len].alive;
                if (i === 0) {
                    neighboors += this.state.rCells[total - 1].alive;
                    neighboors += this.state.rCells[i + (len * 2) - 1].alive;
                    neighboors += this.state.rCells[total + i - len + 1].alive;
                    neighboors += this.state.rCells[i + len + 1].alive;
                } else if (i === len - 1) {
                    neighboors += this.state.rCells[0].alive;
                    neighboors += this.state.rCells[i - 1].alive;
                    neighboors += this.state.rCells[total - 2].alive;
                    neighboors += this.state.rCells[total - len].alive;
                } else {
                    neighboors += this.state.rCells[i - 1].alive;
                    neighboors += this.state.rCells[total + i - len - 1].alive;
                    neighboors += this.state.rCells[total + i - len + 1].alive;
                    neighboors += this.state.rCells[i + len + 1].alive;
                }
                neighboors += this.state.rCells[i + 1].alive;
                neighboors += this.state.rCells[i + len - 1].alive;
                neighboors += this.state.rCells[i + len].alive;
            } else if (i > len * this.state.y - len - 1) {
                // Find the bottom edges
                if (i === total - len) {
                    neighboors += this.state.rCells[len - 1].alive;
                    neighboors += this.state.rCells[total - 1].alive;
                    neighboors += this.state.rCells[i + 1].alive;
                    neighboors += this.state.rCells[len - (total - i) + 1].alive;
                } else if (i === total - 1) {
                    neighboors += this.state.rCells[0].alive;
                    neighboors += this.state.rCells[total - len - 2].alive;
                    neighboors += this.state.rCells[total - len * 2].alive;
                    neighboors += this.state.rCells[len - 2].alive;
                } else {
                    neighboors += this.state.rCells[len - (total - i) - 1].alive;
                    neighboors += this.state.rCells[i - len - 1].alive;
                    neighboors += this.state.rCells[i + 1].alive;
                    neighboors += this.state.rCells[len - (total - i) + 1].alive;
                }
                neighboors += this.state.rCells[i - len].alive;
                neighboors += this.state.rCells[i - len + 1].alive;
                neighboors += this.state.rCells[i - 1].alive;
                neighboors += this.state.rCells[len - (total - i)].alive;
            } else if (i % len === len - 1) {
                // Find right edge
                neighboors += this.state.rCells[i - len - 1].alive;
                neighboors += this.state.rCells[i - len].alive;
                neighboors += this.state.rCells[(i - len + 1) - len].alive;
                neighboors += this.state.rCells[i - 1].alive;
                neighboors += this.state.rCells[i - len + 1].alive;
                neighboors += this.state.rCells[i + len - 1].alive;
                neighboors += this.state.rCells[i + len].alive;
                neighboors += this.state.rCells[i + 1].alive;
            } else if (i % len === 0) {
                // Find the left edge
                neighboors += this.state.rCells[(i + len - 1) - len].alive;
                neighboors += this.state.rCells[i - len].alive;
                neighboors += this.state.rCells[i - len + 1].alive;
                neighboors += this.state.rCells[i + len - 1].alive;
                neighboors += this.state.rCells[i + 1].alive;
                neighboors += this.state.rCells[(i + len - 1) + len].alive;
                neighboors += this.state.rCells[i + len].alive;
                neighboors += this.state.rCells[i + len + 1].alive;
            } else {
                // Cell is not on the edges
                neighboors += this.state.rCells[i - len - 1].alive;
                neighboors += this.state.rCells[i - len].alive;
                neighboors += this.state.rCells[i - len + 1].alive;
                neighboors += this.state.rCells[i - 1].alive;
                neighboors += this.state.rCells[i + 1].alive;
                neighboors += this.state.rCells[i + len - 1].alive;
                neighboors += this.state.rCells[i + len].alive;
                neighboors += this.state.rCells[i + len + 1].alive;
            }
            //      Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
            //      Any live cell with two or three live neighbours lives on to the next generation.
            //      Any live cell with more than three live neighbours dies, as if by overpopulation.
            //      Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

            // Currently a live cell, could modify the tmp = this.state.rCell of some reason, seems like
            // there are still bindings thus when we modify tmp rCell seems to store those modifications too. Just a theory
            if (this.state.rCells[i].alive === 1) {
                if (neighboors < 2 || 3 < neighboors) newArray[i] = 0;
                if (neighboors === 2 || neighboors === 3) newArray[i] = 1;
                if (neighboors > 3) newArray[i] = 0;
            } else {
                if (neighboors === 3) {
                    newArray[i] = 1;
                }
            }
        }

        // Copy the status over
        for (var a = 0; a < tmp.length; a++) {
            if (newArray[a] === 1) {
                if (tmp[a].alive) tmp[a].old = 1;
                else tmp[a].alive = 1;
            }
            else tmp[a] = { alive: 0, old: 0 };
        }
        var gTmp = this.state.generation + 1;
        this.setState({ rCells: tmp, generation: gTmp });
    }

    // randomly places cells
    populateBoard = () => {
        var tmp = this.state.rCells;
        for (var i = 0; i < tmp.length; i++) {
            var random = Math.random() >= 0.5;
            tmp[i] = { alive: random ? 1 : 0, old: 0 };
        }
        this.setState({ rCells: tmp });
    }

    // User can create or kill a cell
    change = (event) => {
        var tmp = this.state.rCells;
        var i = parseInt(event.target.id.substring(1), 10);
        tmp[i] = { alive: (1 === tmp[i].alive) ? 0 : 1, old: 0 };
        this.setState({ rCells: tmp });
    }

    // Buttons start, stop and clear
    start = (event) => {
        var st = setInterval(this.executeGameOfLife, this.state.speed);
        this.setState({ execution: st });
        // this.executeGameOfLife();
    }

    stop = (event) => {
        clearInterval(this.state.execution);
    }

    clear = (event) => {
        var size = this.props.x * this.props.y;
        var tmp = this.state.rCells;
        while (size--) tmp[size] = { alive: 0, old: 0 };
        this.setState({ rCells: this.state.rEmpty, generation: 0 });
    }

    componentDidMount = () => {
        this.populateBoard();
        this.start();
    }

    render() {
        return (
            <div id="main">
                <div className="gen">Gene{"   " + this.state.generation + "   "}ration</div>
                <div className="buttons">
                    <button onClick={this.start}>Start</button>
                    <button onClick={this.stop}>Stop</button>
                    <button onClick={this.populateBoard}>Populate</button>
                    <button onClick={this.clear}>Clear</button>
                </div>
                <div className="board">
                    {
                        this.state.rCells.map((x, i) => (
                            <Cell n={"c" + i} key={i} status={x} onClick={this.change} />
                        ), this)
                    }
                </div>
            </div>
        );
    }
}

export default MainBoard;