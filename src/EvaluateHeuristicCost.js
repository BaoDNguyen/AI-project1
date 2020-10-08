function evaluateHeuristics (state) {
    let ourPieces = [];
    let oppPieces = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (state[i][j] === ourColor) ourPieces.push([i,j]);
            if (state[i][j] === opponentColor) oppPieces.push([i,j]);
        }
    }
    let result = heuristicConstant*(ourPieces.length - oppPieces.length);
    let count = 0;
    if (ourPieces.length > 0) {
        count = 0;      // count total possible squares to move
        ourPieces.forEach(e=>{
            // check column
            for (let i = e[0]+1; i < 8; i++) {
                if (state[i][e[1]] === 'blank') count += 1;
                else break;
            }
            for (let i = e[0]-1; i>=0; i = i - 1) {
                if (state[i][e[1]] === 'blank') count += 1;
                else break;
            }
            // check row
            for (let i = e[1]+1; i < 8; i++) {
                if (state[e[0]][i] === 'blank') count += 1;
                else break;
            }
            for (let i = e[1]-1; i>=0; i = i - 1) {
                if (state[e[0]][i] === 'blank') count += 1;
                else break;
            }
        });
        result += count;
    }
    if (oppPieces.length > 0) {
        count = 0;      // count total possible squares to move
        oppPieces.forEach(e=>{
            // check column
            for (let i = e[0]+1; i < 8; i++) {
                if (state[i][e[1]] === 'blank') count += 1;
                else break;
            }
            for (let i = e[0]-1; i>=0; i = i - 1) {
                if (state[i][e[1]] === 'blank') count += 1;
                else break;
            }
            // check row
            for (let i = e[1]+1; i < 8; i++) {
                if (state[e[0]][i] === 'blank') count += 1;
                else break;
            }
            for (let i = e[1]-1; i>=0; i = i - 1) {
                if (state[e[0]][i] === 'blank') count += 1;
                else break;
            }
        });
        result -= count;
    }
    return result;
}