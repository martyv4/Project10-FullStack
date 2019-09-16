import React from 'react';
import ReactDOM from 'react-dom';

import './global.css';

import { Provider } from './components/Context';
import App from './App';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root'));
