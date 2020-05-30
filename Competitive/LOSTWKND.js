//https://www.codechef.com/LTIME84B/problems/LOSTWKND

let main = () => {

    let program_input_array = program_input.split('\n');
    let T = Number(program_input_array[0]);
    for(let i=1; i<=T; i++){

        let arr = program_input_array[i].split(' ').map(Number);
        let sum = arr.slice(0,5).reduce((acc, e)=>acc+e,0);
        if(arr[5]*sum > 120){

            console.log('YES');
        }else{
            
            console.log('NO');
        }
    }
}

var program_input = `2
14 10 12 6 18 2
10 10 10 10 10 3`;
main();
