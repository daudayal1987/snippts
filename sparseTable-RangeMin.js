function main(nums, queries){

    let rows = nums.length;
    let cols = Math.floor(Math.log2(nums.length))+1;

    let sparseTable = new Array(rows);
    for(let i=0; i<rows; i++){

        sparseTable[i] = new Array(cols).fill("");
    }

    function printTable(){

        console.debug("PrintTable ", sparseTable);
        console.log("\nPrint Table");
        for(let i=0; i<sparseTable.length; i++){

            console.log(sparseTable[i].map(num=>{
                return num.toString().padStart(5,' ');
            }).join(''));
        }
    }

    let buildTable = () => {

        for(let i=0; i<nums.length; i++){
            
            sparseTable[i][0] = nums[i];
        }

        for(let j=1; j<cols; j++){

            for(let i=0; (i+(1<<j)-1)<rows; i++){

                console.debug(`[${i}][${j-1}]`, `[${i+(1<<(j-1))}][${j-1}]`);
                console.debug(sparseTable[i][j-1], sparseTable[i][i+(1<<(j-1))]);
                if(sparseTable[i][j-1] < sparseTable[i+(1<<(j-1))][j-1]){

                    sparseTable[i][j] = sparseTable[i][j-1];
                }else{

                    sparseTable[i][j] = sparseTable[i+(1<<(j-1))][j-1];
                }
            }
        }
    }

    let executeQuery = (left, right) => {

        let j = Math.floor(Math.log2(right-left+1));
        if( sparseTable[left][j] < sparseTable[right-(1<<j)+1][j]){

            return sparseTable[left][j];
        }else{

            return sparseTable[right-(1<<j)+1][j];
        }
    }

    console.debug(nums.join(' '));
    buildTable();

    console.log("\n", nums.join(' '));
    queries.forEach(q=>{
        console.log(`From ${q[0]} To ${q[1]} => ${executeQuery(q[0], q[1])}`);
    });
    
    // printTable();
}

let program_input = [
    {
        nums: '7 2 3 0 5 10 3 12 18',
        queries: [
            [0, 8],
            [4, 6]
        ]
    },
    {
        nums: '2 1 4 5 1 3 3 1 1 1',
        queries: [
            [0, 9],
            [4, 6],
            [5, 6]
        ]
    },
    {
        nums: '6 2 5 4 5 1 6',
        queries: [
            [0, 6],
            [1, 5],
            [1, 4]
        ]
    },
    {
        nums: '2 1 4 5 1 3 3',
        queries: [
            [0, 6],
            [1, 5],
            [2, 3]
        ]
    },
    {
        nums: '1000 1000 1000 1000',
        queries: [
            [0, 3],
            [1, 2]
        ]
    }
];
disableDebug();
function disableDebug(){
    console.debug = function(){};
}
program_input.forEach(elem=>{
    main(elem.nums.split(' ').map(Number), elem.queries);
});
