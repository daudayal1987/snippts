/*
Given an array which contains elements 1 <= i <= n and any element can repeat any number of times
findout duplicate elements and print the repeated elements only once
*/

let method_HashObject = (arr) => {
    let hash = {};
    for(let i=0; i<arr.length; i++){
        let val = arr[i];
        hash[val] = hash[val] || 0;
        hash[val]++;
    }

    let dups = [];
    for(let [idx, val] of Object.entries(hash)){
        if(val > 1){
            dups.push(idx);
        }
    }

    return dups;
}

let method_HashArray = (arr) => {
    let tempArr = new Array(arr.length).fill(0);
    for(let i=0; i<arr.length; i++){
        let index = arr[i]-1;
        tempArr[index]++;
    }

    let dups = [];
    for(let i=0; i<arr.length; i++){
        if(tempArr[i] > 1){
            dups.push(i+1);
        }
    }

    return dups;
}

let method_Set = (arr) => {
    let resultSet = new Set();

    for(let i=0; i<arr.length; i++){
        let index = Math.abs(arr[i]) - 1;
        if(arr[index] > 0){
            arr[index] = -1 * arr[index];
        }else{
            resultSet.add(index+1);
        }
    }

    return Array.from(resultSet.keys());
}

let method_Increment = (arr) => {
    for(let i=0; i<arr.length; i++){
        arr[i] = arr[i] - 1;
    }

    for(let i=0; i<arr.length; i++){
        let index = arr[i] % arr.length;
        arr[index] = arr[index] + arr.length;
    }

    let dups = [];
    for(let i=0; i<arr.length; i++){
        if(parseInt(arr[i]/arr.length) > 1){
            dups.push(i+1);
        }
    }

    return dups;
}

[
    [1, 2, 3],
    [1, 2, 2],
    [3, 3, 3],
    [2, 1, 2, 1],
    [1, 2, 3, 4, 5, 6, 3]
].forEach(arr=>{
    console.log(`${arr}`);
    console.log('Method (using hash object) :: ', method_HashObject([...arr]));
    console.log('Method (using hash array) :: ', method_HashArray([...arr]));
    console.log('Method (using set) :: ', method_Set([...arr]));
    console.log('Method (using increment) :: ', method_Increment([...arr]));
});