import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/styles.css';

import Puzzle from './components/puzzle';

ReactDOM.render(
  <Puzzle />,
  document.getElementById('react-root')
);

if (module.hot) module.hot.accept();
