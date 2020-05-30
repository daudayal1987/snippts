let doExecute = (expression) => {

    let precAsso = [
        {
            oper: ['+', '-'],
            assoc: 'L-R'
        },
        {
            oper: ['*', '/'],
            assoc: 'L-R'
        },
        {
            oper: ['^'],
            assoc: 'R-L'
        }
    ];

    let treeNode = {
        content: null,
        lChild: null,
        rChild: null
    };

    let buildTree = (root, expr) => {

        if(expr.length==1){
            root.content = expr;
            return;
        }

        // console.debug(expr);
        for(let i=0; i<precAsso.length; i++){

            if(precAsso[i].assoc == 'L-R'){

                for(let j=expr.length-1; j>=0; j--){

                    for(let k=0; k<precAsso[i].oper.length; k++){

                        if(expr[j] == precAsso[i].oper[k]){

                            // console.debug(`${expr[j]} found at ${j}`);
                            // console.debug(expr.slice(0, j), expr.slice(j+1));
                            root.content = expr[j];
                            root.lChild = Object.create(treeNode);
                            buildTree(root.lChild, expr.slice(0, j));
                            root.rChild = Object.create(treeNode);
                            buildTree(root.rChild, expr.slice(j+1));
                            return;
                        }
                    }
                }
            }
        }
    }

    let postOrder = (root) => {

        if(!root) return;
        postOrder(root.lChild);
        postOrder(root.rChild);
        process.stdout.write(root.content);
    }
    
    let root = Object.create(treeNode);
    buildTree(root, expression);
    postOrder(root);
}

[
    "a+b*c/d+e*f/g-h"
].forEach(e=>{
    doExecute(e);
});

