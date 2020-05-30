//this function will return first pair of values whose sum is zero 
//the given array will always be sorted
function findFirstSumZeroPair(arr){

    let left = 0;
    let right = arr.length - 1;
    while(left < right){

        let sum = arr[left] + arr[right];
        if( sum === 0 ){

            return [arr[left], arr[right]];
        } else if ( sum > 0 ){

            right--;
        } else {

            left++;
        }
    } 

    return undefined;
}

findFirstSumZeroPair([-3,-2,-1,0,1,2,3]); //[-3,3]
findFirstSumZeroPair([-2,0,1,3]); //undefined
findFirstSumZeroPair([1,2,3]); //undefined
