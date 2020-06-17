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

    hasLeft(){
        return this.left != null;
    }

    hasRight(){
        return this.right != null;
    }

    hasRedChild(){
        return (this.hasLeft() && this.getLeft().getColor() == RED) || (this.hasRight() && this.getRight().getColor() == RED);
    }

    hasBothChildBlack(){
        return (!this.hasLeft() || this.getLeft().getColor() == BLACK) && (!this.hasRight() || this.getRight().getColor() == BLACK);
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

    getSibling(){
        if(!this.hasParent()){
            return null;
        }
        
        if(this.isInLeft()){
            return this.getParent().getRight();
        }else{
            return this.getParent().getLeft();
        }
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

    getValue(){
        return this.value;
    }

    print(){
        process.stdout.write(` ${this.value}(${this.color==BLACK ? 'BLACK' : 'RED'}) `);
    }

    setValue(value){
        this.value = value;
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

    swapValues(nodeX, nodeY){
        let tempVal = nodeX.getValue();
        nodeX.setValue(nodeY.getValue());
        nodeY.setValue(tempVal);
    }

    swapColor(nodeX, nodeY){
        let tempColor = nodeX.getColor();
        nodeX.setColor(nodeY.getColor());
        nodeY.setColor(tempColor);
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

    getSuccessor(node){
        if(!node.getRight()) return null;

        let temp = node.getRight();
        while(temp.hasLeft()){
            temp = temp.getLeft()
        }

        return temp;
    }

    search(value){
        let temp = this.root;
        while(temp){
            if(temp.getValue() > value){
                temp = temp.getLeft();
            }else if(temp.getValue() < value){
                temp = temp.getRight();
            }else{
                return temp;
            }
        }

        return temp;
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

    delete(value){
        console.log(`Deleting ${value} from tree`);
        let v = this.search(value);
        if(!v){
            console.log(`Value ${value} not found in tree`);
            return;
        }

        let BstReplace = (node) => {
            if(!node.hasLeft()){
                return node.getRight();
            }else if(!node.hasRight()){
                return node.getLeft();
            }else{
                return this.getSuccessor(node);
            }
        }

        let fixDoubleBlack = (node) => {
            if(node == this.root){
                return;
            }

            let sibling = node.getSibling();
            let parent = node.getParent();
            if(sibling == null){
                //no sibling, double black pushed to parent
                fixDoubleBlack(parent);
            }else{
                if(sibling.getColor() == RED){
                    parent.setColor(RED);
                    sibling.setColor(BLACK);
                    if(sibling.isInLeft()){
                        parent = this.rotateRight(parent);
                    }else{
                        parent = this.rotateLeft(parent);
                    }
                    fixDoubleBlack(node);
                }else{
                    //sibling is black
                    if(sibling.hasRedChild()){
                        if(sibling.isInLeft()){
                            if(sibling.hasLeft() && sibling.getLeft().getColor()==RED){
                                //left left case
                                sibling.getLeft().setColor(sibling.getColor());
                                sibling.setColor(parent.getColor());
                                parent = this.rotateRight(parent);
                            }else{
                                //left right case
                                sibling.getRight().setColor(parent.getColor());
                                sibling = this.rotateLeft(sibling);
                                parent = this.rotateRight(parent);
                            }
                        }else{
                            if(sibling.hasRight() && sibling.getRight().getColor()==RED){
                                //right right case
                                sibling.getRight().setColor(sibling.getColor());
                                sibling.setColor(parent.getColor());
                                parent = this.rotateLeft(parent);
                            }else{
                                //right left case
                                sibling.getLeft().setColor(parent.getColor());
                                sibling = this.rotateRight(sibling);
                                parent = this.rotateLeft(parent);
                            }
                        }
                    }else{
                        //sibling has 2 black children
                        sibling.setColor(RED);
                        if(parent.getColor()==BLACK){
                            fixDoubleBlack(parent);
                        }else{
                            parent.setColor(BLACK);
                        }
                    }
                }
            }
        }

        let deleteNode = (v) => {
            let u = BstReplace(v);
            let bothBlack = (v.getColor() == BLACK) && (u == null || u.getColor() == BLACK);

            if(u == null){
                //v is leaf
                if(v == this.root){
                    this.root = NULL;
                    // delete v;
                }else{
                    if(bothBlack){
                        fixDoubleBlack(v);
                    }else if(v.getSibling()){
                        v.getSibling().setColor(RED);
                    }

                    if(v.isInLeft()){
                        v.getParent().setLeft(null);
                    }else{
                        v.getParent().setRight(null);
                    }

                    // delete v;
                }
            }else if(!v.hasLeft() || !v.hasRight()){
                //v has one child
                if(v == this.root){
                    v.setValue(u.getValue());
                    v.setLeft(null);
                    v.setRight(null);
                    u.setParent(null);
                    // delete u;
                }else{
                    if(v.isInLeft()){
                        v.getParent().setLeft(u);
                    }else{
                        v.getParent().setRight(u);
                    }
                    u.setParent(v.getParent());
                    // delete v;
                    if(bothBlack){
                        fixDoubleBlack(u);
                    }else{
                        u.setColor(BLACK);
                    }
                }
            }else{
                //v has both child
                this.swapValues(u, v);
                deleteNode(u);
            }
        }

        deleteNode(v);
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
tree.insert(7);
tree.insert(3);
tree.insert(18);
tree.insert(10);
tree.insert(22);
tree.insert(8);
tree.insert(11);
tree.insert(26);
tree.insert(2);
tree.insert(6);
tree.insert(13);
tree.traversal();

tree.delete(18);
tree.delete(11);
tree.delete(3);
tree.delete(10);
tree.delete(22);
tree.traversal();

/* tree.insert(100);
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

console.log('Searching::');
tree.search(130).print();
tree.search(150).print();
console.log('\n');

tree.delete(100);
tree.traversal(); */

// console.log(require('util').inspect(tree,{depth: null}));
// tree.root.getLeft().getLeft().print();
// tree.root.getLeft().getLeft().getParent().print();
// tree.root.getLeft().getLeft().getParent().getParent().print();
// console.log(tree.root.getLeft().getLeft().isInLeft() ? 'yes' : 'no');
// tree.root.getLeft().getLeft().getUncle().print();
