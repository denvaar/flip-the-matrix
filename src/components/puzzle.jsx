import React, { Component } from 'react';
import YouTube from 'react-youtube';

import { findMaxSum, isCorner, getCurrentSum, generatePuzzle } from '../utils/helpers';
import Block from './block';
import ProgressBar from './progressBar';


const opts = {
  height: '390',
  width: '640',
  playerVars: {
    autoplay: 1
  }
}; 


export default class Puzzle extends Component {
  
  constructor(props) {
    super(props);
    let puzzle = generatePuzzle(4);
    this.state = {
      data: puzzle,
      maxSum: findMaxSum(puzzle)
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(n, row, col, event) {
    if (isCorner(n, row, col)) {
      let x = event.pageX - event.target.offsetLeft;
      let y = event.pageY - event.target.offsetTop;
      
      if (x < y) {
        this.setState({
          data: [
            ...this.state.data.slice(0, row),
            [...this.state.data[row]].reverse(),
            ...this.state.data.slice(row + 1)
          ]
        });
        return;
      } else {
        
        let matrix = [...this.state.data];
        for (let row = 0; row < this.state.data[0].length/2; row++) {
          let temp = matrix[row][col];
          matrix[row][col] = matrix[matrix.length - row - 1][col];
          matrix[matrix.length - row - 1][col] = temp;
        }
        this.setState({
          data: matrix
        });
        return;
      }
    }

    /* top and bottom cells */
    if (row === 0 || row === this.state.data.length - 1) {
      let matrix = [...this.state.data];
      for (let row = 0; row < this.state.data[0].length/2; row++) {
        let temp = matrix[row][col];
        matrix[row][col] = matrix[matrix.length - row - 1][col];
        matrix[matrix.length - row - 1][col] = temp;
      }
      this.setState({
        data: matrix
      });
    } else {
      /* left and right side cells */
      this.setState({
        data: [
          ...this.state.data.slice(0, row),
          [...this.state.data[row]].reverse(),
          ...this.state.data.slice(row + 1)
        ]
      });
    }
  }

  swapPuzzle(size) {
    let newPuzzle = generatePuzzle(size);
    this.setState({
      data: newPuzzle,
      maxSum: findMaxSum(newPuzzle)
    });
  }

  render() {
    let blocks = this.state.data.map((row, j) => {
      let n = this.state.data.length;
      return row.map((value, i) => {
        let isEdge = (i === 0 || i === n-1) || (j === 0 || j === n-1); 
        return (
          <Block
            key={i}
            n={n}
            display={value}
            row={j}
            col={i}
            isEdge={isEdge}
            handleClick={isEdge ? this.handleClick : null} />);
      });
    });
    
    let sum = getCurrentSum(this.state.data);
    
    return (
      <div className="game-container">
        {sum === this.state.maxSum ? <YouTube videoId="b3_lVSrPB6w" opts={opts} /> : null}
        <h2 className="instructions">Maximize the top left corner of the puzzle by flipping the rows and columns to win a <span className="exciting">special treat</span>.</h2>
        <p className="instructions">
          <span>Puzzle Size: </span>
          4 <input type="radio" name="4" value={4} checked={this.state.data.length === 4} onChange={() => this.swapPuzzle(4) } />
          6 <input type="radio" name="6" value={6} checked={this.state.data.length === 6} onChange={() => this.swapPuzzle(6) } />
        </p>
        <h2 className="score-counter">Total: <span className="sum">{sum}</span>
        </h2>
        <ProgressBar val={sum} total={this.state.maxSum} />
        <div className="block-container">
          <div className="target-overlay"></div>
          {blocks}
        </div>
      </div>
    );
  }
}
