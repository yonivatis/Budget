import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BudgetProvider } from "./Contexts/BudgetContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BudgetProvider>
            <App />
        </BudgetProvider>
    </React.StrictMode>
);
