import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './stylesheets/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector('#root')
);
