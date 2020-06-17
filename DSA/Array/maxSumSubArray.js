/*
Find sum of sub array of given size which has max sum amoungs all subsets of given size
*/

function maxSumSubArray(arr, num){
    if(arr.length < num){

        return false;
    }

    let sum = -Infinity;
    let temp = 0;

    for( let i=0; i<arr.length; i++){
        
        temp = temp + arr[i];
        if( i >= num ){

            temp = temp - arr[i-num];
        }
        
        if( sum < temp ){

            sum = temp;
        }
    }

    return sum;
}

maxSumSubArray([1,2,5,2,8,1,5],4)
maxSumSubArray([4,2,1,6],1)
maxSumSubArray([4,2,1,6,2],4)