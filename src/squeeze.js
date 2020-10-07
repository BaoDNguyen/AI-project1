function checkSqueeze(state,color,row,col) {
    let result = state.map(e=>e.map(e_=>e_));
    let eliminate = [];
    // check row
    let squeeze = [];
    let start = -1;
    for (let i = 0; i <= col; i++) {        // get left part of the (row,col)
        if (result[row][i] !== 'blank') {squeeze.push(result[row][i]); start = start !== -1 ? start : i;}
        else {squeeze.length = 0; start = -1;}
    }
    for (let i = col+1; i <8; i++) {        // get the right part
        if (result[row][i] !== 'blank') squeeze.push(result[row][i]);
        else break;
    }
    if (squeeze.length > 2) {
        let changeArrRow = [];  // store index of color change in squeeze
        for (let i = 0; i < squeeze.length-1; i++) {
            if (squeeze[i] !== squeeze[i+1]) changeArrRow.push(i);
        }
        if (changeArrRow.length > 1) {
            for (let i = 0; i < changeArrRow.length-1; i++) {
                if (squeeze[changeArrRow[i]] === color) {     // outside => remove inside
                    for (let j = start+changeArrRow[i]+1; j <= start+changeArrRow[i+1]; j++) {
                        if (eliminate.length > 0) {
                            if (eliminate.findIndex(e=>e[1]===j)===-1) eliminate.push([row,j]);
                        } else eliminate.push([row,j]);
                    }
                } else {        // inside => remove two pieces outside
                    if (eliminate.length > 0) {
                        if (eliminate.findIndex(e=>e[1]===start+changeArrRow[i])===-1) eliminate.push([row,start+changeArrRow[i]]);
                    } else eliminate.push([row,start+changeArrRow[i]]);
                    if (eliminate.length > 0) {
                        if (eliminate.findIndex(e=>e[1]===start+changeArrRow[i+1]+1)===-1) eliminate.push([row,start+changeArrRow[i+1]+1]);
                    } else eliminate.push([row,start+changeArrRow[i+1]+1]);
                }
            }
        }
    }
    // check column
    squeeze.length = 0;
    start = -1;
    for (let i = 0; i <= row; i++) {        // get below part of the (row,col)
        if (result[i][col] !== 'blank') {squeeze.push(result[i][col]); start = start !== -1 ? start : i;}
        else {squeeze.length = 0; start = -1;}
    }
    for (let i = row+1; i <8; i++) {        // get the above part
        if (result[i][col] !== 'blank') squeeze.push(result[i][col]);
        else break;
    }
    if (squeeze.length > 2) {
        let changeArrCol = [];  // store index of color change in squeeze
        for (let i = 0; i < squeeze.length-1; i++) {
            if (squeeze[i] !== squeeze[i+1]) changeArrCol.push(i);
        }
        if (changeArrCol.length > 1) {
            for (let i = 0; i < changeArrCol.length-1; i++) {
                if (squeeze[changeArrCol[i]] === color) {     // outside => remove inside
                    for (let j = start+changeArrCol[i]+1; j <= start+changeArrCol[i+1]; j++) {
                        if (eliminate.length > 0) {
                            if (eliminate.findIndex(e=>e[0]===j)===-1) eliminate.push([j,col]);
                        } else eliminate.push([j,col]);
                    }
                } else {        // inside => remove two pieces outside
                    if (eliminate.length > 0) {
                        if (eliminate.findIndex(e=>e[0]===start+changeArrCol[i])===-1) eliminate.push([start+changeArrCol[i],col]);
                    } else eliminate.push([start+changeArrCol[i],col]);
                    if (eliminate.length > 0) {
                        if (eliminate.findIndex(e=>e[0]===start+changeArrCol[i+1]+1)===-1) eliminate.push([start+changeArrCol[i+1]+1,col]);
                    } else eliminate.push([start+changeArrCol[i+1]+1,col]);
                }
            }
        }
    }
    // console.log(result);
    // console.log(eliminate);
    if (eliminate.length > 0) {
        eliminate.forEach(e=>{
            result[e[0]][e[1]] = 'blank';
        });
    }
    // console.log(result);
    return result;
}