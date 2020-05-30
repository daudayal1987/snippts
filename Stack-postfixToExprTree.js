let doExecute = (expr) => {

    let treeNode = {
        content: null,
        lNode: null,
        rNode: null 
    };

    let buildTree = ()=>{
        
        let stack = [];
        for(let i=0; i<expr.length; i++){

            let node = Object.create(treeNode);
            node.content = expr[i];

            if(expr[i].charCodeAt(0)>=97 && expr[i].charCodeAt(0)<=122){

                stack.push(node);
            }else{

                let rOper = stack.pop();
                let lOper = stack.pop();
                node.lNode = lOper;
                node.rNode = rOper;
                stack.push(node);
            }
        }

        return stack.pop();
    }

    let inOrder = (root) => {

        if(!root) return;
        inOrder(root.lNode);
        process.stdout.write(root.content);
        inOrder(root.rNode);
    }
    
    let root = buildTree();
    inOrder(root);
}
[
    'abc*d/+ef*g/+h-'
].forEach(e=>{
    doExecute(e);
});