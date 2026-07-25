// 7.A: Find sum of all nodes

class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

// function countNodes(root) {
//     if (!root) {
//         return 0;
//     }
//     return 1 + countNodes(root.left) + countNodes(root.right);
// }

// const countNodes = (root) => {
//     if (!root) {
//         return 0;
//     }

//     if (!root.left && !root.right) {
//         return 0;
//     }
//     return root.val + countNodes(root.left) + countNodes(root.right);
// }



const countNodes = (root) => {
    if (!root) {
        return 0;
    }

    if (!root.left && !root.right) {
        return root.val;
    }
    return countNodes(root.left) + countNodes(root.right);
}

const root = new Node(20);
root.left = new Node(18)
root.right = new Node(22)

root.left.right = new Node(5)
root.left.left = new Node(12)

root.right.left = new Node(25)
root.right.right = new Node(30)

console.log(countNodes(root));