import React, { Component } from 'react';

import { findMaxSum, isCorner, getCurrentSum } from '../utils/helpers';
import Block from './block';

let data1 = [
  [112, 42, 83, 119],
  [56, 125, 56, 49],
  [15, 78, 101, 43],
  [62, 98, 114, 108],
];
let data2 = [
  [112, 42, 83, 119, 2, 0],
  [56, 125, 56, 49, 60, 0],
  [15, 78, 101, 43, 200, 0],
  [62, 98, 114, 108, 23, 0],
  [62, 98, 114, 108, 23, 0],
  [62, 98, 114, 108, 23, 0],
];


class Puzzle extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: data1,
      maxSum: findMaxSum(data1)
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(row, col, event) {
    if (isCorner(4, row, col)) {
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
      this.setState({
        data: [
          ...this.state.data.slice(0, row),
          [...this.state.data[row]].reverse(),
          ...this.state.data.slice(row + 1)
        ]
      });
    }
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
        <h2>Maximize the top-left corner of the grid by flipping the rows and columns.</h2>
        <h2 className="score-counter">Total: <span className="sum">{sum}</span>
        {sum === this.state.maxSum ? <i className="fa fa-check-circle green" aria-hidden="true"></i> : null}</h2>
         
        <div className="block-container">
          <div className="target-overlay"></div>
          {blocks}
        </div>
      </div>
    );
  }
}

export default Puzzle;
