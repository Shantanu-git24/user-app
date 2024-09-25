import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client'
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';


// Get the root element
const container = document.getElementById('root');

// Create a root using createRoot
const root = ReactDOM.createRoot(container);

// Render the app with the root
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
