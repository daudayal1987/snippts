let method_Optimized = (str) => {
    let substrs = [];
    for(let i=0; i<str.length; i++){

        let tempStr = '';
        let tempIndex = i;
        for(let j=i; j<str.length; j++){

            tempStr = tempStr + str[j];
            substrs.push(tempStr);
        }
    }

    return substrs.join(' ');
}

[
    'a',
    'ab',
    'abc',
    'abcd',
    'abcde',
    'abcedf',
    'abcdef'
].forEach(str=>{
    console.log('String :: ',str);

    //number of substrings will be (n + (n-1) + (n-2) + .... + 2 + 1)
    //ex (abcde) => a, b, c, d, e, ab, bc, cd, de, abc, bcd, cde, abcd, bcde, abcde
    console.log('Number of substrings:: ', (str.length*((str.length+1)/2)));

    console.log('Method (Optimized) :: ', method_Optimized(str));
});