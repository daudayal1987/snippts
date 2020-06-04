class TreeNode{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree{
    constructor(){
        this.root = null;
    }

    getHeight(node){
        return node ? node.height : 0;
    }

    rightRotate(node){
        let x = node.left;
        let y = x.right;

        node.left = y;
        x.right = node;

        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        return x;
    }

    leftRotate(node){
        let x = node.right;
        let y = x.left;

        node.right = y;
        x.left = node;

        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        return x;
    }

    getMinValue(node){
        while(node.left) {
            node = node.left;
        }
        return node;
    }

    getBalance(node){
        if(node==null){
            return 0;
        }
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    insert(value){
        let insertUtil = (node, value) => {
            if(node == null){
                return new TreeNode(value);
            }

            if(node.value > value){
                node.left = insertUtil(node.left, value);
            }else if(node.value < value){
                node.right = insertUtil(node.right, value);
            }

            node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right))+1;
            let balance = this.getHeight(node.left) - this.getHeight(node.right);

            // console.log(node.value, node.height, this.getHeight(node.left), this.getHeight(node.right), balance);
            if(balance>1){
                if(node.left.value > value){
                    // console.log('left left case');
                    node = this.rightRotate(node);
                }else{
                    // console.log('left right case');
                    node.left = this.leftRotate(node.left);
                    node = this.rightRotate(node);
                }
            }else if(balance<-1){
                if(node.right.value < value){
                    // console.log('right right case');
                    node = this.leftRotate(node);
                }else{
                    // console.log('right left case');
                    node.right = this.rightRotate(node.right);
                    node = this.leftRotate(node);
                }
            }

            return node;
        }
        this.root = insertUtil(this.root, value);
    }

    delete(value){
        if(this.root == null){
            process.stdout.write(`Tree is empty\n`);
            return;
        }

        let deleteUtil = (node, value) => {
            if(node==null) {
                process.stdout.write(`${value} not found in tree`);
                return;
            }

            if(node.value > value){
                node.left = deleteUtil(node.left, value);
            }else if(node.value < value){
                node.right = deleteUtil(node.right, value);
            }else{
                if(node.left == null){
                    node = node.right;
                }else if(node.right == null){
                    node = node.left;
                }else{
                    let temp = this.getMinValue(node.right);
                    node.value = temp.value;
                    node.right = deleteUtil(node.right, temp.value)
                }
            }

            if(node==null){
                return node;
            }

            node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right))+1;
            
            let balance = this.getBalance(node);
            if(balance > 1){
                if(this.getBalance(node.left) >= 0){
                    //left left case
                    node = this.rightRotate(node);
                }else if(this.getBalance(node.left) < 0){
                    //left right case
                    node.left = this.leftRotate(node.left);
                    node = this.rightRotate(node);
                }
            }else if(balance < -1){
                if(this.getBalance(node.right) <= 0){
                    //right right case
                    node = this.leftRotate(node);
                }else if(this.getBalance(node.right) > 0){
                    //right left case
                    node.right = this.rightRotate(node.right);
                    node = this.leftRotate(node.right);
                }
            }

            return node;
        }
        this.root = deleteUtil(this.root, value);
    }

    preorder(){
        process.stdout.write('Preorder Traversal:\n');
        if(this.root == null){
            process.stdout.write('Tree is empty\n');
            return;
        }

        let util = (node) => {
            if(node == null) return;
            process.stdout.write(` ${node.value}(${node.height}) `);
            util(node.left);
            util(node.right);
        }

        util(this.root);
        process.stdout.write('\n');
    }

    inorder(){
        process.stdout.write('Inorder Traversal::\n');
        if(this.root == null){
            process.stdout.write('Tree is empty\n');
            return;
        }

        let util = (node) => {
            if(node == null) return;
            util(node.left);
            process.stdout.write(` ${node.value} `);
            util(node.right);
        }

        util(this.root);
        process.stdout.write('\n');
    }

    postorder(){
        process.stdout.write('Postorder Traversal::\n');
        if(this.root == null){
            process.stdout.write('Tree is empty\n');
            return;
        }

        let util = (node) => {
            if(node == null) return;
            util(node.left);
            util(node.right);
            process.stdout.write(` ${node.value} `);
        }

        util(this.root);
        process.stdout.write('\n');
    }

    traverse(){
        this.inorder();
        this.preorder();
        this.postorder();
    }
}

let tree = new AVLTree();
tree.insert(100);
tree.insert(50);
tree.insert(25);
tree.insert(75);
tree.insert(150);
tree.insert(125);
tree.insert(175);
tree.traverse();


tree.delete(50);
tree.traverse();
tree.delete(100);
tree.traverse();
tree.delete(150);
tree.traverse();
tree.delete(25);
tree.traverse();
tree.delete(125);
tree.traverse();
tree.delete(175);
tree.traverse();
tree.delete(75);
tree.traverse();