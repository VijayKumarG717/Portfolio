import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import Home from './pages/index';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
); 