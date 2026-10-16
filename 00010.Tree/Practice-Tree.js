//?  =============================================================================
//?  SECTION 1: ABSOLUTE BEGINNER FUNDAMENTALS
//?  =============================================================================

//?  1. Create Binary Tree Node Class
//?  Topic: Node design
//?  Practice: Just write the class

/** 
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
*/


//?  2. Manually Construct a Binary Tree
//?  Topic: Linking nodes

/**
class Node {
    constructor(val) {
        this.val = val,
        this.left = null,
        this.right = null
    }
}

const root = new Node(25);
root.left = new Node(20);
root.left.left = new Node(15);
root.right = new Node(35);
root.right.right = new Node(45);
 */




//?  3. Preorder Traversal (Recursive)
//?  https://leetcode.com/problems/binary-tree-preorder-traversal/
//? Root -> left -> right

/** 
class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function preorderTraversal(root) {
    const result = []

    function dfs(node) {
        if (!node) return;
        result.push(node.val)
        dfs(node.left);
        dfs(node.right);
    }
    dfs(root);
    return result;
}

const root = new Node(40);
root.left = new Node(30);
root.right = new Node(45);

root.left.left = new Node(20);
root.left.right = new Node(25);

root.right.right = new Node(47);
root.right.left = new Node(38);

console.log(preorderTraversal(root))
*/

//?  4. Inorder Traversal (Recursive)
//?  https://leetcode.com/problems/binary-tree-inorder-traversal/
//? left -> root -> right 

/** 
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function inorderTraversal(root) {
    const result = []

    function dfs(node) {
        if (!node) return;
        dfs(node.left)
        result.push(node.value);
        dfs(node.right);
    }
    dfs(root);
    return result;
}

const root = new Node(20);
root.left = new Node(15);
root.right = new Node(28);

root.left.left = new Node(10);
root.left.right = new Node(25);

root.right.right = new Node(35);
root.right.left = new Node(28);

console.log(inorderTraversal(root));
*/

//?  5. Postorder Traversal (Recursive)
//?  https://leetcode.com/problems/binary-tree-postorder-traversal/
//? left -> right -> root

/** 
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function postorderTraversal(root) {
    const result = [];

    function dfs(node) {
        if (!node) return;
        dfs(node.left);
        dfs(node.right);
        result.push(node.value)
    }
    dfs(root);
    return result;
}

const root = new Node(50);
root.left = new Node(25);
root.right = new Node(55);

root.left.left = new Node(20);
root.left.right = new Node(45);

root.right.right = new Node(60);
root.right.left = new Node(52)

console.log(postorderTraversal(root))
*/

//?  6. Level Order Traversal (BFS)
//?  https://leetcode.com/problems/binary-tree-level-order-traversal/

/**
 *  Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).
 */

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function levelOrder(root) {
    
}

//?  7. Count Nodes
//?  https://leetcode.com/problems/count-complete-tree-nodes/ (normal O(n) version first)

class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function countNodes(root) {
    if (!root) return 0;

    if (!root.left && !root.right) return 0;

    return root.val + countNodes(root.left) + countNodes(root.right);
}

const root = new Node(20);
root.left = new Node(18)
root.right = new Node(22)

root.left.right = new Node(5)
root.left.left = new Node(12)

root.right.left = new Node(25)
root.right.right = new Node(30)

console.log(countNodes(root));

//?  8. Height of Binary Tree
//?  https://leetcode.com/problems/maximum-depth-of-binary-tree/

class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function maxDepth(root) {
    if (!root) return 0;

    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};

const root = new Node(70);
root.left = new Node(10);
root.right = new Node(20);

root.left.left = new Node(5);
root.left.right = new Node(10);

root.right.right = new Node(30);
root.right.left = new Node(18);

console.log(maxDepth(root));

//?  9. Count Leaf / Full Nodes

class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function countNodes(root) {
    if (!root) {
        return 0;
    }
    return 1 + countNodes(root.left) + countNodes(root.right);
}

const root = new Node(70);
root.left = new Node(10);
root.right = new Node(20);

root.left.left = new Node(5);
root.left.right = new Node(10);

root.right.right = new Node(30);
root.right.left = new Node(18);

console.log(countNodes(root))

//?  10. Sum of Leaf Nodes

class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

const sumOfNodes = (root) => {
    if (!root) {
        return 0;
    }

    if (!root.left && !root.right) {
        return root.val;
    }
    return sumOfNodes(root.left) + sumOfNodes(root.right);
}

const root = new Node(20);
root.left = new Node(18)
root.right = new Node(22)

root.left.right = new Node(5)
root.left.left = new Node(12)

root.right.left = new Node(25)
root.right.right = new Node(30)

console.log(sumOfNodes(root));

//?  11. Print All Root to Leaf Paths
//?  https://leetcode.com/problems/binary-tree-paths/

//?  12. Maximum Root to Leaf Path Sum
//?  https://leetcode.com/problems/binary-tree-maximum-path-sum/ (simplified version)


//!  =============================================================================
//!  SECTION 2: BEGINNER BST
//!  =============================================================================

//?  13. Insert into BST
//?  https://leetcode.com/problems/insert-into-a-binary-search-tree/

//?  14. Search in BST
//?  https://leetcode.com/problems/search-in-a-binary-search-tree/

//?  15. Min & Max in BST
//?  https://leetcode.com/problems/minimum-absolute-difference-in-bst/ (use min/max logic)





