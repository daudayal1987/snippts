//https://www.geeksforgeeks.org/next-greater-number-than-n-with-the-same-quantity-of-digits-a-and-b/
function main(){
    
    let input_array = program_input.split('\n');
    let line_num = 0;
    let T = input_array[line_num++];
    
    for(let i=0; i<T; i++){
        
        let N = Number(input_array[line_num++]);
        let nums = input_array[line_num++].split(' ').map(Number);

        let outs = [];

        let stack = [];
        for(let j=0; j<nums.length; j++){

            let currNumsCount = new Array(nums.length).fill(0);
            currNumsCount[j]++;
            stack.push(
                [
                    nums[j],
                    currNumsCount
                ]
            );
        }

        // console.log(JSON.stringify(stack));

        while(outs.length<1){

            let tempStack = stack;
            // console.log("Here 1", tempStack.length, tempStack);
            stack = [];
            while(tempStack.length){

                // console.log("Here 2", tempStack.length, tempStack);
                let stackValue = tempStack.pop();
                // console.log("stackValue ",stackValue);
                let currOut = stackValue[0];
                let currNumsCount = stackValue[1];

                let allEqual = false;
                for(let j=0; j<currNumsCount.length-1;j++){

                    allEqual = currNumsCount[j] == currNumsCount[j+1];
                }

                if(allEqual && currOut > N){

                    outs.push(currOut);
                    // console.log("Result ", currOut);
                    continue;
                }

                for(let j=0; j<nums.length; j++){

                    let currNumsCount = stackValue[1].slice();
                    currNumsCount[j]++;
                    stack.push(
                        [
                            currOut*10+nums[j],
                            currNumsCount
                        ]
                    );   
                }
            }

            // console.log(JSON.stringify(stack));
        }

        console.log(N, Math.min(...outs));
    }
}

let program_input=`2
4500
4 7
99999999
6 7`;
main();