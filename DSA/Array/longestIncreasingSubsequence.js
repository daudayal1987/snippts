let method_DP = (arr) => {
    let LSP = new Array(arr.length).fill(1);
    for(let i=1; i<arr.length; i++){

        for(let j=0; j<i; j++){

            if(arr[j] < arr[i]){

                LSP[i] = Math.max(LSP[i], LSP[j]+1);
            }
        }
    }

    // console.log(LSP)
    return Math.max(...LSP);
}

let method_Recursive = (arr) => {
    let maxCount = 1;

    let helper = (n) => {

        if(n<=1) return 1;

        let currentMax = 1;
        for(let i=1; i<n; i++){

            let previousMax = helper(i);
            if(arr[i-1] < arr[n-1] && previousMax+1 > currentMax){
                currentMax = previousMax+1;
            }
        }

        if(maxCount < currentMax){
            maxCount = currentMax;
        }

        return currentMax;
    }

    helper(arr.length);
    return maxCount;
}

[
    [3, 10, 2],
    [3, 10, 2, 1, 20],
    [50, 3, 10, 7, 40, 80],
    [3, 2],
    [10, 22, 9, 33, 21, 50, 41, 60, 80],
    [10, 22, 9, 8, 7, 8, 9, 10, 11, 33, 21, 50, 41, 60, 80]
].forEach(arr=>{
    console.log(arr.join(' '));
    console.log('Method (Recursive):: ', method_Recursive([...arr]));
    console.log('Method (DP):: ', method_DP([...arr]));
});