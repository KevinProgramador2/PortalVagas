import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import AppWrapper from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);