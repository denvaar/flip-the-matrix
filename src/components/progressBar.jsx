import React from 'react';


const ProgressBar = ({ val, total }) => {
  let progress = (val/total) * 100;
  let styles = { width: progress+'%' };
  if (progress >= 100) styles['borderRadius'] = 15+'px';

  return (
    <div className="progress-bar">
      <div style={styles}></div>
    </div>
  );
}

export default ProgressBar;
