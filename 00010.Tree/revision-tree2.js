//?  1. Create Binary Tree Node Class
//?  Topic: Node design
//?  Practice: Just write the class

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

//?  2. Manually Construct a Binary Tree
//?  Topic: Linking nodes

// const root = new Node(25);
// root.left = new Node(15);
// root.right = new Node(20);

// root.left.left = new Node(12);
// root.left.right = new Node(18);

// root.right.right = new Node(27);
// root.right.left = new Node(10);

//?  3. Preorder Traversal (Recursive)
//?  https://leetcode.com/problems/binary-tree-preorder-traversal/
//? Root -> left -> right

// function preorder(root) {
//     const result = [];

//     function dfs(node) {
//         if (!node) return 0;
//         result.push(node.value);
//         dfs(node.left);
//         dfs(node.right);
//     }
//     dfs(root);
//     return result;
// }

// console.log(preorder(root))

//?  4. Inorder Traversal (Recursive)
//?  https://leetcode.com/problems/binary-tree-inorder-traversal/
//? left -> root -> right 

// function inorder(root) {
//     const result = [];

//     function dfs(node) {
//         if (!node) return 0;
//         dfs(node.left);
//         result.push(node.value);
//         dfs(node.right);
//     }
//     dfs(root);
//     return result;
// }

// console.log(inorder(root));

//?  5. Postorder Traversal (Recursive)
//?  https://leetcode.com/problems/binary-tree-postorder-traversal/
//? left -> right -> root

// function postorder(root) {
//     const result = [];

//     function dfs(node) {
//         if (!node) return 0;
//         dfs(node.left);
//         dfs(node.right);
//         result.push(node.value);
//     }
//     dfs(root);
//     return result;
// }

// console.log(postorder(root));

//? /  6. Level Order Traversal (BFS)
//?  https://leetcode.com/problems/binary-tree-level-order-traversal/

// function levelOrder(root) {
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

//?  7. Count Nodes
//?  https://leetcode.com/problems/count-complete-tree-nodes/ (normal O(n) version first)

// function countNodes(root) {
//     // check if the root exists
//     if (!root) return 0;
//     // base case
//     return 1 + countNodes(root.left) + countNodes(root.right)
// }

// console.log(countNodes(root));

//?  8. Height of Binary Tree
//?  https://leetcode.com/problems/maximum-depth-of-binary-tree/

// function maxDepth(root) {
//     // check if the root exists
//     if (!root) return 0;
//     // base case
//     return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
// }

// console.log(maxDepth(root));

//?  9. Count Leaf / Full Nodes

// function countLeaf(root) {
//     // check if the root exists
//     if (!root) return 0;
//     // check if root.left and root.right have children
//     if (!root.left && !root.right) return 1
//     // base case
//     return countLeaf(root.left) + countLeaf(root.right);
// }

// console.log(countLeaf(root));


//?  10. Sum of Leaf Nodes

//?  13. Insert into BST
//?  https://leetcode.com/problems/insert-into-a-binary-search-tree/

function insert(root, value) {
    // check if the root exists
    if (!root) return new Node(value);

    if (value < root.value) {
        root.left = insert(root.left, value);
    } else {
        root.right = insert(root.right, value);
    }
    console.log(root.left)
    return root;
}

console.log(insert(45, 10));

//?  14. Search in BST
//?  https://leetcode.com/problems/search-in-a-binary-search-tree/

function searchTree(root, value) {
    if (!root) return new Node(value);

    if (value === root.value) {
        root.left = searchTree(root.left, value);
    } else {
        root.right = searchTree(root.right, value);
    }
    return root;
}

//?  15. Min & Max in BST
//?  https://leetcode.com/problems/minimum-absolute-difference-in-bst/ (use min/max logic)

function minimum(root) {
    if (!root) return 0;

    if (!root.left && !root.right) return 1;

    return 1 + Math.min(minimum(root.left), minimum(root.right));
}

console.log(minimum(root));




