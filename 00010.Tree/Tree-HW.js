// 7.A: Find sum of all nodes

// class Node {
//     constructor(val) {
//         this.val = val;
//         this.left = null;
//         this.right = null;
//     }
// }

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



// const countNodes = (root) => {
//     if (!root) {
//         return 0;
//     }

//     if (!root.left && !root.right) {
//         return root.val;
//     }
//     return countNodes(root.left) + countNodes(root.right);
// }

// const root = new Node(20);
// root.left = new Node(18)
// root.right = new Node(22)

// root.left.right = new Node(5)
// root.left.left = new Node(12)

// root.right.left = new Node(25)
// root.right.right = new Node(30)

// console.log(countNodes(root));



// BST: Practice -> Homework

//  =============================================================================
//  SECTION 1: ABSOLUTE BEGINNER FUNDAMENTALS
//  =============================================================================

//!  1. Create Binary Tree Node Class
//!  Topic: Node design
//!  Practice: Just write the class

/**
class Node {
    constructor(val) {
        this.val = value;
        this.left = null;
        this.right = null;
    }
}

*/

//!  2. Manually Construct a Binary Tree
//!  Topic: Linking nodes

/**
const root = new Node(11);
root.left = new Node(2);
root.right = new Node(87);

root.left.left = new Node(5);
root.left.right = new Node(21);

root.right.right = new Node(16);
root.right.left = new Node(8)
 */


//!  3. Preorder Traversal (Recursive)
//!  https://leetcode.com/problems/binary-tree-preorder-traversal/
//! Root -> left -> right

/** 
class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}
*/

/** 
function preorder(root) {
    const result = [];

    function dfs(node) {
        if (!node) return;
        result.push(node.val)
        dfs(node.left);
        dfs(node.right)
    }
    dfs(root);
    return result;
} 
*/

/** 
const root = new Node(13);
root.left = new Node(5);
root.right = new Node(10);

root.left.left = new Node(3);
root.left.right = new Node(8);

root.right.right = new Node(15);
root.right.left = new Node(7);

console.log(preorder(root));
*/

//!  4. Inorder Traversal (Recursive)
//!  https://leetcode.com/problems/binary-tree-inorder-traversal/
//! left -> root -> right 

/** 
class Node {
    constructor(val) {
        this.value = val;
        this.left = null;
        this.right = null;
    }
}

function inorder(root) {
    const result = [];

    function dfs(node) {
        if (!node) return;
        dfs(node.left);
        result.push(node.value);
        dfs(node.right);
    }
    dfs(root);
    return result;
}

const root = new Node(25);
root.left = new Node(10);
root.right = new Node(45);

root.left.left = new Node(5);
root.left.right = new Node(13);

root.right.right = new Node(30);
root.right.left = new Node(2);

console.log(inorder(root));
*/

//!  5. Postorder Traversal (Recursive)
//!  https://leetcode.com/problems/binary-tree-postorder-traversal/
//! left -> right -> root

/** 
class Node {
    constructor(val) {
        this.value = val;
        this.left = null;
        this.right = null;
    }
}

function postorder(root) {
    const result = [];

    function dfs(node) {
        if (!node) return;
        dfs(node.left);
        dfs(node.right);
        result.push(node.value);
    }
    dfs(root);
    return result;
}

const root = new Node(84);
root.left = new Node(11);
root.right = new Node(87);

root.left.left = new Node(8);
root.left.right = new Node(15);

root.right.right = new Node(16);
root.right.left = new Node(4);

console.log(postorder(root));
*/

//! /  6. Level Order Traversal (BFS)
//!  https://leetcode.com/problems/binary-tree-level-order-traversal/



//!  7. Count Nodes
//!  https://leetcode.com/problems/count-complete-tree-nodes/ (normal O(n) version first)



//!  8. Height of Binary Tree
//!  https://leetcode.com/problems/maximum-depth-of-binary-tree/

//!  9. Count Leaf / Full Nodes

//!  10. Sum of Leaf Nodes



//!  11. Print All Root to Leaf Paths
//!  https://leetcode.com/problems/binary-tree-paths/


//!  12. Maximum Root to Leaf Path Sum
//!  https://leetcode.com/problems/binary-tree-maximum-path-sum/ (simplified version)

