//  TREE MASTERY ROADMAP - Complete Practice Sheet

//  =============================================================================
//  SECTION 1: ABSOLUTE BEGINNER FUNDAMENTALS
//  =============================================================================

//  1. Create Binary Tree Node Class
//  Topic: Node design
//  Practice: Just write the class

// class Node {
//     constructor(value) {
//         this.value = value;
//         this.left = null;
//         this.right = null;
//     }
// }

// const root = new Node(100);

// console.log(root.value);
// root.right = new Node(5);

// root.left.left = new Node(2);



//  2. Manually Construct a Binary Tree
//  Topic: Linking nodes

// class Node {
//     constructor(value){
//         this.value = value;
//         this.left = null;
//         this.right=null;
//     }
// }

// const root = new Node(100);
// console.log(root.value)

// root.left = new Node(30)
// root.right = new Node(50)
// console.log(root.value, root.left.value , root.right.value)
// root.left.left = new Node(40)
// console.log(root.left.left.value)


//  3. Preorder Traversal (Recursive)
//  https://leetcode.com/problems/binary-tree-preorder-traversal/
// Root -> left -> right

// class Node{
//     constructor(value){
//         this.value = value;
//         this.left = null;
//         this.right = null;

//     }
// }
// function preorder(root){
//     const result =[];
//     function dfs(node){
//         if(!node){
//             return ;
//         }
//         result.push(node.value)
//         dfs(node.left)
//         dfs(node.right)
//     }
//     dfs(root)
//     return result;
// }

// // Depth First Search
// const root  = new Node(100);
// root.left = new Node(50)

// root.right = new Node(80)

// root.left.left = new Node(40)
// root.left.right = new Node(30)

// root.right.left = new Node(70)
// root.right.right = new Node(90)

// console.log(preorder(root))



//          100 

//     50        80 

// 40     30   70     90


// Preorder -- 100 50 40 30 80 70 90

//  4. Inorder Traversal (Recursive)
//  https://leetcode.com/problems/binary-tree-inorder-traversal/
// left -> root -> right 

// class Node {
//     constructor(value) {
//         this.value = value;
//         this.left = null;
//         this.right = null;

//     }
// }
// function inorder(root) {
//     const result = [];
//     function dfs(node) {
//         if (!node) {
//             return;
//         }
//         dfs(node.left)
//         result.push(node.value)
//         dfs(node.right)
//     }
//     dfs(root)
//     return result;
// }

// // Depth First Search
// const root = new Node(100);
// root.left = new Node(50)

// root.right = new Node(80)

// root.left.left = new Node(40)
// root.left.right = new Node(30)

// root.right.left = new Node(70)
// root.right.right = new Node(90)

// console.log(inorder(root))

//  5. Postorder Traversal (Recursive)
//  https://leetcode.com/problems/binary-tree-postorder-traversal/
// left -> right -> root

// class Node {
//     constructor(value) {
//         this.value = value;
//         this.left = null;
//         this.right = null;

//     }
// }
// function postorder(root) {
//     const result = [];
//     function dfs(node) {
//         if (!node) {
//             return;
//         }
//         dfs(node.left)
//         dfs(node.right)
//         result.push(node.value)
//     }
//     dfs(root)
//     return result;
// }

// // Depth First Search
// const root = new Node(100);
// root.left = new Node(50)

// root.right = new Node(80)

// root.left.left = new Node(40)
// root.left.right = new Node(30)

// root.right.left = new Node(70)
// root.right.right = new Node(90)

// console.log(postorder(root))


//  6. Level Order Traversal (BFS)
//  https://leetcode.com/problems/binary-tree-level-order-traversal/

// class Node {
//     constructor(value) {
//         this.value = value;
//         this.left = null;
//         this.right = null;
//     }
// }

// function levelOrderTraversal(root) {
//     if (!root) {
//         return [];
//     }

//     const queue = [root];
//     const result = [];

//     // queue -   C , D , E , F 
//     // result - R , A , B , 
//     // level - 
//     while (queue.length > 0) {
//         const level = [];
//         // const size = queue.length;
//         for (let i = 0; i < queue.length; i++) {
//             const node = queue.shift();
//             level.push(node.value);

//             if (node.left) {
//                 queue.push(node.left);
//             }
//             if (node.right) {
//                 queue.push(node.right);
//             }

//         }
//         result.push(...level)


//     }
//     return result;
// }

//  7. Count Nodes
//  https://leetcode.com/problems/count-complete-tree-nodes/ (normal O(n) version first)

function countNodes(root) {
    if (!root) {
        return 0;
    }
    return 1 + countNodes(root.left) + countNodes(root.right);
}

// R -- 1 + 3 and B 


//  8. Height of Binary Tree
//  https://leetcode.com/problems/maximum-depth-of-binary-tree/

//  9. Count Leaf / Full Nodes

//  10. Sum of Leaf Nodes



//  11. Print All Root to Leaf Paths
//  https://leetcode.com/problems/binary-tree-paths/

// class Node {
//     constructor(val) {
//         this.val = val
//         this.left = null
//         this.right = null
//     }
// }

// var binaryTreePaths = function (root) {
//     if (!root) {
//         return [];
//     }

//     const result = [];
//     function dfs(node, path) {
//         path.push(node.val)

//         if (!node.left && !node.right) {
//             result.push(path.join("->"))
//         }

//         if (node.left) {
//             dfs(node.left, path)
//         }
//         if (node.right) {
//             dfs(node.right, path)
//         }

//         path.pop();

//     }
//     dfs(root, []);
//     return result;

// }

// Depth First Search
// const root = new Node(100);
// root.left = new Node(50)

// root.right = new Node(80)

// root.left.left = new Node(40)
// root.left.right = new Node(30)

// root.right.left = new Node(70)
// root.right.right = new Node(90)

// console.log(binaryTreePaths(root))

//  12. Maximum Root to Leaf Path Sum
//  https://leetcode.com/problems/binary-tree-maximum-path-sum/ (simplified version)


//  =============================================================================
//  SECTION 2: BEGINNER BST
//  =============================================================================

//  13. Insert into BST
//  https://leetcode.com/problems/insert-into-a-binary-search-tree/
function InsertIntoBST(root, val) {

    if (!root) {
        return new TreeNode(val)
    }

    if (val < root.val) {
        root.left = InsertIntoBST(root.left, val)
    } else {
        root.right = InsertIntoBST(root.right, val)
    }
    return root;
}

//  14. Search in BST
//  https://leetcode.com/problems/search-in-a-binary-search-tree/
function serachBST(root, val) {
    if (!root) {
        return null;
    }

    if (root.val === val) {
        return root;
    }
    if (val < root.val) {
        return serachBST(root.left, val)
    } else {
        return serachBST(root.right, val)
    }

}


//  15. Min & Max in BST
//  https://leetcode.com/problems/minimum-absolute-difference-in-bst/ (use min/max logic)
function MinBST(root) {
    while (root.left) {
        root = root.left
    }
    return root.val

}

function MaxBST(root) {
    while (root.right) {
        root = root.right
    }
    return root.val
}

//  16. Sorted Array to Balanced BST
//  https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/

//  17. Validate Binary Search Tree
//  https://leetcode.com/problems/validate-binary-search-tree/

//  18. Kth Smallest Element in BST
//  https://leetcode.com/problems/kth-smallest-element-in-a-bst/

//  =============================================================================
//  SECTION 3: LOWER INTERMEDIATE
//  =============================================================================

//  19. Symmetric Tree
//  https://leetcode.com/problems/symmetric-tree/

//  20. Balanced Binary Tree
//  https://leetcode.com/problems/balanced-binary-tree/

//  21. Minimum Depth of Binary Tree
//  https://leetcode.com/problems/minimum-depth-of-binary-tree/

//  22. Same Tree
//  https://leetcode.com/problems/same-tree/

//  23. Path Sum (I, II, III)
//  https://leetcode.com/problems/path-sum/
//  https://leetcode.com/problems/path-sum-ii/
//  https://leetcode.com/problems/path-sum-iii/

//  =============================================================================
//  SECTION 4: HIGHER INTERMEDIATE
//  =============================================================================

//  24. Lowest Common Ancestor (Binary Tree)
//  https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/

//  25. LCA in BST
//  https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/

//  26. Binary Tree Right Side View
//  https://leetcode.com/problems/binary-tree-right-side-view/

//  27. Left Side View (reverse of above)

//  28. Diameter of Binary Tree
//  https://leetcode.com/problems/diameter-of-binary-tree/

//  29. Vertical Order Traversal
//  https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/

//  30. All Nodes Distance K
//  https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/

//  31. Maximum Path Sum
//  https://leetcode.com/problems/binary-tree-maximum-path-sum/

//  =============================================================================
//  SECTION 5: TREE CONSTRUCTION & SERIALIZATION
//  =============================================================================

//  32. Construct BT from Preorder + Inorder
//  https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

//  33. Construct BT from Inorder + Postorder
//  https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/

//  34. Serialize & Deserialize Binary Tree
//  https://leetcode.com/problems/serialize-and-deserialize-binary-tree/

//  35. Boundary Traversal
//  https://practice.geeksforgeeks.org/problems/boundary-traversal-of-binary-tree/1

//  =============================================================================
//  SECTION 6: ADVANCED TRANSFORMATIONS
//  =============================================================================

//  36. Recover BST (two nodes swapped)
//  https://leetcode.com/problems/recover-binary-search-tree/

//  37. Flatten Binary Tree to Linked List
//  https://leetcode.com/problems/flatten-binary-tree-to-linked-list/

//  38. Populating Next Right Pointers II
//  https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/

//  39. Binary Tree Cameras
//  https://leetcode.com/problems/binary-tree-cameras/

//  40. Count Complete Tree Nodes O(log² n)
//  https://leetcode.com/problems/count-complete-tree-nodes/

//  =============================================================================
//  SECTION 7: N-ARY & TRIE
//  =============================================================================

//  41. N-ary Tree Level Order
//  https://leetcode.com/problems/n-ary-tree-level-order-traversal/

//  42. Encode/Decode N-ary Tree
//  https://leetcode.com/problems/encode-n-ary-tree-to-binary-tree/

//  43. Implement Trie (Prefix Tree)
//  https://leetcode.com/problems/implement-trie-prefix-tree/

//  44. Word Search II (Trie + DFS)
//  https://leetcode.com/problems/word-search-ii/

//  =============================================================================
//  SECTION 8: FENWICK & SEGMENT TREES
//  =============================================================================

//  45. Binary Indexed Tree (Fenwick)
//  https://practice.geeksforgeeks.org/problems/fenwick-tree/1

//  46. Segment Tree (Range Sum + Update)
//  https://www.spoj.com/problems/FREQ2/ or build yourself

//  47. Segment Tree + Lazy Propagation
//  https://www.spoj.com/problems/HORRIBLE/

//  =============================================================================
//  SECTION 9: COMPETITIVE PROGRAMMING HARD
//  =============================================================================

//  48. Unique BSTs II (Generate All)
//  https://leetcode.com/problems/unique-binary-search-trees-ii/

//  49. Kth Ancestor - Binary Lifting
//  https://www.spoj.com/problems/LCA/

//  50. Minimum Height Trees
//  https://leetcode.com/problems/minimum-height-trees/

//  51. Sum of Distances in Tree (Rerooting)
//  https://leetcode.com/problems/sum-of-distances-in-tree/

//  52. Heavy-Light Decomposition (Intro)
//  https://codeforces.com/problemset/problem/1172/E

//  53. Centroid Decomposition (Intro)
//  https://codeforces.com/problemset/problem/321/C
