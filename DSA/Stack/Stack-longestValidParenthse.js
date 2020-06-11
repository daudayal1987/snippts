let inputs = [
"((()",
")()())"
];

for( let str of inputs ){
    console.log("For",str,"Max: ",getLongestValidParenthse(str));
}

function getLongestValidParenthse(str){

    let maxLength = 0;
    let currLength = 0;
    let stack = [];
    for(let c of str){

        if(c=='(') {

            stack.push(c);
            continue;
        }else{

            if(stack.length==0){

                maxLength = Math.max(currLength, maxLength);
                currLength = 0;
            }else{

                let popC = stack.pop();
                if( popC == '(' ){

                    currLength++;
                }else{

                    maxLength = Math.max(currLength, maxLength);
                    currLength = 0;
                }
            }
        }
    }

    maxLength = Math.max(currLength, maxLength);
    return maxLength;
}