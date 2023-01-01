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

function mergeLeft(values) {
    const newValues = Array.from(Array(values.length), () => new Array(values.length).fill(0));

    for (let i = 0; i < values.length; ++i) {
        const canMerge = Array(values[i].length).fill(true);
        // Copy over the first tile in the row, because that for sure cannot move
        newValues[i][0] = values[i][0]; 
        for (let j = 1; j < values[i].length; ++j) {
            if (values[i][j] !== 0) {
                let furthestMoveableIndex = -1;
                for (let k = j - 1; k >= 0; --k) {
                    if (newValues[i][k] === values[i][j]) {
                        if (canMerge[k]) {
                            newValues[i][k] *= 2;
                            canMerge[k] = false;
                            furthestMoveableIndex = -1;
                        }
                        break;
                    } else if (newValues[i][k] === 0) {
                        furthestMoveableIndex = k;
                    } else {
                        if (furthestMoveableIndex === -1) {
                            newValues[i][j] = values[i][j];
                        }
                        break;
                    }
                }
                if (furthestMoveableIndex !== -1) {
                    newValues[i][furthestMoveableIndex] = values[i][j];
                }
            }
        }
    }
    return newValues;
}

function mergeRight(values) {
    const newValues = Array.from(Array(values.length), () => new Array(values.length).fill(0));

    for (let i = 0; i < values.length; ++i) {
        const canMerge = Array(values[i].length).fill(true);
        // Copy over the last tile in the row, because that for sure cannot move
        const lastTileIndex = values[i].length - 1;
        newValues[i][lastTileIndex] = values[i][lastTileIndex]; 
        for (let j = lastTileIndex - 1; j >= 0; --j) {
            if (values[i][j] !== 0) {
                let furthestMoveableIndex = -1;
                for (let k = j + 1; k < values[i].length; ++k) {
                    if (newValues[i][k] === values[i][j]) {
                        if (canMerge[k]) {
                            newValues[i][k] *= 2;
                            canMerge[k] = false;
                            furthestMoveableIndex = -1;
                        }
                        break;
                    } else if (newValues[i][k] === 0) {
                        furthestMoveableIndex = k;
                    } else {
                        if (furthestMoveableIndex === -1) {
                            newValues[i][j] = values[i][j];
                        }
                        break;
                    }
                }
                if (furthestMoveableIndex !== -1) {
                    newValues[i][furthestMoveableIndex] = values[i][j];
                }
            }
        }
    }
    return newValues;
}

function mergeUp(values) {
    const newValues = Array.from(Array(values.length), () => new Array(values.length).fill(0));
    const numColumns = values[0].length;
    const numRows = values.length;

    for (let i = 0; i < numColumns; ++i) {
        const canMerge = Array(numRows).fill(true);
        // Copy over the first tile in the column, because that for sure cannot move
        newValues[0][i] = values[0][i]; 
        for (let j = 1; j < numRows; ++j) {
            if (values[j][i] !== 0) {
                let furthestMoveableIndex = -1;
                for (let k = j - 1; k >= 0; --k) {
                    if (newValues[k][i] === values[j][i]) {
                        if (canMerge[k]) {
                            newValues[k][i] *= 2;
                            canMerge[k] = false;
                            furthestMoveableIndex = -1;
                        }
                        break;
                    } else if (newValues[k][i] === 0) {
                        furthestMoveableIndex = k;
                    } else {
                        if (furthestMoveableIndex === -1) {
                            newValues[j][i] = values[j][i];
                        }
                        break;
                    }
                }

                if (furthestMoveableIndex !== -1) {
                    newValues[furthestMoveableIndex][i] = values[j][i];
                }
            }
        }
    }

    return newValues;
}

function mergeDown(values) {
    const newValues = Array.from(Array(values.length), () => new Array(values.length).fill(0));
    const numColumns = values[0].length;
    const numRows = values.length;

    for (let i = 0; i < numColumns; ++i) {
        const canMerge = Array(numRows).fill(true);
        const lastTileIndex = numRows - 1;
        // Copy over the last tile in the column, because that for sure cannot move
        newValues[lastTileIndex][i] = values[lastTileIndex][i]; 
        for (let j = lastTileIndex - 1; j >= 0; --j) {
            if (values[j][i] !== 0) {
                let furthestMoveableIndex = -1;
                for (let k = j + 1; k < numRows; ++k) {
                    if (newValues[k][i] === values[j][i]) {
                        if (canMerge[k]) {
                            newValues[k][i] *= 2;
                            canMerge[k] = false;
                            furthestMoveableIndex = -1;
                        }
                        break;
                    } else if (newValues[k][i] === 0) {
                        furthestMoveableIndex = k;
                    } else {
                        if (furthestMoveableIndex === -1) {
                            newValues[j][i] = values[j][i];
                        }
                        break;
                    }
                }
                if (furthestMoveableIndex !== -1) {
                    newValues[furthestMoveableIndex][i] = values[j][i];
                }
            }
        }
    }

    return newValues;
}

function getRandomRowColThatFits(values) {
    const boardSize = values.length;
    let row,col;
    do {
        row = Math.floor(Math.random() * boardSize);
        col = Math.floor(Math.random() * boardSize);
    } while (values[row][col] !== 0);
    return [row,col];
}

function isValuesEqual(old, current) {
    for (let i = 0; i < old.length; ++i) {
        for (let j = 0; j < old[i].length; ++j) {
            if (old[i][j] !== current[i][j]) {
                return false;
            }
        }
    }
    return true;
}

function isGameOver(values) {
    return values.every(row => row.every(value => value !== 0));
}

module.exports = {
    mergeLeft,
    mergeRight,
    mergeUp,
    mergeDown,
    getRandomRowColThatFits,
    isValuesEqual,
    isGameOver,
}