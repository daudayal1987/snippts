//https://www.codechef.com/problems/CHEFRECP
let program_input = `3
6
1 1 4 2 2 2
8
1 1 4 3 4 7 7 7
8
1 7 7 3 3 4 4 4`;

let isChecfReceipe = (N, ingSeq) => {

    let usedIng = {};
    let lastIng = -1;

    for(let i=0; i<N; i++){

        let currIng = ingSeq[i];
        if( usedIng.hasOwnProperty(currIng) && currIng != lastIng){

            return false;
        }

        usedIng[currIng] = usedIng[currIng] ? usedIng[currIng]+1 : 1;
        lastIng = currIng;
    }

    let uniqCheckLookup = {};
    for(let ing in usedIng){

        if(uniqCheckLookup.hasOwnProperty(usedIng[ing])) return false;
        uniqCheckLookup[usedIng[ing]] = true;
    }
    return true;
}

let main = () => {

    let program_input_array = program_input.split('\n');
    let line = 0;
    let T = Number(program_input_array[line++]);

    for(let i=0; i<T; i++){

        let N = Number(program_input_array[line++]);
        let ingSeq = program_input_array[line++].split(' ').map(Number);
        console.log(isChecfReceipe(N, ingSeq) ? 'YES' : 'NO');
    }
}

main();