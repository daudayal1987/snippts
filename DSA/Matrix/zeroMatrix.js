//If any cell of matrix is 1 / true then make full row and col 1 / true
let printMatrix = (matrix) => {
    for(let i=0; i<matrix.length; i++){
        console.log(matrix[i].reduce((acc,e)=>acc+e.toString().padStart(5,' '), ''));
    }
}

let cloneMatrix = (matrix) => {
    let cloneMatrix = [];
    matrix.forEach(row=>{
        cloneMatrix.push(row.map(e=>e));
    });
    return cloneMatrix;
}

let method_UsingHashing = (matrix, n, m) => {
    let rowHash = {};
    let colHash = {};
    for(let i=0; i<n; i++){
        for(let j=0; j<m; j++){
            if(matrix[i][j] == 1){
                rowHash[i] = true;
                colHash[j] = true;
            }
        }
    }

    for(let i in rowHash){
        for(let j=0; j<m; j++){
            matrix[i][j] = 1;
        }
    }

    for(let j in colHash){
        for(let i=0; i<n; i++){
            matrix[i][j] = 1;
        }
    }

    return matrix;
}

let method_Optimized = (matrix, n, m) => {

    let rowFlag = false;
    let colFlag = false;

    for(let i=0; i<n; i++){

        for(let j=0; j<m; j++){

            if(matrix[i][0] == 1){
                rowFlag = true;
            }

            if(matrix[0][j] == 1){
                colFlag = true;
            }

            if(matrix[i][j]==1){
                matrix[i][0] = 1;
                matrix[0][j] = 1;    
            }
        }
    }

    for(let i=1; i<n; i++){
        for(let j=1; j<m; j++){
            if(matrix[i][0] == 1 || matrix[0][j] == 1){
                matrix[i][j] = 1;
            }
        }
    }

    if(rowFlag){
        for(let j=0; j<m; j++){
            matrix[0][j] = 1;
        }
    }

    if(colFlag){
        for(let i=0; i<n; i++){
            matrix[i][0] = 1;
        }
    }

    return matrix;
}

[
    [
        [1, 0],
        [0, 0]
    ],
    [
        [0, 0, 0],
        [0, 0, 1]
    ],
    [
        [1, 0, 0 ,1],
        [0, 0, 1 ,0],
        [0, 0, 0 ,0]
    ],
    [
        [0, 0, 0 ,0],
        [0, 0, 0 ,0],
        [0, 0, 0 ,1]
    ]
].forEach(matrix => {
    console.log("Original Matrix:: ");
    printMatrix(matrix);
    
    console.log("Modify (Hashing Method):: ");
    printMatrix(method_UsingHashing(cloneMatrix(matrix), matrix.length, matrix[0].length));

    console.log("Modify (Optimized Method):: ");
    printMatrix(method_Optimized(cloneMatrix(matrix), matrix.length, matrix[0].length));
});