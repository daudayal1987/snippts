let swap = (arr, a, b) => {
    // console.log(a, b);
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

let partition = (arr, low, high) => {

    let pivot = arr[high];
    let small = low - 1;
    for(let i=low; i<=high-1; i++){

        if(arr[i] < pivot){

            small++;
            swap(arr, small, i);
        }
    }

    swap(arr, small+1, high);
    return small+1;
}

let quickSort = (arr, low, high) => {

    if(low<high){

        let pi = partition(arr, low, high);
        quickSort(arr, low, pi-1);
        quickSort(arr, pi+1, high);
    }
}

[
    [10, 7, 8, 9, 1, 5],
    [5, 7, 8, 9, 1, 10],
    [5, 7, 8, 9, 1, 10, 12, 13]
].forEach(arr=>{
    console.log(`Original array::`);
    console.log(`${arr.join(' ')}`);
    quickSort(arr, 0, arr.length - 1);
    console.log(`Sorted array::`);
    console.log(`${arr.join(' ')}`);
});