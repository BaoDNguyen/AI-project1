d3.select('#pickColor').on('change',function (){
    opponentColor = this.value;
    if (opponentColor==='B') ourColor = 'W';
    else ourColor = 'B';
});

d3.select('#moveFirst').on('change',function (){
    doWeMoveFirst = this.value === 'computer';
});

d3.select('#myInput1').on('input',function (){
    inputMove.from = this.value;
});

d3.select('#myInput2').on('input',function (){
    inputMove.to = this.value;
});

function writeOutput (myOutput,canMove) {
    let canvas = document.getElementById("myOutput");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.font = '20px Arial';
    if (canMove) {
        let from = myOutput.from;
        let to = myOutput.to;
        let str = 'Computer moves from ' + from + ' to ' +to;
        ctx.fillText(str,10,40);

    } else {
        ctx.fillText('Computer cannot move!',10,40);
    }
    ctx.fill();
    ctx.closePath();
}

function writeBoard (state,isOurMove,withArrows) {
    let canvas = (!isOurMove) ? document.getElementById('inputBoard') : document.getElementById('outputBoard');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.rect(30,0,240,240);
    ctx.fillStyle = 'rgb(220,220,220)';
    ctx.fill();
    ctx.closePath();
    for (let i = 0; i < 9; i++) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(200,200,200)';
        ctx.moveTo(30,270-30*i-30);
        ctx.lineTo(270,270-30*i-30);
        ctx.stroke();
        ctx.closePath();
        for (let j = 0; j < 9; j++) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgb(200,200,200)';
            ctx.moveTo(30*j+30,0);
            ctx.lineTo(30*j+30,240);
            ctx.stroke();
            ctx.closePath();
            if (i===0) {
                if (j!==0) {
                    ctx.beginPath();
                    ctx.font = '20px Arial';
                    ctx.fillStyle = 'rgb(0,0,0)';
                    ctx.fillText(symbols[j-1],30*j+5,270-30*i-5);
                    ctx.fill();
                    ctx.closePath();
                }
            } else {
                if (j === 0) {
                    ctx.beginPath();
                    ctx.font = '20px Arial';
                    ctx.fillStyle = 'rgb(0,0,0)';
                    ctx.fillText((i-1).toString(),30*j+5,270-30*i-5);
                    ctx.fill();
                    ctx.closePath();
                } else {
                    if (state[j-1][i-1] !== 'blank') {
                        ctx.beginPath();
                        ctx.fillStyle = state[j-1][i-1] === 'B' ? 'rgb(0,0,0)' : 'rgb(255,255,255)';
                        ctx.arc(30*i+15,270-30*j-15,10,0,2*Math.PI);
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }
        }
    }
    if (withArrows) {
        let from = (isOurMove) ? path[0].from : inputMove.from;
        let to = (isOurMove) ? path[0].to : inputMove.to;
        if (from && to) {
            let j1 = symbols.findIndex(e=>e===from.substring(0,1));
            let j2 = symbols.findIndex(e=>e===to.substring(0,1));
            let i1 = +from.substring(1);
            let i2 = +to.substring(1);
            let x1 = 30+30*(j1)+15;
            let y1 = 270-30*(i1+1)-15;
            let x2, y2;
            let x3, y3, x4, y4;
            if (j1===j2) {
                x2 = 30+30*(j2)+15;
                if (i1 < i2) {
                    y2 = 270-30*(i2+1)-5;
                    x3 = x2-5; y3 = y2+5;
                    x4 = x2+5; y4 = y2+5;
                } else {
                    y2 = 270-30*(i2+1)-25;
                    x3 = x2-5; y3 = y2-5;
                    x4 = x2+5; y4 = y2-5;
                }
            } else {
                y2 = 270-30*(i2+1)-15;
                if (j1 < j2) {
                    x2 = 30+30*(j2)+5;
                    x3 = x2-5; y3 = y2-5;
                    x4 = x2-5; y4 = y2+5;
                } else {
                    x2 = 30+30*(j2)+25;
                    x3 = x2+5; y3 = y2-5;
                    x4 = x2+5; y4 = y2+5;
                }
            }
            ctx.beginPath();
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2,y2);
            ctx.strokeStyle = (isOurMove) ? 'rgb(255,0,0)' : 'rgb(0,0,255)';
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x2,y2);
            ctx.lineTo(x3,y3);
            ctx.lineTo(x4,y4);
            ctx.lineTo(x2,y2);
            ctx.fillStyle = (isOurMove) ? 'rgb(255,0,0)' : 'rgb(0,0,255)';
            ctx.fill();
        }
    }
}

function writeError(str) {
    let canvas = document.getElementById('myIns');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.font = '20px Arial';
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillText(str,10,40);
    ctx.fill();
    ctx.closePath();
}

function writeCounter(counter) {
    let canvas = document.getElementById('counter');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.font = '20px Arial';
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillText('Total rounds for computer and player: '+counter.toString(),10,40);
    ctx.fill();
    ctx.closePath();
}

function main() {
    let t1 = performance.now();
    let result = null;
    let state = null;       // board after opponent's move
    path.length = 0;
    for (let i = 0; i < plyDepth; i++) {
        path[i] = {};
    }
    if (isFirstRound) {        // first move
        if (doWeMoveFirst) {
            state = board.map(e=>e.map(e_=>e_));
            result = Minimax(board,-Infinity,+Infinity,0,null);
            if (result!=null) writeOutput(path[0],true);
        } else {
            if (inputMove.from && inputMove.to) {
                // check inputMove
                let str1 = inputMove.from;
                let str2 = inputMove.to;
                let col1 = symbols.findIndex(e=>e===str1.substring(0,1));
                let col2 = symbols.findIndex(e=>e===str2.substring(0,1));
                let row1 = +str1.substring(1);
                let row2 = +str2.substring(1);
                if (col1!==-1 && col2!==-1 && row1>=0 && row1 <=7 && row2>=0 && row2<=7) {
                    // run program
                    state =  updateBoard(board,inputMove);
                    if (typeof(state) === 'string') writeError('Wrong input move!');
                    else {
                        result = Minimax(state,-Infinity,+Infinity,0,null);
                        if (result!=null) writeOutput(path[0],true);
                    }
                } else writeError('Wrong input move!');
            } else writeError('Please input your move!')
        }
    } else {
        if (inputMove.from && inputMove.to) {
            // check inputMove
            let str1 = inputMove.from;
            let str2 = inputMove.to;
            let col1 = symbols.findIndex(e=>e===str1.substring(0,1));
            let col2 = symbols.findIndex(e=>e===str2.substring(0,1));
            let row1 = +str1.substring(1);
            let row2 = +str2.substring(1);
            if (col1!==-1 && col2!==-1 && row1>=0 && row1 <=7 && row2>=0 && row2<=7) {
                state = updateBoard(board,inputMove);
                if (typeof (state) === 'string') writeError('Wrong input move!');
                else {
                    result = Minimax(state,-Infinity,+Infinity,0,null);
                    if (result!=null) writeOutput(path[0],true);
                }
            } else writeError('Wrong input move!');
        } else writeError('Please input your move!')

    }
    if (result!=null && path[0].from && path[0].to && state!=null) {
        board = updateBoard(state,path[0]);
        writeBoard(board,true,true);
        if (isFirstRound && doWeMoveFirst) writeBoard(state,false,false);
        else writeBoard(state,false,true);
        counter = counter + 2;
        isFirstRound = false;
    } else {
        if (state == null) writeError('Need correct input');
        else writeOutput(null,false);
    }
    inputMove = {};
    writeCounter(counter);
    let t2 = performance.now();
    console.log('running time: '+(t2-t1).toString());
}