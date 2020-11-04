import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Square(props) {
    return (
        <button
            className="square"
            onClick={ () => props.onClick() }
        >
            {props.value}
        </button>
    )
}
  
class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        )
    }
  
    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}
  
class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNum: 0,
            xIsNext: true,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNum + 1)
        const cur = history[history.length - 1]
        const squares = cur.squares.slice()
        if (calcWin(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNum: history.length,
            xIsNext: !this.state.xIsNext
        })
    }

    jumpTo(step) {
        this.setState({
            stepNum: step,
            xIsNext: (step % 2 === 0),
        })
    }

    render() {
        const history = this.state.history 
        const cur = history[this.state.stepNum]
        const results = calcWin(cur.squares)

        const moves = history.map((step, move) => {
            const desc = move ?
            `Back to move #${move}` :
            'Back to start'
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let status 
        if (results) {
            status = `${results[0]} won!`
            showResult(results[1])
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`
        }

        if (history.length === 10 && !results) {
            status = `It's draw!`
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={cur.squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}
  
// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calcWin (squares) {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a,b,c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a], lines[i]]
        }
    }
    return null
}

function showResult(array) {
    const squares = Array.from(document.querySelectorAll('.square'))

    array.map(item => squares[item].style.background = 'lightgreen')
}
  