class TreeNode{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }

    getLeft(){
        return this.left;
    }

    getRight(){
        return this.right;
    }

    getValue(){
        return this.value;
    }

    setLeft(node){
        this.left = node;
    }

    setRight(node){
        this.right = node;
    }

    setValue(value){
        this.value = value;
    }

    hasLeft(){
        return this.left != null;
    }

    hasRight(){
        return this.right != null;
    }

    printValue(){
        process.stdout.write(` ${this.value} `);
    }
}

class BST{
    constructor(){
        this.root = null;
    }

    insert(value){
        
        let newNode = new TreeNode(value);

        let insertUtil = (oldNode, newNode) => {

            if(!oldNode){

                return newNode;
            }

            if(oldNode.getValue() > newNode.getValue()){

                oldNode.setLeft(insertUtil(oldNode.getLeft(), newNode));
                return oldNode;
            }else{

                oldNode.setRight(insertUtil(oldNode.getRight(), newNode));
                return oldNode;
            }
        }

        this.root = insertUtil(this.root, newNode);
    }

    delete(value){

        process.stdout.write(`Deleting value:: ${value}\n`);
        let deleteUtil = (node, value) => {

            if(!node){

                return node;
            }

            if(node.getValue() > value){

                node.setLeft( deleteUtil(node.getLeft(), value) );
                return node;
            }else if(node.getValue() < value){

                node.setRight( deleteUtil(node.getRight(), value) );
                return node;
            }

            if(!node.hasLeft()){

                return node.getRight();
            }else if(!node.hasRight()){

                return node.getLeft();
            }else{
                let successor = node.getRight();
                while(successor.hasLeft()){

                    successor = successor.getLeft();
                }
                node.setValue( successor.getValue() );

                node.setRight( deleteUtil( node.getRight(), node.getValue() ) );
            }

            return node;
        }

        this.root = deleteUtil(this.root, value);
    }

    inorder(){

        process.stdout.write(`Inorder Traversal\n`);
        if(!this.root){
            process.stdout.write(`Tree is empty\n`);
            return;
        }

        let stack = [this.root];
        let current = this.root;
        while(stack.length){

            while(current.hasLeft()){

                stack.push(current.getLeft());
                current = current.getLeft();
            }

            current = stack.pop();
            current.printValue();

            while(!current.hasRight() && stack.length){
                
                current = stack.pop();
                current.printValue();
            }

            if(current.hasRight()){

                current = current.getRight();
                stack.push(current);
            }
        }
        process.stdout.write(`\n`);
    }

    preorder(){

        process.stdout.write(`Preorder Traversal::\n`);
        if(!this.root){
            process.stdout.write(`Tree is empty\n`);
            return;
        }

        let stack = [this.root];
        let current = this.root;
        while(stack.length){

            current.printValue();

            while(current.getLeft()){

                current = current.getLeft();
                stack.push(current);
                current.printValue();
            }
            
            current = stack.pop();
            while(current && !current.hasRight() && stack.length){

                current = stack.pop();
            }

            if(current && current.hasRight()){

                current = current.getRight();
                stack.push(current);
            }
        }
        process.stdout.write(`\n`);
    }
}

let bst = new BST();
bst.insert(100);
bst.insert(50);
bst.insert(150);
bst.insert(25);
bst.insert(75);
bst.insert(125);
bst.insert(175);
bst.insert(5);
bst.insert(200);
bst.insert(70);
bst.insert(130);
bst.inorder();
bst.preorder();


bst.delete(100);
bst.inorder();
bst.preorder();