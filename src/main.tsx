import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

// Normalize URL path to basePath so refreshing always starts cleanly
const basePath = import.meta.env.BASE_URL || '/';
if (window.location.pathname.includes('/portfolio/')) {
  window.history.replaceState(null, '', basePath + window.location.search + window.location.hash);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
