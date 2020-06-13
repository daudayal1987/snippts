'use strict'
const BLACK = 0, RED = 1;

class TreeNode{
    constructor(value, parent){
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = parent;
        this.color = RED;
    }

    hasParent(){
        return this.parent != null;
    }

    isInLeft(){
        if(!this.hasParent()) {
            return false;
        }

        if(this.getParent().getLeft() == this){
            return true;
        }

        return false;
    }

    isInRight(){
        if(!this.hasParent()) {
            return false;
        }

        if(this.getParent().getRight() == this){
            return true;
        }

        return false;
    }

    getLeft(){
        return this.left;
    }

    getRight(){
        return this.right;
    }

    getParent(){
        return this.parent; 
    }

    getUncle(){
        if(!this.hasParent()){
            // console.log('dont have parent');
            return null;
        }

        if(!this.getParent().hasParent()){
            // console.log('dont have grandparent');
            return null;
        }

        if(this.getParent().isInLeft()){
            return this.getParent().getParent().getRight();
        }else{
            return this.getParent().getParent().getLeft();
        }
    }

    getColor(){
        return this.color;
    }

    print(){
        process.stdout.write(` ${this.value}(${this.color==BLACK ? 'BLACK' : 'RED'}) `);
    }

    setLeft(ref){
        this.left = ref;
    }

    setRight(ref){
        this.right = ref;
    }

    setParent(ref){
        this.parent = ref;
    }

    setColor(color){
        this.color = color;
    }
}

class RBTree{
    constructor(){
        this.root = null;
    }

    rotateLeft(curr){
        let x = curr.getRight();
        let y = x.getLeft();

        if(x.getParent() == this.root){
            this.root = x;
        }else if(curr.isInRight()){
            curr.getParent().setRight(x);
        }else{
            curr.getParent().setLeft(x);
        }

        x.setParent(curr.getParent());
        y && y.setParent(curr);
        curr.setParent(x);

        curr.setRight(y);
        x.setLeft(curr);

        return x;
    }

    rotateRight(curr){
        let x = curr.getLeft();
        let y = x.getRight();

        if(x.getParent() == this.root){
            this.root = x;
        }else if(curr.isInLeft()){
            curr.getParent().setLeft(x);
        }else{
            curr.getParent().setRight(x);
        }

        x.setParent(curr.getParent());
        y && y.setParent(curr);
        curr.setParent(x);

        curr.setLeft(y);
        x.setRight(curr);

        return x;
    }

    insert(value){
        let newNode = new TreeNode(value, null);

        let fixDoubleRed = (currentNode = newNode) => {

            let parent = currentNode.getParent();
            while(currentNode != this.root && parent.getColor() != BLACK){

                let grandparent = currentNode.getParent().getParent();
                let uncle = currentNode.getUncle();

                if(uncle != null && uncle.getColor() == RED){

                    parent.setColor(BLACK);
                    uncle.setColor(BLACK);
                    grandparent.setColor(RED);
                }else{

                    if(parent.isInLeft()){
                        if(currentNode.isInLeft()){
                            // console.log('left left case');
                            grandparent = this.rotateRight(grandparent);
                        }else{
                            // console.log('left right case');
                            grandparent.setLeft(this.rotateLeft(grandparent.getLeft()));
                            grandparent = this.rotateRight(grandparent);
                        }
    
                        grandparent.setColor(BLACK);
                        grandparent.getRight().setColor(RED);
                    }else{
                        if(currentNode.isInRight()){
                            // console.log('right right case');
                            grandparent = this.rotateLeft(grandparent);
                        }else{
                            // console.log('right left case');
                            grandparent.setRight(this.rotateRight(grandparent.getRight()));
                            grandparent = this.rotateLeft(grandparent);
                        }
                        
                        grandparent.setColor(BLACK);
                        grandparent.getLeft().setColor(RED);
                    }
                }

                currentNode = grandparent;
                parent = currentNode.getParent();
            }

            this.root.setColor(BLACK);
        }

        let BstInsert = (currRoot, parent) => {
            if(currRoot==null){
                newNode.parent = parent;
                return newNode;
            }

            if(value < currRoot.value){
                currRoot.setLeft(BstInsert(currRoot.getLeft(), currRoot)); 
            }else{
                currRoot.setRight(BstInsert(currRoot.getRight(), currRoot));
            }

            return currRoot;
        }

        this.root = BstInsert(this.root, this.root);
        this.root.setColor(BLACK);
        fixDoubleRed();
    }

    isEmpty(){
        return this.root == null;
    }

    preorder(){
        console.log(`Preorder Traversal:: `);
        if(this.isEmpty()){
            console.log(`Tree is empty\n`);
            return;
        }

        let traversalHelper = (root) => {
            if (root==null) return;
            root.print();
            traversalHelper(root.left);
            traversalHelper(root.right);
        }

        traversalHelper(this.root);
        console.log('\n');
    }

    inorder(){
        console.log(`Inorder Traversal:: `);
        if(this.isEmpty()){
            console.log(`Tree is empty\n`);
            return;
        }

        let traversalHelper = (root) => {
            if (root==null) return;
            traversalHelper(root.left);
            root.print();
            traversalHelper(root.right);
        }

        traversalHelper(this.root);
        console.log('\n');
    }

    postorder(){
        console.log(`Postorder Traversal:: `);
        if(this.isEmpty()){
            console.log(`Tree is empty\n`);
            return;
        }

        let traversalHelper = (root) => {
            if (root==null) return;
            traversalHelper(root.left);
            traversalHelper(root.right);
            root.print();
        }

        traversalHelper(this.root);
        console.log('\n');
    }

    traversal(){
        this.preorder();
        this.inorder();
        this.postorder();
    }
}

let tree = new RBTree();
tree.insert(100);
tree.traversal();
tree.insert(50);
tree.traversal();
tree.insert(25);
tree.traversal();
tree.insert(75);
tree.traversal();
tree.insert(125);
tree.traversal();
tree.insert(150);
tree.traversal();
tree.insert(130);
tree.traversal();

// console.log(require('util').inspect(tree,{depth: null}));
// tree.root.getLeft().getLeft().print();
// tree.root.getLeft().getLeft().getParent().print();
// tree.root.getLeft().getLeft().getParent().getParent().print();
// console.log(tree.root.getLeft().getLeft().isInLeft() ? 'yes' : 'no');
// tree.root.getLeft().getLeft().getUncle().print();
