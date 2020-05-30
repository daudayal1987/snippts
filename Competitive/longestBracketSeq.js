//http://codeforces.com/contest/5/problem/C
let getResult = (str) => {

    let stack = [];
    let inValidStr = false;
    let validCount = 0;
    let longestValidLen = 0;
    let currentValidLen = 0;

    for(let i=0; i<str.length; i++){

        if(str[i] == ')' && stack.length==0){

            inValidStr = false;
            currentValidLen = 0;
            continue;
        }

        if(str[i] == '('){

            if(stack.length==0){

                inValidStr = false;
                currentValidLen = 0;
            }
            stack.push(str[i]);
            continue;
        }

        if( stack[stack.length-1] == '(' ){

            stack.pop();
            if(!inValidStr){

                inValidStr = true;
                validCount++;
            }

            currentValidLen += 2;
            longestValidLen = Math.max(longestValidLen, currentValidLen);
        }
    }

    // if(stack.length>0){
    //     validCount--;
    // }

    // validCount = validCount || 1;
    return [longestValidLen, validCount];
}

[
    ')((())))(()())',
    '))(',
    '(())()',
    '()',
    '()(()))(()(())())',
    ')(',
    '(()',
    '()(()',
    '(()))('
].forEach(str=>{
    console.log(`${str} => ${getResult(str)}`);
});