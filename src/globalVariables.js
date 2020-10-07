// generate initial state of the board
let board = [];
for (let i = 0; i < 8; i++) {
    board[i] = [];      // rows
    for (let j = 0; j < 8; j++) {       // columns
        if (i===7) board[i][j] = 'B';    // black pieces
        if (i===0) board[i][j] = 'W';   // white pieces
        if (i > 0 && i < 7) board[i][j] = 'blank';      // blank squares
    }
}

let symbols = ['a','b','c','d','e','f','g','h'];

let ourColor = 'W';
let opponentColor = 'B';

let plyDepth = 4;

let doWeMoveFirst = true;