import './index.css';
import * as React from 'react';
import App from './App';
import { render } from 'react-dom';
// import { createRoot } from 'react-dom/client';
// const container = document.getElementById('root') ?? document.createElement('div');
// const container = document.createElement('div');
// createRoot(container).
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  , document.body
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
