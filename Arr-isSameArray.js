//Check if arr_2 has squrare for each of the element of arr_1
//Also validate that the count of squrare is exactly same as the count of value in arr_1
function isSameArray(arr_1, arr_2){

    if(arr_1.length !== arr_2.length){

        return false;
    }

    let valFrequencyCounter_1 = {};
    let valFrequencyCounter_2 = {};

    for( let val of arr_1 ){

        valFrequencyCounter_1[val**2] == ( valFrequencyCounter_1[val] || 0 ) + 1;
    }

    for( let val of arr_2 ){

        valFrequencyCounter_2[val] = ( valFrequencyCounter_2[val] || 0 ) + 1;
    }

    for( let [val, count] of Object.entries(valFrequencyCounter_1) ){

        if( !valFrequencyCounter_2.hasOwnProperty(val) ){

            return false;
        }

        if( valFrequencyCounter_2[val] !== count ){

            return false;
        }
    }

    return true;
}

isSameArray([1,2,3], [4,1,9]); //true
isSameArray([1,2,3], [1,9]); //false
isSameArray([1,2,1], [4,4,1]); //false