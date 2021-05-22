function isPrime(n){
    if(n<=1) return false;
    if(n < 3) return true;
    if(n%2==0 || n%3==0) return false;

    for(let i=5; i*i<=n; i=i+6){
        if(n%i == 0 || n%(i+2)==0) return false;
    }
    return true;
}

function largestPrimeFactor(n){
    let maxPrime = -1;
    
    while(n%2==0){
        maxPrime = 2;
        n = n >> 1; // n = n/2
    }

    for(let i=3; i*i<=n; i=i+2){
        while(n%i==0){
            maxPrime = i;
            n = parseInt(n/i);
        }
    }

    return n > 2 ? n : maxPrime;
}

//formula
    //if n is prime Math.floor(fact / n) + Math.floor(fact / n^2) + Math.floor(fact / n^3) ... till we get 0 
    //if n is non-prime get largest prime of n and it make that new n
function maxPowerDividingFactorial(n, fact){
    if(!isPrime(n)){
        n = largestPrimeFactor(n);
    }

    let ans = 0;
    while(fact > 0){
        fact = parseInt(fact/n);
        ans = ans + fact;
    }

    return ans;
}

console.log("n=2, fact = 5 ==> ", maxPowerDividingFactorial(2,5));
console.log("n=6, fact = 10 ==> ", maxPowerDividingFactorial(6,10));
console.log("n=6, fact = 20 ==> ", maxPowerDividingFactorial(6,20));