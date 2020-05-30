function isValidAnagram(str_1, str_2){
    if(str_1.length !== str_2.length ) {

        return false;
    }

    let charCount_1 = {};
    let charCount_2 = {};

    for(let char of str_1){

        charCount_1[char] = (charCount_1[char] || 0) + 1;
    }

    for(let char of str_2){

        charCount_2[char] = (charCount_2[char] || 0) + 1;
    }

    for(let char of Object.keys(charCount_1)){

        if( !charCount_2.hasOwnProperty(char) ){

            return false;
        }

        if( charCount_1[char] !== charCount_2[char] ){

            return false;
        }
    }

    return true;
}

isValidAnagram('iceman','manice'); //true
isValidAnagram('anagram', 'gramana'); //true
isValidAnagram('',''); //true
isValidAnagram('aaz', 'zza'); //false
isValidAnagram('rat', 'car'); //false