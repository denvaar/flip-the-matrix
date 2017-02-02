import React from 'react';

import { handleMouseMove, isCorner, isEdge } from '../utils/helpers';


const Block = ({ n, display, row, col, handleClick }) => {
  
  if (!handleClick) handleClick = () => {};
  
  let styles = {
    width: (500/n)+"px",
    height: (500/n)+"px",
    lineHeight: (500/n)+"px",
  };

  //let isCorner = getCorners(n).findIndex(x => x[0] == row && x[1] == col);
  let classNames = isEdge(n, row, col) ? 'edge' : '';

  return (
    <div className={"block " + classNames} style={styles}
         onClick={(event) => handleClick(row, col, event)}
         onMouseMove={isCorner(n, row, col) ? handleMouseMove : null}
         onMouseLeave={(event) => {event.target.classList.remove("direction-vert", "direction-hor");}}>
      {display}
    </div>
  );
}

export default Block;
