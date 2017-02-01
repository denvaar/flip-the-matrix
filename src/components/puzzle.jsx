import React, { Component } from 'react';


const Block = ({ n, display, row, col, handleClick }) => {
  let styles = {
    width: (500/n)+"px",
    height: (500/n)+"px",
    lineHeight: (500/n)+"px",
  };
  let isCorner = [[0,0], [0,n-1], [n-1, n-1], [n-1, 0]].findIndex(x => {return x[0] == row && x[1] == col});
  if (!handleClick) handleClick = () => {};
  let classNames = '';
  if ((row === 0 || row === n-1) || (col === 0 || col === n-1)) {
    classNames = 'edge';
  }

  return (
    <div className={"block " + classNames} style={styles}
         onClick={(event) => handleClick(row, col, event)}
         onMouseMove={isCorner > -1 ? handleMouseMove : null}
         onMouseLeave={(event) => {event.target.classList.remove("direction-vert", "direction-hor");}}>
      {display}
    </div>
  );
}


const handleMouseMove = (event) => {
  let x = event.pageX - event.target.offsetLeft;
  let y = event.pageY - event.target.offsetTop;
  if (x < y) {
    event.target.classList.add("direction-hor");
    event.target.classList.remove("direction-vert");
  } else {
    event.target.classList.add("direction-vert");
    event.target.classList.remove("direction-hor");
  }
}

let data = [
  [112, 42, 83, 119],
  [56, 125, 56, 49],
  [15, 78, 101, 43],
  [62, 98, 114, 108],
];


class Puzzle extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: data
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(row, col, event) {
    
    if ((row === this.state.data.length - 1 && col == this.state.data.length -1) ||
        (row === 0 && col === 0) ||
        (row === 0 && col === this.state.data.length - 1) ||
        (row === this.state.data.length - 1 && col === 0)) {
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
    let sum = this.state.data[0][0] + 
      this.state.data[0][1] + 
      this.state.data[1][0] +
      this.state.data[1][1];
    return (
      <div className="game-container">
        <h2>Maximize the top-left corner of the grid by flipping the rows and columns.</h2>
        <h2 style={{float: "left", textDecoration: "underline"}}>Total: <span className="sum">{sum}</span>
        {sum === 414 ? <i className="fa fa-check-circle green" aria-hidden="true"></i> : null}</h2>
         
        <div className="block-container">
          <div className="target-overlay"></div>
          {blocks}
        </div>
      </div>
    );
  }
}

export default Puzzle;
