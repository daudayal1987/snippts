//Median of two sorted array of equal length
class subArray{
    constructor(){
        this.array = [];
        this.start = -1;
        this.size = 0;
    }

    getFromArray(array){
        this.array = array;
        this.start = 0;
        this.size = array.length;
        return this;
    }

    getFirst(){
        return this.array[this.start];
    }

    getLast(){
        return this.array[this.start + this.size - 1];
    }

    getSize(){
        return this.size;
    }

    getMedian(){

        let MI = parseInt(this.size / 2);
        return (this.size%2 == 0) ? 
            (this.array[this.start+MI-1]+this.array[this.start+MI]) / 2 : 
            this.array[this.start+MI];
    }

    getSubArray(i, j){
        let sa = new subArray();
        sa.array = this.array;
        sa.start = this.start + i;
        sa.size = j - i;
        return sa;
    }
}

let getMedian = (arr1, arr2) => {

    if(arr1.getSize() == 1){

        return (arr1.getFirst() + arr2.getFirst()) / 2;
    }

    if(arr1.getSize() == 2){

        return (
            Math.max(arr1.getFirst(), arr2.getFirst()) + Math.min(arr1.getLast(), arr2.getLast()) 
        ) / 2;
    }

    let m1 = arr1.getMedian();
    let m2 = arr2.getMedian();

    // console.debug(m1, m2);
    if(m1 == m2){

        return m1;
    }

    let MI = parseInt(arr1.getSize() / 2);
    if(m1 < m2){

        if(arr1.getSize()%2 == 0){
            
            return getMedian(arr1.getSubArray(MI, arr1.getSize()), arr2.getSubArray(0, MI));
        }else{

            return getMedian(arr1.getSubArray(MI, arr1.getSize()), arr2.getSubArray(0, MI+1));
        }
    }else{

        if(arr1.getSize%2 == 0){

            return getMedian(arr1.getSubArray(0, MI), arr2.getSubArray(MI, arr2.getSize()));
        }else{

            return getMedian(arr1.getSubArray(0, MI+1), arr2.getSubArray(MI, arr2.getSize()));
        }
    }
}

[
    [
        [1],
        [2]
    ],
    [
        [1, 2],
        [3, 4]
    ],
    [
        [1, 12, 15, 26, 38],
        [2, 13, 17, 30, 45]
    ],
    [
        [1, 12, 15, 26, 38, 40],
        [2, 13, 17, 30, 45, 50]
    ]
].forEach(tc=>{
    console.log(`array 1 :: [ ${tc[0].join(', ')} ]`);
    console.log(`array 2 :: [ ${tc[1].join(', ')} ]`);
    console.log(`median:: ${getMedian(new subArray().getFromArray(tc[0]), new subArray().getFromArray(tc[1]))}`);
});