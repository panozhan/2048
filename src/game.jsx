import React, { useEffect, useReducer } from "react";
import { mergeUp, mergeDown, mergeRight, mergeLeft, getRandomRowColThatFits, isValuesEqual, isGameOver } from "./utils";
import './game.scss'; // ==> document.getElementByTagName('head').addChild('style')
import CONSTANTS from './constants';

/**
 * Sequence of events:
 *      1. User taps key
 *      2. Determine which tiles move (synchronous)
 *      3. Animate movements
 *          a. tiles moving
 *          b. tiles merging - this is a visual 
 *              i. reset tiles that have moved to th
 *      4. 
 */
function reducer(state, action) {
    if (action.type === 'new-game') {
        return init(state.boardSize);
    }
    
    if (state.gameOver) {
        return state;
    }

    let newValues;
    switch (action.key) {
        case CONSTANTS.ARROW_LEFT:
            newValues = mergeLeft(state.values);
            break;
        case CONSTANTS.ARROW_RIGHT:
            newValues = mergeRight(state.values);
            break;
        case CONSTANTS.ARROW_UP:
            newValues = mergeUp(state.values);
            break;
        case CONSTANTS.ARROW_DOWN:
            newValues = mergeDown(state.values);
            break;
    }

    if (!isValuesEqual(state.values, newValues)) {
        const [row, col] = getRandomRowColThatFits(newValues);
        newValues[row][col] = 2;
    }

    const result = {
        ...state,
        values: newValues,
        gameOver: isGameOver(newValues)
    };

    return result;
}

function init(boardSize) {
    const values = Array.from(Array(boardSize), () => new Array(boardSize).fill(0));
    const randomRow = Math.floor(Math.random() * boardSize);
    const randomCol = Math.floor(Math.random() * boardSize);
    values[randomRow][randomCol] = 2;

    const [secondRandomRow, secondRandomCol] = getRandomRowColThatFits(values);
    values[secondRandomRow][secondRandomCol] = 2;
    return {
        boardSize,
        values,
        gameOver: false,
    }
}
 
function Game({boardSize}) {
    const [state, dispatch] = useReducer(reducer, boardSize, init);
    function keyDown(e) {
        if (CONSTANTS.KEYS_TO_LISTEN.indexOf(e.key) !== -1) {
            dispatch({type:'keydown', key: e.key});
        }
    };   
    
    useEffect(() => {
        document.addEventListener('keydown', keyDown);
    }, []);

    return <div id="board">
        {state.values.map((row, rowIndex) => 
            <div key={rowIndex} className="row">
                {
                    row.map((value, colIndex) => <div key={colIndex} className="tile">
                        <div className="inner-tile" style={{ 
                            backgroundColor: CONSTANTS.COLOR.get(value),
                            opacity: state.gameOver? '20%' : '100%'}}>
                            {value !== 0 && <span>{value}</span>}
                        </div>
                    </div>)
                }
            </div>
        )}
        {state.gameOver && <div id="game-over">
            <div><span>You Lost</span></div>
            
            <button id='new-game' onClick={()=>dispatch({type:'new-game'})}>New Game</button>
        </div>}
    </div>;
}

export default Game;