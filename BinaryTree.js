class TreeNode{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }

    setValue(value){
        this.value = value;
    }

    setLeft(node){
        this.left = node;
    }

    setRight(node){
        this.right = node;
    }

    hasLeft(){
        return this.left != null;
    }

    hasRight(){
        return this.right != null;
    }

    getLeft(){
        return this.left;
    }

    getRight(){
        return this.right;
    }

    printValue(){
        process.stdout.write(`${this.value} `);
    }

    getValue(){
        return this.value;
    }
}

class Tree{
    constructor(){
        this.root = null;
    }

    insert(value){

        let newNode = new TreeNode(value);
        if(!this.root){
            
            this.root = newNode;
            return;
        }

        let q = [this.root];
        while(q.length){

            let node = q.shift();
            if(!node.left){
                node.left = newNode;
                break;
            }else{
                q.push(node.left);
            }

            if(!node.right){
                node.right = newNode;
                break;
            }else{
                q.push(node.right);
            }
        }
    }

    delete(value){

        process.stdout.write(`Deleting value ${value} `);
        if(!this.root){
            process.stdout.write("Tree is empty\n");
            return;
        }

        if(this.root.getValue() == value && !this.root.hasLeft() && !this.root.hasRight()){

            process.stdout.write(`Value found at root and tree has root only, so deleted root\n`);
            this.root = null;
            return;
        }

        let getLastNode = () => {
            let q = [this.root];
            let node = null;
            while(q.length){

                node = q.shift();
                if(node.hasLeft()){
                    q.push(node.getLeft());
                }

                if(node.hasRight()){
                    q.push(node.getRight());
                }
            }

            return node;
        }

        let fetchNodeToDel = () => {

            let q = [this.root];
            let nodeToDel = null;
            while(q.length){

                let node = q.shift();
                if(node.getValue()==value){
                    nodeToDel = node;
                    break;
                }

                if(node.hasLeft()){
                    q.push(node.getLeft());
                }

                if(node.hasRight()){
                    q.push(node.getRight());
                }
            }
            
            return nodeToDel;
        }

        let deleteLastNode = (lastNode) => {

            let q = [this.root];
            while(q.length){

                let node = q.shift();
                if(node.hasLeft()){
                    if(node.getLeft().getValue() == lastNode.getValue()){
                        node.setLeft(null);
                        break;
                    }else{
                        q.push(node.getLeft());
                    }
                }

                if(node.hasRight()){
                    if(node.getRight().getValue() == lastNode.getValue()){
                        node.setRight(null);
                        break;
                    }else{
                        q.push(node.getRight());
                    }
                }
            }

            return;
        }

        let nodeToDel = fetchNodeToDel();
        if(nodeToDel==null){
            process.stdout.write(`Node to delete not found`);
            return;
        }

        let lastNode = getLastNode();
        if(nodeToDel.getValue() == lastNode.getValue()){
            deleteLastNode(lastNode);
        }else{
            let temp = lastNode;
            deleteLastNode(lastNode);
            nodeToDel.setValue(temp.getValue());
        }

        process.stdout.write("Delete success\n");
    }

    levelorderTraversal(){

        process.stdout.write("Levelorder Traversal:: ");
        if(!this.root){
            process.stdout.write("Tree is empty");
            return;
        }

        let q = [this.root];
        while(q.length){

            let node = q.shift();
            node.printValue();

            if(node.hasLeft()){
                q.push(node.getLeft());
            }

            if(node.hasRight()){
                q.push(node.getRight());
            }
        }

        process.stdout.write("\n");
    }

    preorderTraversal(){

        process.stdout.write("Preorder Traversal:: ");
        if(!this.root){
            process.stdout.write("Tree is empty");
            return;
        }

        let util = (node) => {
            if(!node) return;
            node.printValue();
            util(node.getLeft());
            util(node.getRight());
        }

        util(this.root);
        process.stdout.write("\n");
    }

    inorderTraversal(){

        process.stdout.write("Inorder Traversal:: ");
        if(!this.root){
            process.stdout.write("Tree is empty");
            return;
        }

        let util = (node) => {
            if(!node) return;
            util(node.getLeft());
            node.printValue();
            util(node.getRight());
        }

        util(this.root);
        process.stdout.write("\n");
    }

    postorderTraversal(){

        process.stdout.write("Postorder Traversal:: ");
        if(!this.root){
            process.stdout.write("Tree is empty");
            return;
        }

        let util = (node) => {
            if(!node) return;
            util(node.getLeft());
            util(node.getRight());
            node.printValue();
        }

        util(this.root);
        process.stdout.write("\n");
    }
}

let tree = new Tree();
tree.insert(10);
tree.insert(20);
tree.insert(30);
tree.levelorderTraversal();
tree.preorderTraversal();
tree.inorderTraversal();
tree.postorderTraversal();

tree.insert(40);
tree.insert(50);
tree.insert(60);
tree.levelorderTraversal();
tree.preorderTraversal();
tree.inorderTraversal();
tree.postorderTraversal();

tree.insert(70);
tree.insert(80);
tree.insert(90);
tree.insert(100);
tree.levelorderTraversal();
tree.preorderTraversal();
tree.inorderTraversal();
tree.postorderTraversal();

tree.delete(100);
tree.delete(80);
tree.delete(10);
tree.delete(50);
tree.delete(40);
tree.delete(60);
tree.levelorderTraversal();
tree.inorderTraversal();

tree.delete(90);
tree.delete(20);
tree.delete(70);
tree.levelorderTraversal();
tree.inorderTraversal();

tree.delete(30);
tree.levelorderTraversal();
tree.inorderTraversal();
tree.delete(90);
tree.delete(10);