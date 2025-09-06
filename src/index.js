import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import the main CSS file
import App from './App'; // Import the main App component

// Create a root and render your App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);