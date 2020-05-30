//https://community.topcoder.com/stat?c=problem_statement&pm=3458&rd=5869

let helpers = (()=>{
    
    let getStringDigits = (str) => {
        return str.split('').map(Number).sort((a,b)=>a-b);
    }

    let getMinNumNotZero = (sortedDigits) =>{

        for(let i=0; i<sortedDigits.length; i++){

            if(sortedDigits[i]!=0) return sortedDigits[i];
        }
    }

    let getMaxNum = (sortedDigits) =>{
        
        let maxNum = 0;
        for(let i=sortedDigits.length-1; i>=2; i--){

            maxNum = maxNum * 10 + sortedDigits[i];
        }

        return maxNum;
    }

    let isPrime = (num) => {

        for(let i=2; i*i<=num; i++){

            if(num%i==0) return false
        }

        return true
    }

    let getDigitCounts = (str) => {

        let digitCountMap = {};
        for(let i=0; i<str.length; i++){
            
            digitCountMap[ str[i] ] = digitCountMap[ str[i] ] || 0;
            digitCountMap[ str[i] ]++;
        }

        return digitCountMap;
    }

    let hasNumber = (digitCountMap, num) => {
        
        for(let i=0; i<num.length; i++){

            if(!digitCountMap.hasOwnProperty(num[i]) || digitCountMap[ num[i] ]<=0){

                return false;
            }
        }

        return true;
    }

    let isFreqEqual = (obj1, obj2) => {

        for(let idx in obj1){
            if(!obj2[idx] || obj1[idx] != obj2[idx]) return false;
        }

        for(let idx in obj2){
            if(!obj1[idx] || obj1[idx] != obj2[idx]) return false;
        }

        return true;
    }

    return Object.create({
        getStringDigits,
        getMinNumNotZero,
        getMaxNum,
        isPrime,
        getDigitCounts,
        hasNumber,
        isFreqEqual
    });
})();

let getPrimes = (str) =>{

    if(str.length<3) return {};
    
    let sortedDigits = helpers.getStringDigits(str);
    let digitCounts = helpers.getDigitCounts(str);
    // console.log(digitCounts);return;
    let minNum = helpers.getMinNumNotZero(sortedDigits);
    let maxNum = helpers.getMaxNum(sortedDigits);
    // console.log(minNum, maxNum);

    if(minNum == maxNum && str.length==3 && helpers.isPrime(minNum)){

        return new Array(3).fill(minNum).join(' ');
    }

    let nums = [];
    for(let i=Math.max(minNum,2); i<=maxNum && i<=200; i++){

        if(!helpers.isPrime(i)) continue;
        if(!helpers.hasNumber(digitCounts, i.toString())) continue;
        nums.push(i);
    }

    // console.debug(nums.join(' '));
    // console.debug(`Total nums ${nums.length} so total unique sets ${1<<nums.length}`);
    let allSets = [];
    for(let i=0; i<(1<<nums.length); i++){
        
        let pos = nums.length - 1;
        let n = i;
        let elems = [];
        while(n){
            if(1&n){
                elems.push(nums[pos]);
            }
            pos--;
            n = n>>1;
        }

        if(elems.length==3){

            // console.debug(elems.join());
            let eSet = elems.join('').toString();
            let eSetDigitCount = helpers.getDigitCounts(eSet);
            if(helpers.isFreqEqual(digitCounts, eSetDigitCount)){

                // console.debug(elems.join(' '));
                allSets.push(elems);
            }
        }
    }

    if(allSets.length==0){
        return '{}';
    }else if(allSets.length==1){
        return allSets[0].sort((a,b)=>a-b);
    }else{
        let setIdx = -1;
        let minProd = Number.MAX_SAFE_INTEGER;
        allSets.forEach((s, idx)=>{
            
            let prod = s.reduce((acc,ele)=>acc*ele,1);
            if(prod<minProd){
                minProd = prod;
                setIdx = idx;
            }
        });
        // console.debug(setIdx);
        return allSets[setIdx].sort((a,b)=>a-b);
    }
}

[
    '39151',
    '921179',
    '01123',
    '0707070',
    '222',
    '123'
].forEach(str=>{
    console.log(`${str} :: ${getPrimes(str)}`);
});


/* let arr = [1,2,3,4];
let n = arr.length;
console.log(`Size is ${n} total combination ${(1<<n)}`);
for(let i=0; i<(1<<n); i++){
    
    let bits = new Array(n).fill(0);
    let num = i;
    let pos = n-1;
    while(num){
        if(1 & num){
            bits[pos] = 1;
        }
        num = num >> 1;
        pos--;
    }

    // console.log(i);
    console.log(bits.join(' '));
} */