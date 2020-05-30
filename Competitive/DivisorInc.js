//https://community.topcoder.com/stat?c=problem_statement&pm=6186&rd=9823
let calculateMinSteps_1 = (N, M) => {
    let steps = 0;
    let used = [N];
    while(N<M){

        steps++;

        let temp = M-N;
        if(temp == 1 || temp == N){

            return -1
        }
        if(M%temp == 0){

            N = N + temp;
        }else{

            let i = 2;
            while(N%i!=0 || N+(N/i) > M){
                // console.log(i)
                i++;
            }

            N = N+(N/i);
        }

        used.push(N);
        // console.log(N);
    }

    // console.log(used.join(' '));
    return steps;
}

let calculateMinSteps_2 = (M, N) => {

    let minSteps = new Array(N+1).fill(Number.MAX_SAFE_INTEGER);
    let mediators = [M];
    let currentStep = 0;

    minSteps[M] = 0;
    for(let i=M+1; i<=N; i++){

        for(let j=2; j*j<=i; j++){

            if(i%j!=0) continue;
            // console.debug(`${i} ${j}`);

            let divisor = i/j;
            if((i-divisor)*2 != i && i-divisor >= M && i-divisor <= N && minSteps[i-divisor]+1 < minSteps[i]){

                minSteps[i] = minSteps[i-divisor]+1;
            }

            divisor = i/divisor;
            if((i-divisor)*2 != i && i-divisor >= M && i-divisor <= N && minSteps[i-divisor]+1 < minSteps[i]){

                minSteps[i] = minSteps[i-divisor]+1;
            }
        }
        
        /* if(minSteps[i] != Number.MAX_SAFE_INTEGER){
            // console.debug(`${currentStep} ${minSteps[i]}`);
            // console.debug(`Before While:: ${mediators[mediators.length-1]} ${minSteps[mediators[mediators.length-1]]} ${minSteps[i]}`);

            while(minSteps[mediators[mediators.length-1]] >= minSteps[i]){

                // console.debug(`InSide While:: ${mediators[mediators.length-1]} ${minSteps[mediators[mediators.length-1]]} ${minSteps[i]}`);
                mediators.pop();
            }

            // console.debug(`After while:: ${mediators[mediators.length-1]} ${minSteps[mediators[mediators.length-1]]} ${minSteps[i]}`);
            currentStep = minSteps[i];
            mediators.push(i);
        } */
    }

    // console.debug(mediators.join(' '));
    // console.log(minSteps.join(' '));
    return minSteps[N] == Number.MAX_SAFE_INTEGER ? -1 : minSteps[N] ;
}

[
    '4 24',
    '4 576',
    '8748 83462',
    '235 98234',
    '4 99991',
    '82736 82736'
].forEach(nums=>{

    // console.log(...nums.split(' ').map(Number));
    // console.log(`${nums} Method 1:: ${calculateMinSteps_1(...nums.split(' ').map(Number))}`)
    console.log(`${nums} Method 2:: ${calculateMinSteps_2(...nums.split(' ').map(Number))}`)
});
