/*
Find the path in matrix with maximum product (from first element to last element), 
while you can move only to right or down
*/

let method_Set_Recursive = (matrix) => {
    let matrixRows = matrix.length;
    let matrixCols = matrix[0].length;

    let wrapper = (sets) => {
        
        let newSets = [];
        let changeFlag = false;
        let maxProduct = Number.MIN_SAFE_INTEGER;

        for(let i=0; i<sets.length; i++){

            let setElem = sets[i][0];
            let setRow = sets[i][1];
            let setCol = sets[i][2];

            maxProduct = Math.max(maxProduct, setElem);

            if(setRow+1<matrixRows){

                changeFlag = true;
                newSets.push([setElem*matrix[setRow+1][setCol], setRow+1, setCol]);
            }

            if(setCol+1<matrixCols){

                changeFlag = true;
                newSets.push([setElem*matrix[setRow][setCol+1], setRow, setCol+1]);
            }
        }

        if(!changeFlag){

            return maxProduct;            
        }

        sets = [];
        return wrapper(newSets);
    }

    let sets = [
        //element, i, j
        [matrix[0][0], 0, 0]
    ];
    return wrapper(sets);
}

let method_Set_Looping = (matrix) => {
    let matrixRows = matrix.length;
    let matrixCols = matrix[0].length;

    let sets = [
        //element, i, j
        [matrix[0][0], 0, 0]
    ];
        
    let maxProduct = Number.MIN_SAFE_INTEGER;

    while(sets.length){
      
        maxProduct = Number.MIN_SAFE_INTEGER;
        let newSets = [];

        for(let i=0; i<sets.length; i++){

            let setElem = sets[i][0];
            let setRow = sets[i][1];
            let setCol = sets[i][2];

            maxProduct = Math.max(maxProduct, setElem);

            if(setRow+1<matrixRows){

                newSets.push([setElem*matrix[setRow+1][setCol], setRow+1, setCol]);
            }

            if(setCol+1<matrixCols){

                newSets.push([setElem*matrix[setRow][setCol+1], setRow, setCol+1]);
            }
        }

        sets = newSets;
    }

    return maxProduct;
}

let method_Two_Matrix = (matrix) => {

    let initNewMatrix = () => {
        let newMatrix = [];
        for(let i=0; i<matrix.length; i++){
            newMatrix[i] = new Array(matrix[i].length).fill(null);
        }
        return newMatrix;
    }
    let minMatrix = initNewMatrix();
    let maxMatrix = initNewMatrix();

    let minValue;
    let maxValue;
    let tempMin;
    let tempMax;

    for(let i=0; i<matrix.length; i++){

        for(let j=0; j<matrix[i].length; j++){

            minValue = Number.MAX_SAFE_INTEGER;
            maxValue = Number.MIN_SAFE_INTEGER;
            
            if(i==0 && j==0){

                minValue = matrix[i][j];
                maxValue = matrix[i][j];
            }

            if(i>0){
                tempMin = Math.min(matrix[i][j]*minMatrix[i-1][j], matrix[i][j]*maxMatrix[i-1][j]);
                minValue = Math.min(tempMin, minValue);

                tempMax = Math.max(matrix[i][j]*minMatrix[i-1][j], matrix[i][j]*maxMatrix[i-1][j]);
                maxValue = Math.max(tempMax, maxValue);
            }

            if(j>0){
                tempMin = Math.min(matrix[i][j]*minMatrix[i][j-1], matrix[i][j]*maxMatrix[i][j-1]);
                minValue = Math.min(tempMin, minValue);

                tempMax = Math.max(matrix[i][j]*minMatrix[i][j-1], matrix[i][j]*maxMatrix[i][j-1]);
                maxValue = Math.max(tempMax, maxValue);
            }

            minMatrix[i][j] = minValue;
            maxMatrix[i][j] = maxValue;
        }
    }

    return maxMatrix[maxMatrix.length-1][maxMatrix[0].length-1]
}

let matrixToStr = (matrix) => {
    // for(let i=0; i<matrix.length; i++){
    //     let row = matrix[i].map(e=>e.toString().padStart(5,' '));
    //     console.log(row.join(''));
    // }
    return matrix.map((row)=>{

        return row.reduce((acc,e)=>acc+e.toString().padStart(5,' '),'');
    }).join('\n');
}

[
     [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ],
    [
        [-1, 2, 3],
        [4, 5, -6],
        [7, 8, 9]
    ],
    [
        [-1, 2, 3],
        [-4, 5, 6],
        [7, 8, -9]
    ],
    [
        [-1, 2, 3],
        [4, 5, 6],
        [7, 8, -9]
    ],
    [
        [10, 10, 2, 1, 20, 4], 
        [1, 1, 1, 30, 2, 5], 
        [1, 10, 4, 1, 2, 1], 
        [1, 1, 2, 20, 1, 4]
    ],
    [
        [1, -2, 3], 
        [4, -5, 6], 
        [-7, -8, 9]
    ]
].forEach(matrix=>{
    console.log(`Matrix is \n${matrixToStr(matrix)}`);
    console.log('Method (Set using Recursion):: ', method_Set_Recursive(matrix));
    console.log('Method (Set using Loops):: ', method_Set_Looping(matrix));
    console.log('Method (using Two Matrix):: ', method_Two_Matrix(matrix));
});