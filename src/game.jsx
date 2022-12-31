import React, { useEffect, useReducer } from "react";
import './game.scss';
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
    if (action.type !== 'keydown') {
        return;
    }
    /**
     * For an ordered set of tiles a tile A at position i is eligible to be moved 
     * based on the following conditions
     *      Tile A cannot be moved if it's 0
     *      Tile A can be moved if one of the conditions hold. The rule for moving should be 
     *      applied in the order of the listed conditions:
     *          1. A tile B at position j with value equal to the value of A exists, where j < i, and 
     *             all tiles C at positions k where j < k < i have values of 0 
     *              - If this condition holds, move Tile A to Tile B, and make the value
     *                of Tile B equal to 2 * Tile B.
     *          2. If one or more tiles B at positions j with value equal to 0, and all tiles C at positions k 
     *             where j < k < i also has a value equal to 0, move tile A to one of such tiles with the smallest j.
     */
    console.log('reducer before', state, action.key);
    const newValues = Array.from(Array(state.boardSize), () => new Array(state.boardSize).fill(0));
    const values = state.values;
    if (action.key === CONSTANTS.ARROW_LEFT || action.key === CONSTANTS.ARROW_RIGHT) {
        for (let i = 0; i < values.length; ++i) {
            const canMerge = Array(values[i].length).fill(true);
            if (action.key === CONSTANTS.ARROW_LEFT) {
                newValues[i][0] = values[i][0]; 
                for (let j = 1; j < values[i].length; ++j) {
                    if (values[i][j] !== 0) {
                        let furthestMoveableIndex = -1;
                        for (let k = j - 1; k >= 0; --k) {
                            if (newValues[i][k] === values[i][j] && canMerge[k]) {
                                newValues[i][k] *= 2;
                                // TODO: include border in this calculation
                                canMerge[k] = false;
                                furthestMoveableIndex = -1;
                                break;
                            } else if (newValues[i][k] === 0) {
                                furthestMoveableIndex = k;
                            } else {
                                break;
                            }
                        }
                        if (furthestMoveableIndex !== -1) {
                            newValues[i][furthestMoveableIndex] = values[i][j];
                        }
                    }
                }
            } else {
                newValues[i][state.boardSize - 1] = values[i][state.boardSize - 1]; 
                for (let j = state.boardSize - 2; j >= 0; --j) {
                    if (values[i][j] !== 0) {
                        let furthestMoveableIndex = -1;
                        for (let k = j + 1; k < state.boardSize; ++k) {
                            if (newValues[i][k] === values[i][j] && canMerge[k]) {
                                newValues[i][k] *= 2;
                                canMerge[k] = false;
                                furthestMoveableIndex = -1;
                                break;
                            } else if (newValues[i][k] === 0) {
                                furthestMoveableIndex = k;
                            } else {
                                break;
                            }
                        }
                        if (furthestMoveableIndex !== -1) {
                            newValues[i][furthestMoveableIndex] = values[i][j];
                        }
                    }
                }
            }
        } 
    } else {
        for (let i = 0; i < values[0].length; ++i) {
            const canMerge = Array(values[i].length).fill(true);
            if (action.key === CONSTANTS.ARROW_UP) {
                newValues[0][i] = values[0][i]; 
                for (let j = 1; j < values.length; ++j) {
                    if (values[j][i] !== 0) {
                        let furthestMoveableIndex = -1;
                        for (let k = j - 1; k >= 0; --k) {
                            if (newValues[k][i] === values[j][i] && canMerge[k]) {
                                newValues[k][i] *= 2;
                                // TODO: include border in this calculation
                                canMerge[k] = false;
                                furthestMoveableIndex = -1;
                                break;
                            } else if (newValues[k][i] === 0) {
                                furthestMoveableIndex = k;
                            } else {
                                break;
                            }
                        }
                        if (furthestMoveableIndex !== -1) {
                            newValues[furthestMoveableIndex][i] = values[j][i];
                        }
                        console.log(furthestMoveableIndex, canMerge, values, newValues);
                    }
                }
            } else {
                newValues[state.boardSize - 1][i] = values[state.boardSize - 1][i]; 
                for (let j = state.boardSize - 2; j >= 0; --j) {
                    if (values[j][i] !== 0) {
                        let furthestMoveableIndex = -1;
                        for (let k = j + 1; k < state.boardSize; ++k) {
                            if (newValues[k][i] === values[j][i] && canMerge[k]) {
                                newValues[k][i] *= 2;
                                canMerge[k] = false;
                                furthestMoveableIndex = -1;
                                break;
                            } else if (newValues[k][i] === 0) {
                                furthestMoveableIndex = k;
                            } else {
                                console.log('here');
                                break;
                            }
                        }
                        if (furthestMoveableIndex !== -1) {
                            newValues[furthestMoveableIndex][i] = values[j][i];
                        }
                    }
                }
            }
        }
    }
    
    for (let i = 0; i < values.length; ++i) {
        for (let j = 0; j < values[i].length; ++j) {
            if (values[i][j] !== newValues[i][j]) {
                let randomRow;
                let randomCol;
                do {
                    randomRow = Math.floor(Math.random() * state.boardSize);
                    randomCol = Math.floor(Math.random() * state.boardSize);
                } while (newValues[randomRow][randomCol] !== 0)
                newValues[randomRow][randomCol] = 2;
                console.log('reducer after', newValues);
                return {
                    ...state,
                    values: newValues,
                }
            }
        }
    }

    const result = {
        ...state,
        values: newValues
    };

    return result;
}

function init(boardSize) {
    const values = Array.from(Array(boardSize), () => new Array(boardSize).fill(0));
    const randomRow = Math.floor(Math.random() * boardSize);
    const randomCol = Math.floor(Math.random() * boardSize);
    values[randomRow][randomCol] = 2;
    let secondRandomRow;
    let secondRandomCol;
    do {
        secondRandomRow = Math.floor(Math.random() * boardSize);
        secondRandomCol = Math.floor(Math.random() * boardSize);
    } while (secondRandomRow === randomRow && secondRandomCol === randomCol)
    values[secondRandomRow][secondRandomCol] = 2;
    return {
        boardSize,
        values,
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
                            backgroundColor: CONSTANTS.COLOR.get(value)}}>
                            {value !== 0 && <span>{value}</span>}
                        </div>
                    </div>)
                }
            </div>
        )}
    </div>;
}

export default Game;