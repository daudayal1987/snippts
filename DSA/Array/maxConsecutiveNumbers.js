let method_Naive = (arr) =>{
    if(arr.length<2) return arr.length;
    
    let sortedArray = arr.sort((a,b)=>a-b);
    let maxCount = 1;
    let count = 1;

    for(let i=1; i<sortedArray.length; i++){
        if(sortedArray[i-1]+1 == sortedArray[i]){
            count++;
        }else{
            count = 1;
        }

        if(count > maxCount){
            maxCount = count;
        }
    }

    return maxCount;
}

let method_Optimized = (arr) => {
    if(arr.length < 1) return arr.length;

    let hash = {};
    for(let i=0; i<arr.length; i++){
        hash[arr[i]] = true;
    }

    let maxCount = 1;
    for(let e in hash){
        e = Number(e);
        if(hash[e-1]) {
            continue;
        }

        let count = 1;
        while(hash[++e]) {
            count++;
        }

        if(count > maxCount) {
            maxCount = count;
        }
    }

    return maxCount
}

[
    [1, 94, 93, 1000, 5, 92, 78],
    [1, 5, 92, 4, 78, 6, 7],
].forEach(arr=>{
    console.log(arr.join(' '));
    console.log('Method (Naive) ', method_Naive([...arr]));
    console.log('Method (Optimized) ', method_Optimized([...arr]));
});