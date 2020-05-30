//http://codeforces.com/contest/343/problem/B

let canUntangle = (str) => {

    let stack = [];
    for(let i=0; i<str.length; i++){

        let ch = str[i];
        if(stack.length == 0){

            stack.push(ch);
            continue;
        }

        let lastCh = stack[stack.length-1];
        if(lastCh == ch){

            stack.pop();
        }else{

            stack.push(ch);
        }

        // console.debug(stack);
    }

    return (stack.length==0) ? 'YES' : 'NO';
}


[
    '-++-',
    '+-',
    '++',
    '-'
].forEach(s=>{
    console.log(`${s} Can UnTanble: ${canUntangle(s)}`);
});