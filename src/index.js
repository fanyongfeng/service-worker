import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ',    registration.scope);
    }).catch(function(err) {
        console.log('ServiceWorker registration failed: ', err);
    });
}