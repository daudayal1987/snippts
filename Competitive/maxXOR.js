//http://codeforces.com/problemset/problem/281/D
let getMaxI = (arr, l, r) => {

    let max = Number.MIN_SAFE_INTEGER;
    let maxI = -1;
    for(let i=l; i<=r; i++){

        if(max < arr[i]){

            max = arr[i];
            maxI = i;
        }
    }

    return maxI;
}

let getSecondMaxI = (arr, l, r, maxI) => {

    let sMaxI = -1;
    let sMax = Number.MIN_SAFE_INTEGER;
    for(let i=l; i<=r; i++){

        if(sMax < arr[i] && arr[maxI] > arr[i]){

            sMax = arr[i];
            sMaxI = i;
        }
    }

    return sMaxI;
}

let getMaxXorSubArray = (arr, l, r) => {

    if(l>r) return 0;

    let maxI = getMaxI(arr, l, r);
    let sMaxI = getSecondMaxI(arr, l, r, maxI);

    let start = (maxI < sMaxI) ? maxI : sMaxI;
    let end = (maxI < sMaxI) ? maxI : sMaxI;
    
    let xOr = arr[maxI] ^ arr[sMaxI];
    return Math.max( xOr, 
        getMaxXorSubArray(arr, l, maxI-1),
        getMaxXorSubArray(arr, maxI+1, r));
}

let program_input = [
    [1, 2, 3, 4],
    [8, 1, 2, 12, 7, 6],
    [4, 6],
    [5, 2, 1, 4, 3],
    [9, 8, 3, 5, 7]
];

program_input.forEach(arr=>{
    console.log(getMaxXorSubArray(arr, 0, arr.length-1));
});