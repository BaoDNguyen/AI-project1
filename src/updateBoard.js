// move : {from: 'a1', to: 'a2'}
function updateBoard(state,move) {
    let newState = state.map(e=>e.map(e_=>e_));
    let str1 = move.from;
    let str2 = move.to;
    let col1 = symbols.findIndex(e=>e===str1.substring(0,1));
    let col2 = symbols.findIndex(e=>e===str2.substring(0,1));
    let row1 = +str1.substring(1);
    let row2 = +str2.substring(1);
    if (newState[row2][col2] !== 'blank') return 'cannot move to occupied square!';
    else {
        if (newState[row1][col1] === 'blank') return 'no piece found at starting square!';
        else {
            if (row1===row2&&col1===col2) return 'starting is ending!'
            else {
                let crossing = false;
                if (row1===row2) {
                    let iMin = (col1 < col2) ? col1 : col2;
                    let iMax = (col1 > col2) ? col1 : col2;
                    for (let i = iMin + 1; i < iMax; i++) {
                        if (newState[row1][i] !== 'blank') {
                            crossing = true;
                            break;
                        }
                    }
                } else {
                    let iMin = (row1 < row2) ? row1 : row2;
                    let iMax = (row1 > row2) ? row1 : row2;
                    for (let i = iMin + 1; i < iMax; i++) {
                        if (newState[i][col1] !== 'blank') {
                            crossing = true;
                            break;
                        }
                    }
                }
                if (!crossing) {
                    newState[row2][col2] = newState[row1][col1];
                    newState[row1][col1] = 'blank';
                    let result = checkSqueeze(newState,newState[row2][col2],row2,col2);
                    return result;
                } else return 'invalid move';
            }
        }
    }
}