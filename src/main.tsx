import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

// Always normalize path to / so refreshing always starts at the home experience
if (window.location.pathname !== '/' && !window.location.pathname.startsWith('/api')) {
  window.history.replaceState(null, '', '/' + window.location.search + window.location.hash);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
