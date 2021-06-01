import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

render(
  <div>
    <h1 className="text-center">Commits</h1>
    <App />
  </div>,
  document.getElementById('app')
);