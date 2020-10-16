// generate initial state of the board
let board = [];
for (let i = 0; i < 8; i++) {
    board[i] = [];      // rows
    for (let j = 0; j < 8; j++) {       // columns
        if (i===7) board[i][j] = 'B';    // black pieces
        if (i===0) board[i][j] = 'W';   // white pieces
        if (i > 0 && i < 7) board[i][j] = 'blank';      // blank squares
        // if (i===0 && j===1) board[i][j] = 'W';
        // else if (i===0 && j===5) board[i][j] = 'W';
        // else if (i===0 && j===6) board[i][j] = 'W';
        // else if (i===1 && j===2) board[i][j] = 'W';
        // else if (i===1 && j===5) board[i][j] = 'B';
        // else if (i===2 && j===1) board[i][j] = 'B';
        // else if (i===2 && j===6) board[i][j] = 'B';
        // else if (i===3 && j===0) board[i][j] = 'W';
        // else if (i===3 && j===2) board[i][j] = 'B';
        // else if (i===3 && j===4) board[i][j] = 'W';
        // else if (i===4 && j===5) board[i][j] = 'W';
        // else if (i===5 && j===1) board[i][j] = 'W';
        // else if (i===5 && j===4) board[i][j] = 'B';
        // else if (i===6 && j===0) board[i][j] = 'B';
        // else if (i===7 && j===7) board[i][j] = 'B';
        // else board[i][j] = 'blank';
    }
}

let symbols = ['a','b','c','d','e','f','g','h'];

let ourColor = 'W';
let opponentColor = 'B';

let plyDepth = 4;

let heuristicConstant = 21;

let inputMove = {};

let path = [];      // store path to the winning state

let running = false;

let doWeMoveFirst = true;

let isFirstRound = true;

let counter = 0;

