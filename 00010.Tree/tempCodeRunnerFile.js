class Node {
    constructor(value){
        this.value = value;
        this.left = null;
        this.right=null;
    }
}

const root = new Node(100);
console.log(root.value)

root.left = new Node(30)
root.right = new Node(50)
console.log(root.value, root.left.value , root.right.value)
root.left.left = new Node(40)
console.log(root.left.left.value)

// https://leetcode.com/problems/invert-binary-tree/description/
// https://leetcode.com/problems/univalued-binary-tree/description/