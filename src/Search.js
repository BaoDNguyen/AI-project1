function Minimax (state,alpha,beta,currentDepth,move) {
    if (currentDepth === plyDepth) {
        if (move) path[currentDepth-1] = move;
        return evaluateHeuristics(state);
    } else {
        let possibleMoves = generateChildren(state,currentDepth);
        if (possibleMoves.length === 0) {
            if (move) path[currentDepth-1] = move;
            return evaluateHeuristics(state);
        } else {
            if (currentDepth % 2 === 0) {       // Max
                let bestVal = - Infinity;
                for (let i = 0; i < possibleMoves.length; i++) {
                    let child = updateBoard(state,possibleMoves[i]);
                    let val = Minimax(child,alpha,beta,currentDepth+1,possibleMoves[i]);
                    bestVal = (val > bestVal) ? val : bestVal;
                    if (bestVal > alpha) path[currentDepth] = possibleMoves[i];
                    alpha = (bestVal > alpha) ? bestVal : alpha;
                    if (beta <= alpha) break;
                }
                return bestVal;
            } else {        // Min
                let bestVal = + Infinity;
                for (let i = 0; i < possibleMoves.length; i++) {
                    let child =updateBoard(state,possibleMoves[i]);
                    let val = Minimax(child,alpha,beta,currentDepth+1);
                    bestVal = (val < bestVal) ? val : bestVal;
                    if (bestVal < beta) path[currentDepth] = possibleMoves[i];
                    beta = (bestVal < beta) ? bestVal : beta;
                    if (beta <= alpha) break;
                }
                return bestVal;
            }
        }
    }


}