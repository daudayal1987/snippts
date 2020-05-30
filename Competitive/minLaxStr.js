//http://codeforces.com/contest/797/problem/C
let getMinLaxStr = (s) => {
    let charCodeMap = {};
    let charCountMap = {};
    for(let i=97; i<=122; i++){
        charCodeMap[String.fromCharCode(i)] = i;
        charCountMap[i] = 0;
    }

    for(let i=0; i<s.length; i++){
        let charCode = charCodeMap[ s[i] ];
        charCountMap[ charCode ]++;
    }

    let t = [];
    let u = '';
    for(let i=0; i<s.length; i++){

        let charCode = charCodeMap[ s[i] ];
        t.push(s[i]);
        charCountMap[charCode]--;

        let flag = false;

        for(let j in charCountMap){

            if(j<=charCode && charCountMap[j]>0){

                flag = true;
                break;
            }
        }

        if(!flag){
            // console.debug(s.slice(i+1), t, u);
            u = u + t.pop();
            // console.debug(s.slice(i+1), t, u);
            while(t.length){

                let flag2 = false;
                let topCharCode = charCodeMap[t[t.length-1]];
                for(let j in charCountMap){
                    if(j<=topCharCode && charCodeMap[topCharCode]>0){

                        flag2 = true;
                        break;
                    }
                }

                if(!flag2){
                    // console.debug(s.slice(i+1), t, u);
                    u = u + t.pop();
                    // console.debug(s.slice(i+1), t, u);
                }
            }   
        }else{

            // console.debug(s.slice(i+1), t, u);
        }
    }
    return u;
}
[
    'acdebfghi',
    'cab',
    'acdb'
].forEach(s=>{
    console.log(s, getMinLaxStr(s));
})