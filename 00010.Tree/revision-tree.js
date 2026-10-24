//!  1. Create Binary Tree Node Class
//!  Topic: Node design
//!  Practice: Just write the class

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

//!  2. Manually Construct a Binary Tree
//!  Topic: Linking nodes

const root = new Node(25);
root.left = new Node(20);
root.right = new Node(30);

root.left.left = new Node(18);
root.right.right = new Node(33);

root.left.right = new Node(27);
root.right.left = new Node(12);

// console.log(root)

//!  3. Preorder Traversal (Recursive)
//!  https://leetcode.com/problems/binary-tree-preorder-traversal/
//! Root -> left -> right

// function preorder(root) {
//     // declare a variable and assign it to an empty array
//     const result = [];

//     function dfs(node) {
//         // if the node does not exists, return zero
//         if (!node) return 0;
//         result.push(node.value);
//         dfs(node.left);
//         dfs(node.right);
//     }
//     dfs(root);
//     return result;
// };

// console.log(preorder(root));

//!  4. Inorder Traversal (Recursive)
//!  https://leetcode.com/problems/binary-tree-inorder-traversal/
//! left -> root -> right 

// function inorder(root) {
//     // declare a variable and assign it to an empty array
//     const result = [];

//     function dfs(node) {
//         // if the node does not exists, return zero
//         if (!node) return 0;
//         dfs(node.left);
//         result.push(node.value);
//         dfs(node.right);
//     }
//     dfs(root);
//     return result;
// }

// console.log(inorder(root));

//!  5. Postorder Traversal (Recursive)
//!  https://leetcode.com/problems/binary-tree-postorder-traversal/
//! left -> right -> root

// function postorder(root) {
//     // declare a variable and assign it to an empty array
//     const result = [];

//     function dfs(node) {
//         // if the node does not exists, return 0
//         if (!node) return 0;
//         dfs(node.left);
//         dfs(node.right);
//         result.push(node.value);
//     }
//     dfs(root);
//     return result;
// }

// console.log(postorder(root));

//! /  6. Level Order Traversal (BFS)
//!  https://leetcode.com/problems/binary-tree-level-order-traversal/

// function levelOrder(root) {
//     // if the root does not exists, return an empty array
//     if (!root) return [];

//     const queue = [root];
//     const result = [];

//     while (queue.length > 0) {
//         const level = [];

//         for (let i = 0; i < queue.length; i++) {
//             const node = queue.shift();
//             level.push(node.value);

//             if (node.left) queue.push(node.left);
//             if (node.right) queue.push(node.right);
//         }
//         result.push(...level);
//     }
//     return result;
// }

// console.log(levelOrder(root));

//!  7. Count Nodes
//!  https://leetcode.com/problems/count-complete-tree-nodes/ (normal O(n) version first)

// function treeNodes(root) {
//     // if the root does not exists return zero
//     if (!root) return 0;

//     // recursive case
//     return 1 + treeNodes(root.left) + treeNodes(root.right);
// }

// console.log(treeNodes(root));


//!  8. Height of Binary Tree
//!  https://leetcode.com/problems/maximum-depth-of-binary-tree/

// function maxDepth(root) {
//     // if the root does not exists, return 0
//     if (!root) return 0;

//     // recursive case
//     return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
// }

// console.log(maxDepth(root));

//!  9. Count Leaf / Full Nodes

// function countLeaf(root) {
//     // if the root does not exists, return zero
//     if (!root) return 0;
//     // if the root.left and root.right does not have children return
//     if (!root.left && !root.right) return 1;

//      // recursive case
//     return countLeaf(root.left) + countLeaf(root.right);
// }

// console.log(countLeaf(root))
