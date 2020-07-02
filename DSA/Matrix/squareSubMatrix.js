//Given a 2D array of 1s and 0s, find the largest square subarray of all 1s.

let matrixToString = matrix => {
    return matrix.map(row=>{
        return row.reduce((acc, cell)=>{
            return acc + cell.toString().padStart(5,' ');
        }, '');
    }).join('\n');
}

let method_Naive = (matrix, n, m) => {

    let getMaxFrom = (i, j) => {
        if(matrix[i][j] != 1) return 0;
        if (i == n-1 || j == m-1) return 1;

        let maxCount = 0;
        for(let k=0; k<Math.min(n-i, m-j); k++){
            for(let l=0; l<=k; l++){
                if(matrix[i+k][j+l]!=1 || matrix[i+l][j+k]!=1){
                    // console.debug(`[${i}][${j}]:: ${maxCount}`);
                    return maxCount;
                }
            }
            maxCount++;
        }

        // console.debug(`[${i}][${j}]:: ${maxCount}`);
        return maxCount;
    }

    let maxMatrix = 0;
    for(let i=0; i<n; i++){
        for(let j=0; j<m; j++){
            maxMatrix = Math.max( maxMatrix, getMaxFrom(i, j) );
        }
    }
    
    return maxMatrix;
}

let method_DP = (matrix, n, m) => {
    let dp = new Array(n).fill(0);
    for(let i=0; i<n; i++){
        dp[i] = new Array(m).fill(0);
    }

    for(let i=0; i<n; i++){
        if(matrix[i][0] == 1){
            dp[i][0] = 1;
        }
    }

    for(let j=0; j<m; j++){
        if(matrix[0][j] == 1){
            dp[0][j] = 1;
        }
    }

    let maxCount = 0;
    for(let i=1; i<n; i++){
        for(let j=1; j<m; j++){
            if(matrix[i][j]==1){
                dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1;
                maxCount = Math.max(maxCount, dp[i][j]);
            }
        }
    }

    // console.log(matrixToString(dp));
    return maxCount;
}

[
    [
        [1, 1, 1, 0],
        [1, 1, 1, 1],
        [1, 1, 0, 0],
    ],
    [
        [1, 1, 1, 0],
        [1, 1, 1, 1],
        [1, 1, 1, 0],
    ],
    [
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
    ],
    [
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1]
    ]
].forEach(matrix=>{
    console.log(matrixToString(matrix));
    console.log('Max square submatix (Method Naive):: ', method_Naive(matrix, matrix.length, matrix[0].length));
    console.log('Max square submatix (Method DP):: ', method_DP(matrix, matrix.length, matrix[0].length));
});