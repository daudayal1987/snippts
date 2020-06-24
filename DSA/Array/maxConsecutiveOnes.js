//Find max consecutive ones and zeros in binary array
let maxOnes = (arr) => {
    let maxCount = 0;
    let currCount = 0;
    for(let i=0; i<arr.length; i++){
        if(arr[i] == 1){
            currCount++;
        }else{
            currCount = 0;
        }

        if(currCount > maxCount){
            maxCount = currCount;
        }
    }

    return maxCount;
}

[
    [1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1],
    [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
].forEach(arr=>{
    console.log(arr.join(''));
    console.log('Max ones:: ', maxOnes(arr));
});