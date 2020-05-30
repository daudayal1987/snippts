//this function will find pair in given array which average is also given
//given array with always be sorted
function findPairWithGivenAverage(arr, avg){

    let start = 0,   
        end = arr.length - 1;
    let pairs = [];

    while(start < end){

        let pairAvg = (arr[start] + arr[end]) / 2;
        if( pairAvg == avg ){

            pairs.push( [arr[start], arr[end]] );
            start++;
        }else if( pairAvg < avg ){

            start++;
        }else{

            end--;
        }
    }

    if( pairs.length < 1 ){

        return undefined
    }else{
        
        return pairs;   
    }
}

findPairWithGivenAverage([1,2,3],2.5);
findPairWithGivenAverage([0,1,2,3,4,5,6,7,8,9,10,11,12], 8);