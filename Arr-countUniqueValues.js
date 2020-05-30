//count unique values in an array
//array given is always sorted
function countUniqueValues(arr){

    let count = 0;
    for( let i=0; i<arr.length;){

        count++;
        let j=i+1;
        while(arr[i] == arr[j]) j++;
        i=j;
    }

    return count;
}

countUniqueValues([1,1,1,1,1,1]); //1
countUniqueValues([1,1,1,1,1,2]); //2
countUniqueValues([-2,-1,-1,0,1]); //4