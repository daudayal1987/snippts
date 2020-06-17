let count_1 = 0;
let count_2 = 0;
let count_3 = 0;

/*
    Let items = n
    Time Complexity = O(2^n)
    Space Complexity = O(1)
*/
let method_RecursiveNaive = (weights, values, maxWeight, i=0) => {

    count_1++;
    if(maxWeight<=0 || i>=weights.length){

        return 0;
    }    

    if(weights[i]<=maxWeight){

        return Math.max( values[i] + method_RecursiveNaive(weights, values, maxWeight-weights[i], i+1),  method_RecursiveNaive(weights, values, maxWeight, i+1))
    }else{

        return method_RecursiveNaive(weights, values, maxWeight, i+1);
    }
}

/*
    Let items = n, maxWeight = m
    Time Complexity = O(n*m)
    Space Complexity = O(m)
*/
let method_RecursiveMemoization = (weights, values, maxWeight, i=0) => {

    let memoization = new Array(maxWeight+1).fill(null);

    let wrapper = (maxWeight, i) => {

        count_2++;
        if(maxWeight<=0 || i>=weights.length){

            return 0;
        }

        if(memoization[maxWeight]!=null){

            return memoization[maxWeight];
        }

        if(weights[i]<=maxWeight){

            memoization[maxWeight] = Math.max(values[i] + wrapper(maxWeight-weights[i], i+1), wrapper(maxWeight, i+1));
        }else{

            memoization[maxWeight] = wrapper(maxWeight, i+1);
        }

        return memoization[maxWeight];
    }

    return wrapper(maxWeight, i);;
}

/*
    Let items = n and maxWeight = m
    Space Compexity => O(m)
    Time Compexity => O(n*m)
*/
let method_Tabulation = (weights, values, maxWeight) => {
    if(weights.length != values.length){
        console.log("Invalid input");
        return;
    }

    let dp = new Array(maxWeight+1).fill(0);
    let totalWeight = 0;
    for(let i=0; i<weights.length; i++){

        totalWeight = totalWeight + weights[i];
        for(let j=weights[i]; j<=maxWeight; j++){
            
            count_3++;
            if(j>totalWeight){
                dp[j] = dp[j-1];
            }else{
                dp[j] = Math.max(dp[j], values[i] + dp[j-weights[i]]);
            }
        }
    }

    return dp[maxWeight];
}

[
    {
        weights: [1, 2, 3],
        values: [6, 10, 12],
        maxWeight: 5
    },
    {
        weights: [1, 1, 1],
        values: [10, 20, 30],
        maxWeight: 50
    },
    {
        weights: [23, 31, 29, 44, 53, 38, 63, 85, 89, 82],
        values: [92, 57, 49, 68, 60, 43, 67, 84, 87, 72],
        maxWeight: 165
    }
].forEach(testCase=>{
    count_1 = 0;
    count_2 = 0;
    count_3 = 0;
    console.log(JSON.stringify(testCase));
    console.log('Recursive Naive Method :: ', method_RecursiveNaive(testCase.weights, testCase.values, testCase.maxWeight), count_1);
    console.log('Recursive Memoization Method :: ', method_RecursiveMemoization(testCase.weights, testCase.values, testCase.maxWeight), count_2);
    console.log('Tabulation Method :: ', method_Tabulation(testCase.weights, testCase.values, testCase.maxWeight), count_3);
    console.log('\n');
});