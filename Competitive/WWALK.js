//https://www.codechef.com/LTIME84B/problems/WWALK

let main = () => {

    let program_input_array = program_input.split('\n');
    let line = 0;
    let T = Number(program_input_array[line++]);

    for(let i=1; i<=T; i++){

        let N = Number(program_input_array[line++]);
        let walk1 = program_input_array[line++].split(' ').map(Number);
        let walk2 = program_input_array[line++].split(' ').map(Number);

        let weiredWalk = 0;
        for(let j=0; j<N; j++){

            if(walk1[j]==walk2[j]){

                weiredWalk += walk2[j];
            }
        }

        console.log(weiredWalk);
    }
}

var program_input = `3
4
1 3 3 4
1 2 4 4
2
2 3
3 2
2
3 3
3 3`;
main();