//https://www.spoj.com/problems/HISTOGRA/

function main(){

    let input_array = program_input.split('\n');
    let T = Number(input_array[0]);

    for(let i=1; i<=T; i++){ if(i!=2) continue;

        let givenArr = input_array[i].split(' ').map(Number);
        let N = givenArr[0];
        let arr = givenArr.splice(1);
        
        console.log(arr.join(' '));
        // console.log(getMaxArea_1(arr, 0, N-1));
        // console.log(getMaxArea_2(arr, 0, N-1));
        console.log(getMaxArea_3(arr, N));
    }
}

function getMaxArea_1(arr, left, right){

    if(left>right) return 0;

    // console.log(left, right, arr.slice(left, right+1), Math.min(...arr.slice(left, right+1)))
    let area = (right-left+1) * Math.min(...arr.slice(left, right+1));
    return Math.max(area, getMaxArea_1(arr, left+1, right), getMaxArea_1(arr, left, right-1));
}

function getMaxArea_2(arr, left, right){

    let maxArea = 0;
    for(let i=left; i<right; i++){

        for(let j=i+1; j<=right; j++){

            let area = (j-i+1) * Math.min(...arr.slice(i, j+1));
            maxArea = Math.max(maxArea, area);
        }
    }
    return maxArea;
}

function getMaxArea_3(arr, N){
    
    let stack = [];
    let maxArea = 0;

    for(let i=0; i<N; i++){

        if(stack.length == 0 || arr[ stack[stack.length-1] ] <= arr[i]){

            stack.push(i);
            console.log(i, stack);
        }else{

            let stackTop = stack.pop();
            let calc = stack.length == 0 ? i : (i - stack[stack.length-1] - 1);
            let areaWithTop = arr[stackTop] * calc;

            if(maxArea < areaWithTop){

                maxArea = areaWithTop;
            }

            console.log(i, stack, stackTop+'/'+calc, areaWithTop, maxArea);
        }
    }

    while(stack.length){

        let stackTop = stack.pop();
        let calc = stack.length == 0 ? N : (N - stack[stack.length-1] - 1);
        let areaWithTop = arr[stackTop] * calc;

        if(maxArea < areaWithTop){

            maxArea = areaWithTop;
        }

        console.log(N, stack, stackTop+'/'+calc, areaWithTop, maxArea);
    }

    return maxArea;
}

let program_input = `4
10 2 1 4 5 1 3 3 1 1 1
7 6 2 5 4 5 1 6
7 2 1 4 5 1 3 3
4 1000 1000 1000 1000`;
main();