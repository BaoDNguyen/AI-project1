d3.select('#pickColor').on('change',function (){
    opponentColor = this.value;
    if (opponentColor==='B') ourColor = 'W';
    else ourColor = 'B';
});

d3.select('#moveFirst').on('change',function (){
    doWeMoveFirst = this.value;
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
    ctx.font = '30px Arial';
    if (canMove) {
        let from = myOutput.from;
        let to = myOutput.to;
        let str = 'we move from ' + from + ' to ' +to;
        ctx.fillText(str,10,40);

    } else {
        ctx.fillText('We cannot move anymore!',10,40);
    }
    ctx.fill();
    ctx.closePath();
}

function writeBoard (state,isOurMove) {
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
    // let from = (isOurMove) ? path[0].from : inputMove.from;
    // let to = (isOurMove) ? path[0].to : inputMove.to;
    // if (from && to) {
    //     let j1 = symbols.findIndex(e=>e===from.substring(0,1));
    //     let j2 = symbols.findIndex(e=>e===to.substring(0,1));
    //     let i1 = +from.substring(1);
    //     let i2 = +to.substring(1);
    //     let x1 = (j1===j2) ? 30+30*(j1)+15 : 30+30*(j1)+5;
    //     let x2 = (j1===j2) ? 30+30*(j2)+15 : 30+30*(j2)+5;
    //     let y1 = (j1===j2) ? 270-30*(i1+1)-5 : 270-30*(i1+1)-15;
    //     let y2 = (j1===j2) ? 270-30*(i2+1)-5 : 270-30*(i2+1)-15;
    //     ctx.beginPath();
    //     ctx.moveTo(x1,y1);
    //     ctx.lineTo(x2,y2);
    //     ctx.strokeStyle = (isOurMove) ? 'rgb(255,0,0)' : 'rgb(0,0,255)';
    //     ctx.stroke();
    //     ctx.beginPath();
    //     ctx.moveTo(x2,y2);
    //     ctx.lineTo(x2-5,y2-5);
    //     ctx.lineTo(30+30*(j2)+10,270-30*(i2+1));
    //     ctx.lineTo(30+30*(j2)+5,270-30*(i2+1)-5);
    //     ctx.fillStyle = (isOurMove) ? 'rgb(255,0,0)' : 'rgb(0,0,255)';
    //     ctx.fill();
    // }
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
            state =  updateBoard(board,inputMove);
            result = Minimax(state,-Infinity,+Infinity,0,null);
            if (result!=null) writeOutput(path[0],true);
        }
        isFirstRound = false;
    } else {
        state = updateBoard(board,inputMove);
        result = Minimax(state,-Infinity,+Infinity,0,null);
        if (result!=null) writeOutput(path[0],true);
    }
    if (result!=null && path[0]) {
        board = updateBoard(state,path[0]);
        writeBoard(board,true);
        writeBoard(state,false);
    }      // board after we move
    else writeOutput(null,false);
    let t2 = performance.now();
    console.log('running time: '+(t2-t1).toString());
}