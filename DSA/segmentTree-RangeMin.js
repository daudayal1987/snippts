//Range min query
let main = (arr, queries) => {

    let X = Math.ceil(Math.log2(arr.length));
    let tree =  new Array( 2*(1 << X) - 1 ).fill(null);

    let buildTree = (l, r, treeI) => {
        // console.debug(l, r, treeI);
        if(l>r) {

            return 0;
        }

        if(l == r){

            tree[ treeI ] = arr[l];
            // console.debug('return ', tree[treeI], arr[l]);
            return tree[treeI];
        }

        let mid = parseInt((r-l) / 2);

        let lTree = buildTree(l, mid+l, 2*treeI+1);
        // console.debug('lTree', lTree);
        
        let rTree = buildTree(mid+l+1, r, 2*treeI+2);
        // console.debug('rTree', rTree);

        tree[treeI] = Math.min(lTree, rTree);
        return tree[treeI];
    }

    let executeMinQuery = (ts, te, qs, qe, ti) => {
        
        if(qs > te || qe < ts){

            return Number.MAX_SAFE_INTEGER;
        }

        console.debug(ts, te, qs, qe, ti);
        if(qs<=ts && qe>=te){

            console.debug("Return", tree[ti]);
            return tree[ti];
        }

        let mid = parseInt( (te-ts) / 2 );
        return Math.min(
            executeMinQuery(ts, ts+mid, qs, qe, 2*ti+1), 
            executeMinQuery(ts+mid+1, te, qs, qe, 2*ti+2)
        );
    }

    buildTree(0, arr.length-1, 0);
    console.debug(tree);

    console.log(arr);
    queries.forEach(q=>{
        console.log(`From ${q[0]} To ${q[1]} => Min ==> ${executeMinQuery(0, arr.length-1, q[0], q[1], 0)}`);
    });
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
