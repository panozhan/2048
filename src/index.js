const Game = require('./game.jsx').default;
const ReactDOM = require('react-dom/client');
const React = require('react');

function initApplication() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(/** insert root component here */React.createElement(Game, {boardSize: 4}));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initApplication();
    }); 
} else if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initApplication();
}