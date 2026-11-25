# 2D Dynamic Programming

Generated from `src/` by `scripts/build.js`. Edit the sources, not this file.

## A. Grid paths

- Move through a grid in fixed directions, never back.
- Count the routes or find the cheapest one.
- State: `dp(i, j)` = answer for the trip from the start to `(i, j)`. Triangle and Dungeon run the other way.

### A1. Unique Paths (LC 62, Medium)

https://leetcode.com/problems/unique-paths/

Robot starts top-left of an `m × n` grid, moves only right or down. Count the routes to bottom-right.

```
m = 3, n = 7  →  28
m = 3, n = 2  →  3
```

| DP card | |
| --- | --- |
| State | Ways to reach `(i, j)` from the start |
| Choices | Came from above or from the left |
| Recurrence | `dp(i-1, j) + dp(i, j-1)` |
| Base cases | Off the grid → `0`. Start → `1` |
| Answer | `dp(m-1, n-1)` |
| Fill order | Top-left → bottom-right |

- Every route into a cell arrives from above or from the left. The two groups never overlap, so add them.
- First row and first column are all 1: only one straight line reaches them.
- The padding row and column (dashed) are the "off the grid" zeros, so the loop needs no bounds check.

Filled table for m = 3, n = 3:

```
    |   pad     0     1     2
pad |     0     0     0     0
0   |     0     1     1     1
1   |     0     1     2     3
2   |     0     1     3     6
```

**Memo**

```js
var uniquePaths = function (m, n) {
    const memo = Array.from({ length: m }, () => Array(n)); // memo

    // dp(i, j) = number of ways to reach (i, j) from the start
    function dp(i, j) {
        if (i < 0 || j < 0) return 0;                    // off the grid
        if (i === 0 && j === 0) return 1;                // the start
        if (memo[i][j] !== undefined) return memo[i][j]; // memo

        return memo[i][j] = dp(i - 1, j) + dp(i, j - 1); // from above + from the left
    }

    return dp(m - 1, n - 1);
};
```

**Table** — Row 0 and column 0 are padding (0), so cell (i, j) of the grid is dp[i + 1][j + 1].

```js
var uniquePaths = function (m, n) {
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (i === 1 && j === 1) dp[i][j] = 1;          // the start
            else dp[i][j] = dp[i - 1][j] + dp[i][j - 1];   // from above + from the left
        }
    }

    return dp[m][n];
};
```

**One row** — dp[j] still holds the row above until it is overwritten.

```js
var uniquePaths = function (m, n) {
    const dp = Array(n).fill(1); // first row: one way to reach every cell

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[j] = dp[j] + dp[j - 1]; // above (old dp[j]) + left (new dp[j - 1])
        }
    }

    return dp[n - 1];
};
```

- Q: Set m = 1, n = 5. What does the table look like?
  A: One row of 1s. A corridor has one route.
- Q: Is there a formula?
  A: C(m+n−2, m−1): choose which of the m+n−2 moves are "down". For 3 × 7 that is 28. The next problem breaks the formula, the DP does not.

Complexity: Recursion O(2^m+n). Memo / table O(m·n). One row: O(n) memory.

### A2. Unique Paths II (LC 63, Medium)

https://leetcode.com/problems/unique-paths-ii/

Same as A1, but some cells hold a rock (`1`) that the robot cannot enter.

```
[[0,0,0],
 [0,1,0],
 [0,0,0]]  →  2
```

| DP card | |
| --- | --- |
| State | Ways to reach `(i, j)` avoiding rocks |
| Choices | From above or from the left |
| Recurrence | Same as A1 |
| Base cases | Off the grid → `0`. **Rock → `0`**. Start → `1` |
| Answer | `dp(m-1, n-1)` |
| Fill order | Top-left → bottom-right |

- One extra base case: a rock contributes 0 routes.
- Check the rock before the start. A rock on the start means 0 routes, not 1.

Filled table for g = [[0,0,0],[0,1,0],[0,0,0]]:

```
    |   pad     0     1     2
pad |     0     0     0     0
0   |     0     1     1     1
1   |     0     1     0     1
2   |     0     1     1     2
```

**Memo**

```js
var uniquePathsWithObstacles = function (grid) {
    const m = grid.length, n = grid[0].length;
    const memo = Array.from({ length: m }, () => Array(n)); // memo

    function dp(i, j) {
        if (i < 0 || j < 0) return 0;                    // off the grid
        if (grid[i][j] === 1) return 0;                  // rock: check before the start
        if (i === 0 && j === 0) return 1;                // the start
        if (memo[i][j] !== undefined) return memo[i][j]; // memo

        return memo[i][j] = dp(i - 1, j) + dp(i, j - 1);
    }

    return dp(m - 1, n - 1);
};
```

**Table** — Row 0 and column 0 are padding (0).

```js
var uniquePathsWithObstacles = function (grid) {
    const m = grid.length, n = grid[0].length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (grid[i - 1][j - 1] === 1) dp[i][j] = 0;    // rock
            else if (i === 1 && j === 1) dp[i][j] = 1;     // the start
            else dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }

    return dp[m][n];
};
```

**One row** — dp[0] is padding. Setting dp[1] = 1 first gives the start cell its 1.

```js
var uniquePathsWithObstacles = function (grid) {
    const m = grid.length, n = grid[0].length;
    const dp = Array(n + 1).fill(0);
    dp[1] = 1;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            dp[j + 1] = grid[i][j] === 1 ? 0 : dp[j + 1] + dp[j];
        }
    }

    return dp[n];
};
```

- Q: Put a rock on the start cell. What happens?
  A: Every cell becomes 0. If the "is this the start?" check ran first, the start would return 1 and the answer would be wrong.

Complexity: Same as A1.

### A3. Minimum Path Sum (LC 64, Medium)

https://leetcode.com/problems/minimum-path-sum/

Each cell has a cost. Go from top-left to bottom-right moving right or down. Minimise the total.

```
[[1,3,1],
 [1,5,1],
 [4,2,1]]  →  7   (1 → 3 → 1 → 1 → 1)
```

| DP card | |
| --- | --- |
| State | Cheapest cost to reach `(i, j)`, including it |
| Choices | From above or from the left |
| Recurrence | `grid[i][j] + min(dp(i-1, j), dp(i, j-1))` |
| Base cases | Off the grid → `Infinity`. Start → `grid[0][0]` |
| Answer | `dp(m-1, n-1)` |
| Fill order | Top-left → bottom-right |

- Counting → optimising, so `+` becomes `min`.
- Off the grid must be `Infinity`, not 0. `min` would happily pick a 0.
- To recover the path, start at the bottom-right and step back to the smaller of above / left.

Filled table for g = [[1,3,1],[1,5,1],[4,2,1]]:

```
    |   pad     0     1     2
pad |     ∞     ∞     ∞     ∞
0   |     ∞     1     4     5
1   |     ∞     2     7     6
2   |     ∞     6     8     7
```

**Memo**

```js
var minPathSum = function (grid) {
    const m = grid.length, n = grid[0].length;
    const memo = Array.from({ length: m }, () => Array(n)); // memo

    // dp(i, j) = cheapest cost to reach (i, j), counting this cell
    function dp(i, j) {
        if (i < 0 || j < 0) return Infinity;             // off the grid: never pick it
        if (i === 0 && j === 0) return grid[0][0];       // the start
        if (memo[i][j] !== undefined) return memo[i][j]; // memo

        return memo[i][j] = grid[i][j] + Math.min(dp(i - 1, j), dp(i, j - 1));
    }

    return dp(m - 1, n - 1);
};
```

**Table** — Row 0 and column 0 are padding (Infinity).

```js
var minPathSum = function (grid) {
    const m = grid.length, n = grid[0].length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(Infinity));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (i === 1 && j === 1) dp[i][j] = grid[0][0];
            else dp[i][j] = grid[i - 1][j - 1] + Math.min(dp[i - 1][j], dp[i][j - 1]);
        }
    }

    return dp[m][n];
};
```

**One row** — dp[0] is padding. Setting dp[1] = 0 first makes the start cell cost grid[0][0].

```js
var minPathSum = function (grid) {
    const m = grid.length, n = grid[0].length;
    const dp = Array(n + 1).fill(Infinity);
    dp[1] = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            dp[j + 1] = grid[i][j] + Math.min(dp[j + 1], dp[j]); // above, left
        }
    }

    return dp[n];
};
```

- Q: What goes wrong if off the grid returns 0?
  A: Cells on the top row and left column pick the fake 0 instead of their real neighbour, so the answer comes out too small.

Complexity: O(m·n) time. O(n) memory with one row.

### A4. Triangle (LC 120, Medium)

https://leetcode.com/problems/triangle/

From each number you may step to one of the two numbers directly below. Find the smallest top-to-bottom sum.

```
      2
     3 4
    6 5 7
   4 1 8 3     →  11   (2 + 3 + 5 + 1)
```

| DP card | |
| --- | --- |
| State | Cheapest sum from `(i, j)` down to the bottom |
| Choices | Down `(i+1, j)` or down-right `(i+1, j+1)` |
| Recurrence | `t[i][j] + min(dp(i+1, j), dp(i+1, j+1))` |
| Base cases | Bottom row → `t[i][j]` |
| Answer | `dp(0, 0)` |
| Fill order | **Bottom → top** |

- **Why reverse:** the top has one cell, the bottom has many. Going bottom-up, the answer lands in one cell, `dp(0, 0)`, with no edge checks.
- Going top-down also works, but then you take the min over the whole last row.
- Stored left-aligned: "down" is the same column, "down-right" is the next one.

Filled table for t = [[2],[3,4],[6,5,7],[4,1,8,3]]:

```
  |     0     1     2     3
0 |    11                  
1 |     9    10            
2 |     7     6    10      
3 |     4     1     8     3
```

**Memo**

```js
var minimumTotal = function (triangle) {
    const n = triangle.length;
    const memo = Array.from({ length: n }, (_, i) => Array(i + 1)); // memo

    // dp(i, j) = cheapest sum from (i, j) down to the bottom row
    function dp(i, j) {
        if (i === n - 1) return triangle[i][j];          // bottom row
        if (memo[i][j] !== undefined) return memo[i][j]; // memo

        return memo[i][j] = triangle[i][j] + Math.min(dp(i + 1, j), dp(i + 1, j + 1));
    }

    return dp(0, 0);
};
```

**One row** — Start from the bottom row and fold it upward. The answer ends up in dp[0].

```js
var minimumTotal = function (triangle) {
    const n = triangle.length;
    const dp = [...triangle[n - 1]]; // bottom row

    for (let i = n - 2; i >= 0; i--) {
        for (let j = 0; j <= i; j++) {
            dp[j] = triangle[i][j] + Math.min(dp[j], dp[j + 1]);
        }
    }

    return dp[0];
};
```

- Q: The one-row version overwrites dp[j] left to right. Why is that safe?
  A: Cell j reads only dp[j] and dp[j+1]. dp[j+1] is still the old row, and nothing later needs the old dp[j].

Complexity: Memo / table O(n²). One row: O(n) memory.

### A5. Minimum Falling Path Sum (LC 931, Medium)

https://leetcode.com/problems/minimum-falling-path-sum/

Start on any cell of the top row. Each step falls down, down-left or down-right. Minimise the sum.

```
[[2,1,3],
 [6,5,4],
 [7,8,9]]  →  13   (1 → 5 → 7)
```

| DP card | |
| --- | --- |
| State | Cheapest fall that lands on `(i, j)` |
| Choices | Came from up-left, up, or up-right |
| Recurrence | `a[i][j] + min(of those three)` |
| Base cases | Column off the edge → `Infinity`. Top row → `a[0][j]` |
| Answer | **Smallest** value in the last row |
| Fill order | Top row → bottom row |

- Two changes from A3: three choices, and any column can start or end.
- Any start: the whole top row is a base case.
- Any end: take the min over the last row.

Filled table for g = [[2,1,3],[6,5,4],[7,8,9]]:

```
  |     0     1     2
0 |     2     1     3
1 |     7     6     5
2 |    13    13    14
```

**Memo**

```js
var minFallingPathSum = function (matrix) {
    const n = matrix.length;
    const memo = Array.from({ length: n }, () => Array(n)); // memo

    // dp(i, j) = cheapest fall from the top row that lands on (i, j)
    function dp(i, j) {
        if (j < 0 || j >= n) return Infinity;            // column off the edge
        if (i === 0) return matrix[0][j];                // top row: the fall starts here
        if (memo[i][j] !== undefined) return memo[i][j]; // memo

        return memo[i][j] = matrix[i][j] + Math.min(dp(i - 1, j - 1), dp(i - 1, j), dp(i - 1, j + 1));
    }

    let best = Infinity;
    for (let j = 0; j < n; j++) best = Math.min(best, dp(n - 1, j)); // can end in any column
    return best;
};
```

**Table**

```js
var minFallingPathSum = function (matrix) {
    const n = matrix.length;
    const dp = Array.from({ length: n }, () => Array(n).fill(0));
    for (let j = 0; j < n; j++) dp[0][j] = matrix[0][j]; // top row

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const upLeft  = j > 0     ? dp[i - 1][j - 1] : Infinity;
            const upRight = j < n - 1 ? dp[i - 1][j + 1] : Infinity;
            dp[i][j] = matrix[i][j] + Math.min(upLeft, dp[i - 1][j], upRight);
        }
    }

    return Math.min(...dp[n - 1]);
};
```

**Two rows** — Each cell reads both diagonals of the row above, so keep the old row separate.

```js
var minFallingPathSum = function (matrix) {
    const n = matrix.length;
    let prev = [...matrix[0]];

    for (let i = 1; i < n; i++) {
        const cur = Array(n);
        for (let j = 0; j < n; j++) {
            const upLeft  = j > 0     ? prev[j - 1] : Infinity;
            const upRight = j < n - 1 ? prev[j + 1] : Infinity;
            cur[j] = matrix[i][j] + Math.min(upLeft, prev[j], upRight);
        }
        prev = cur;
    }

    return Math.min(...prev);
};
```

- Q: Why keep two rows instead of updating one array in place?
  A: Cell j needs the old value at j−1. Updating left to right would already have overwritten it.

Complexity: O(n²) time, O(n) memory.

### A6. Dungeon Game (LC 174, Hard)

https://leetcode.com/problems/dungeon-game/

Knight goes from top-left to the princess at bottom-right, moving right or down. Rooms add or remove health. Health must stay ≥ 1. Find the lowest starting health.

```
[[-2, -3,  3],
 [-5,-10,  1],
 [10, 30, -5]]  →  7
```

| DP card | |
| --- | --- |
| State | Health needed **on entering** `(i, j)` |
| Choices | Go right or down |
| Recurrence | `max(1, min(dp(i, j+1), dp(i+1, j)) − d[i][j])` |
| Base cases | Off the grid → `Infinity`. Princess → `max(1, 1 − d)` |
| Answer | `dp(0, 0)` |
| Fill order | **Bottom-right → top-left** |

- **Why reverse:** what you need at the start depends on the rooms still ahead.
- Forward, one number per cell is not enough: you would need current health *and* the lowest point so far (see the picture).
- Backward, one number is enough: "health needed when walking in here".
- `max(1, …)`: a healing room can push the need to 0 or below, but you must still be alive.

Filled table for g = [[-2,-3,3],[-5,-10,1],[10,30,-5]]:

```
    |     0     1     2   pad
0   |     7     5     2     ∞
1   |     6    11     5     ∞
2   |     1     1     6     1
pad |     ∞     ∞     1     ∞
```

**Memo**

```js
var calculateMinimumHP = function (dungeon) {
    const m = dungeon.length, n = dungeon[0].length;
    const memo = Array.from({ length: m }, () => Array(n)); // memo

    // dp(i, j) = health needed when walking into (i, j)
    function dp(i, j) {
        if (i >= m || j >= n) return Infinity;
        if (i === m - 1 && j === n - 1) return Math.max(1, 1 - dungeon[i][j]);
        if (memo[i][j] !== undefined) return memo[i][j]; // memo

        const need = Math.min(dp(i, j + 1), dp(i + 1, j)) - dungeon[i][j];
        return memo[i][j] = Math.max(1, need);
    }

    return dp(0, 0);
};
```

**Table** — Padding is Infinity, except the two cells next to the princess, which are 1.

```js
var calculateMinimumHP = function (dungeon) {
    const m = dungeon.length, n = dungeon[0].length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(Infinity));
    dp[m][n - 1] = 1;
    dp[m - 1][n] = 1;

    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            const need = Math.min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j];
            dp[i][j] = Math.max(1, need);
        }
    }

    return dp[0][0];
};
```

- Q: The table sets dp[m][n-1] = 1 and dp[m-1][n] = 1. Why?
  A: Those are the padding cells below and right of the princess. "After the last room you need 1 health." Then the princess uses the same formula as every other room.

Complexity: O(m·n) time. O(n) memory with one row.

## B. Squares in a grid

- Find or count squares made only of 1s.
- Describe a square by its bottom-right corner.
- State: `dp(i, j)` = side of the biggest all-1 square ending at `(i, j)`.

### B1. Maximal Square (LC 221, Medium)

https://leetcode.com/problems/maximal-square/

Matrix of **strings** `"0"` / `"1"`. Return the area of the largest all-1 square.

```
[["1","0","1","0","0"],
 ["1","0","1","1","1"],
 ["1","1","1","1","1"],
 ["1","0","0","1","0"]]  →  4
```

| DP card | |
| --- | --- |
| State | Side of the biggest square ending at `(i, j)` |
| Choices | Look up, left, and up-left |
| Recurrence | `"1"` → `1 + min(top, left, diag)`. `"0"` → `0` |
| Base cases | Outside → `0` |
| Answer | `(largest value)²` |
| Fill order | Top-left → bottom-right |

- The square can end anywhere: fill the whole table, track the max.
- Table version shifts indices by one: `dp[i][j]` is `matrix[i-1][j-1]`.
- Input is strings. Compare with `"1"`, not `1`.

Filled table for g = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]:

```
    |   pad     0     1     2     3     4
pad |     0     0     0     0     0     0
0   |     0     1     0     1     0     0
1   |     0     1     0     1     1     1
2   |     0     1     1     1     2     2
3   |     0     1     0     0     1     0
```

**Memo**

```js
var maximalSquare = function (matrix) {
    const m = matrix.length, n = matrix[0].length;
    const memo = Array.from({ length: m }, () => Array(n)); // memo

    // dp(i, j) = side of the biggest all-1 square with bottom-right corner (i, j)
    function dp(i, j) {
        if (i < 0 || j < 0) return 0;
        if (matrix[i][j] === "0") return 0;              // strings, not numbers
        if (memo[i][j] !== undefined) return memo[i][j]; // memo

        return memo[i][j] = 1 + Math.min(dp(i - 1, j), dp(i, j - 1), dp(i - 1, j - 1));
    }

    let best = 0;
    for (let i = 0; i < m; i++)
        for (let j = 0; j < n; j++)
            best = Math.max(best, dp(i, j));

    return best * best;
};
```

**Table** — Row 0 and column 0 are padding (0).

```js
var maximalSquare = function (matrix) {
    const m = matrix.length, n = matrix[0].length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    let best = 0;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (matrix[i - 1][j - 1] === "1") {
                dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
                best = Math.max(best, dp[i][j]);
            }
        }
    }

    return best * best;
};
```

**One row** — One row plus a variable for the diagonal.

```js
var maximalSquare = function (matrix) {
    const m = matrix.length, n = matrix[0].length;
    const dp = Array(n + 1).fill(0);
    let best = 0;

    for (let i = 1; i <= m; i++) {
        let diag = 0;                     // dp[i-1][j-1]
        for (let j = 1; j <= n; j++) {
            const top = dp[j];            // still the previous row
            if (matrix[i - 1][j - 1] === "1") {
                dp[j] = 1 + Math.min(top, dp[j - 1], diag);
                best = Math.max(best, dp[j]);
            } else {
                dp[j] = 0;
            }
            diag = top;
        }
    }

    return best * best;
};
```

- Q: What if you compare with the number 0 instead of "0"?
  A: "0" === 0 is false, so every cell counts as 1. The 4 × 5 example returns 16.

Complexity: O(m·n) time. O(n) memory with one row + a diagonal variable.

### B2. Count Square Submatrices with All Ones (LC 1277, Medium)

https://leetcode.com/problems/count-square-submatrices-with-all-ones/

Count every all-1 square of any size. The matrix holds numbers.

```
[[0,1,1,1],
 [1,1,1,1],
 [0,1,1,1]]  →  15
```

| DP card | |
| --- | --- |
| State | Same as B1 |
| Choices | Same as B1 |
| Recurrence | Same as B1 |
| Base cases | Same as B1 |
| Answer | **Sum** of every cell |
| Fill order | Top-left → bottom-right |

- If the biggest square ending at a cell has side 3, exactly 3 squares end there (1×1, 2×2, 3×3).
- So add up every dp value.

Filled table for g = [[0,1,1,1],[1,1,1,1],[0,1,1,1]]:

```
    |   pad     0     1     2     3
pad |     0     0     0     0     0
0   |     0     0     1     1     1
1   |     0     1     1     2     2
2   |     0     0     1     2     3
```

**Memo**

```js
var countSquares = function (matrix) {
    const m = matrix.length, n = matrix[0].length;
    const memo = Array.from({ length: m }, () => Array(n)); // memo

    function dp(i, j) {
        if (i < 0 || j < 0) return 0;
        if (matrix[i][j] === 0) return 0;                // numbers here
        if (memo[i][j] !== undefined) return memo[i][j]; // memo

        return memo[i][j] = 1 + Math.min(dp(i - 1, j), dp(i, j - 1), dp(i - 1, j - 1));
    }

    let total = 0;
    for (let i = 0; i < m; i++)
        for (let j = 0; j < n; j++)
            total += dp(i, j);

    return total;
};
```

**Table**

```js
var countSquares = function (matrix) {
    const m = matrix.length, n = matrix[0].length;
    const dp = matrix.map(row => [...row]); // copy, don't change the input
    let total = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (dp[i][j] === 1 && i > 0 && j > 0) {
                dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
            }
            total += dp[i][j];
        }
    }

    return total;
};
```

- Q: Which single line differs from B1?
  A: `best = Math.max(best, dp)` becomes `total += dp`.

Complexity: O(m·n) time.

## C. Two strings

- One pointer per string.
- Each step: compare the two current letters, then decide.
- State: `dp(i, j)` = answer for the first `i` letters of `a` and the first `j` letters of `b`.

### C1. Longest Common Subsequence (LC 1143, Medium)

https://leetcode.com/problems/longest-common-subsequence/

Length of the longest sequence of letters found in both strings in the same order (gaps allowed).

```
"abcde", "ace"  →  3   ("ace")
```

| DP card | |
| --- | --- |
| State | LCS of `a[0..i)` and `b[0..j)` |
| Choices | Last letters match → use both. Else drop one |
| Recurrence | Match: `1 + dp(i-1, j-1)`. Else `max(dp(i-1, j), dp(i, j-1))` |
| Base cases | Either prefix empty → `0` |
| Answer | `dp(n, m)` |
| Fill order | Top-left → bottom-right |

- Base for the whole family. C2–C5 are the same table with different rules.
- Row/column ∅ = empty prefix.
- Diagonal = use both letters. Up = drop a letter of `a`. Left = drop a letter of `b`.

Filled table for a = abcde, b = ace:

```
  |     ∅     a     c     e
∅ |     0     0     0     0
a |     0     1     1     1
b |     0     1     1     1
c |     0     1     2     2
d |     0     1     2     2
e |     0     1     2     3
```

**Memo**

```js
var longestCommonSubsequence = function (text1, text2) {
    const n = text1.length, m = text2.length;
    const memo = Array.from({ length: n + 1 }, () => Array(m + 1)); // memo

    // dp(i, j) = LCS of the first i letters of text1 and the first j letters of text2
    function dp(i, j) {
        if (i === 0 || j === 0) return 0;                // one side is empty
        if (memo[i][j] !== undefined) return memo[i][j]; // memo

        if (text1[i - 1] === text2[j - 1]) return memo[i][j] = 1 + dp(i - 1, j - 1);
        return memo[i][j] = Math.max(dp(i - 1, j), dp(i, j - 1));
    }

    return dp(n, m);
};
```

**Table** — Row 0 and column 0 mean "empty string", so they stay 0.

```js
var longestCommonSubsequence = function (text1, text2) {
    const n = text1.length, m = text2.length;
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (text1[i - 1] === text2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
            else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }

    return dp[n][m];
};
```

**Two rows**

```js
var longestCommonSubsequence = function (text1, text2) {
    const n = text1.length, m = text2.length;
    let prev = Array(m + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        const cur = Array(m + 1).fill(0);
        for (let j = 1; j <= m; j++) {
            if (text1[i - 1] === text2[j - 1]) cur[j] = 1 + prev[j - 1];
            else cur[j] = Math.max(prev[j], cur[j - 1]);
        }
        prev = cur;
    }

    return prev[m];
};
```

- Q: When the letters match, why not also try dropping one?
  A: Pairing them is never worse. Any answer that skips one of them could pair them instead and be just as long.

Complexity: O(n·m) time. O(m) memory with two rows.

### C2. Delete Operation for Two Strings (LC 583, Medium)

https://leetcode.com/problems/delete-operation-for-two-strings/

Delete one letter at a time from either string. Fewest deletions to make them equal?

```
"sea", "eat"  →  2   (delete "s" and "t", both become "ea")
```

| DP card | |
| --- | --- |
| State | Fewest deletions to make `a[0..i)` and `b[0..j)` equal |
| Choices | Match → keep both. Else delete from `a` or from `b` |
| Recurrence | Match: `dp(i-1, j-1)`. Else `1 + min(dp(i-1, j), dp(i, j-1))` |
| Base cases | `i = 0` → `j`. `j = 0` → `i` |
| Answer | `dp(n, m)` |
| Fill order | Top-left → bottom-right |

- Shortcut: `n + m − 2·LCS`.
- Worth writing directly once: the base case is not zero. An empty prefix means deleting everything in the other.
- Edit Distance uses the same base case.

Filled table for a = sea, b = eat:

```
  |     ∅     e     a     t
∅ |     0     1     2     3
s |     1     2     3     4
e |     2     1     2     3
a |     3     2     1     2
```

**Memo**

```js
var minDistance = function (word1, word2) {
    const n = word1.length, m = word2.length;
    const memo = Array.from({ length: n + 1 }, () => Array(m + 1)); // memo

    // dp(i, j) = fewest deletions to make the first i letters of word1
    //            equal to the first j letters of word2
    function dp(i, j) {
        if (i === 0) return j;                           // delete everything in word2's prefix
        if (j === 0) return i;                           // delete everything in word1's prefix
        if (memo[i][j] !== undefined) return memo[i][j]; // memo

        if (word1[i - 1] === word2[j - 1]) return memo[i][j] = dp(i - 1, j - 1);
        return memo[i][j] = 1 + Math.min(dp(i - 1, j), dp(i, j - 1));
    }

    return dp(n, m);
};
```

**Table**

```js
var minDistance = function (word1, word2) {
    const n = word1.length, m = word2.length;
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
    for (let i = 0; i <= n; i++) dp[i][0] = i;
    for (let j = 0; j <= m; j++) dp[0][j] = j;

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
            else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1]);
        }
    }

    return dp[n][m];
};
```

Complexity: O(n·m).

### C3. Edit Distance (LC 72, Medium)

https://leetcode.com/problems/edit-distance/

Turn `word1` into `word2` with insert, delete, replace. Fewest operations?

```
"horse", "ros"  →  3
  horse → rorse  (replace h with r)
  rorse → rose   (delete r)
  rose  → ros    (delete e)
```

| DP card | |
| --- | --- |
| State | Fewest operations to turn `a[0..i)` into `b[0..j)` |
| Choices | Match → free. Else insert, delete or replace |
| Recurrence | Match: `dp(i-1, j-1)`. Else `1 + min(left, up, diag)` |
| Base cases | `i = 0` → `j` inserts. `j = 0` → `i` deletes |
| Answer | `dp(n, m)` |
| Fill order | Top-left → bottom-right |

- Same as C2 plus one arrow: replace (diagonal, cost 1).
- Left = insert `b[j-1]`. Up = delete `a[i-1]`. Diagonal = replace.

Filled table for a = horse, b = ros:

```
  |     ∅     r     o     s
∅ |     0     1     2     3
h |     1     1     2     3
o |     2     2     1     2
r |     3     2     2     2
s |     4     3     3     2
e |     5     4     4     3
```

**Memo**

```js
var minDistance = function (word1, word2) {
    const n = word1.length, m = word2.length;
    const memo = Array.from({ length: n + 1 }, () => Array(m + 1)); // memo

    // dp(i, j) = fewest operations to turn the first i letters of word1
    //            into the first j letters of word2
    function dp(i, j) {
        if (i === 0) return j;                           // insert j letters
        if (j === 0) return i;                           // delete i letters
        if (memo[i][j] !== undefined) return memo[i][j]; // memo

        if (word1[i - 1] === word2[j - 1]) return memo[i][j] = dp(i - 1, j - 1);
        return memo[i][j] = 1 + Math.min(
            dp(i, j - 1),       // insert word2[j-1]
            dp(i - 1, j),       // delete word1[i-1]
            dp(i - 1, j - 1)    // replace
        );
    }

    return dp(n, m);
};
```

**Table**

```js
var minDistance = function (word1, word2) {
    const n = word1.length, m = word2.length;
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
    for (let i = 0; i <= n; i++) dp[i][0] = i;
    for (let j = 0; j <= m; j++) dp[0][j] = j;

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
            else dp[i][j] = 1 + Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]);
        }
    }

    return dp[n][m];
};
```

**Two rows**

```js
var minDistance = function (word1, word2) {
    const n = word1.length, m = word2.length;
    let prev = Array.from({ length: m + 1 }, (_, j) => j);

    for (let i = 1; i <= n; i++) {
        const cur = [i];
        for (let j = 1; j <= m; j++) {
            if (word1[i - 1] === word2[j - 1]) cur[j] = prev[j - 1];
            else cur[j] = 1 + Math.min(cur[j - 1], prev[j], prev[j - 1]);
        }
        prev = cur;
    }

    return prev[m];
};
```

- Q: Try "intention" → "execution". What do you expect?
  A: 5. The shared "tion" at the end costs nothing.

Complexity: O(n·m) time. O(m) memory with two rows.

### C4. Distinct Subsequences (LC 115, Hard)

https://leetcode.com/problems/distinct-subsequences/

Count the ways to delete letters from `s` so that what is left equals `t`.

```
"rabbbit", "rabbit"  →  3   (drop any one of the three b's)
```

| DP card | |
| --- | --- |
| State | Ways `s[0..i)` can form `t[0..j)` |
| Choices | Always: skip `s[i-1]`. If it matches `t[j-1]`: also use it |
| Recurrence | `dp(i-1, j) + (match ? dp(i-1, j-1) : 0)` |
| Base cases | `j = 0` → `1` (check first). `i = 0` → `0` |
| Answer | `dp(n, m)` |
| Fill order | Top-left → bottom-right |

- Check `j = 0` before `i = 0`: an empty `t` is one valid way, even when `s` is empty too.
- Column ∅ is all 1s.

Filled table for a = rabbbit, b = rabbit:

```
  |     ∅     r     a     b     b     i     t
∅ |     1     0     0     0     0     0     0
r |     1     1     0     0     0     0     0
a |     1     1     1     0     0     0     0
b |     1     1     1     1     0     0     0
b |     1     1     1     2     1     0     0
b |     1     1     1     3     3     0     0
i |     1     1     1     3     3     3     0
t |     1     1     1     3     3     3     3
```

**Memo**

```js
var numDistinct = function (s, t) {
    const n = s.length, m = t.length;
    const memo = Array.from({ length: n + 1 }, () => Array(m + 1)); // memo

    // dp(i, j) = ways the first i letters of s can form the first j letters of t
    function dp(i, j) {
        if (j === 0) return 1;                           // empty t: one way (check first)
        if (i === 0) return 0;                           // s is empty, t is not
        if (memo[i][j] !== undefined) return memo[i][j]; // memo

        let ways = dp(i - 1, j);                         // don't use s[i-1]
        if (s[i - 1] === t[j - 1]) ways += dp(i - 1, j - 1); // use it
        return memo[i][j] = ways;
    }

    return dp(n, m);
};
```

**Table**

```js
var numDistinct = function (s, t) {
    const n = s.length, m = t.length;
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
    for (let i = 0; i <= n; i++) dp[i][0] = 1;

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            dp[i][j] = dp[i - 1][j];
            if (s[i - 1] === t[j - 1]) dp[i][j] += dp[i - 1][j - 1];
        }
    }

    return dp[n][m];
};
```

**One row** — Loop j from right to left so dp[j - 1] is still the previous row.

```js
var numDistinct = function (s, t) {
    const n = s.length, m = t.length;
    const dp = Array(m + 1).fill(0);
    dp[0] = 1;

    for (let i = 1; i <= n; i++) {
        for (let j = m; j >= 1; j--) {
            if (s[i - 1] === t[j - 1]) dp[j] += dp[j - 1];
        }
    }

    return dp[m];
};
```

- Q: Try s = "babgbag", t = "bag".
  A: 5.

Complexity: O(n·m).

### C5. Wildcard Matching (LC 44, Hard)

https://leetcode.com/problems/wildcard-matching/

`?` matches one letter, `*` matches any run (even empty). Does the pattern match the **whole** string?

```
("aa", "a")        →  false
("aa", "*")        →  true
("cb", "?a")       →  false
("adceb", "*a*b")  →  true
```

| DP card | |
| --- | --- |
| State | Do `s[0..i)` and `p[0..j)` match? |
| Choices | `*`: match nothing, or eat one letter and stay on `*`. `?` / same letter: step both |
| Recurrence | OR of the choices |
| Base cases | `dp(0, 0)` = true. Empty pattern, letters left → false. Empty `s` → true only for a run of `*` |
| Answer | `dp(n, m)` |
| Fill order | Top-left → bottom-right |

- `*` matching nothing = look left. Eating a letter = look up, same column.
- That is why a column of T runs down under a `*`: one star swallows many letters.

Filled table for a = adceb, b = *a*b:

```
  |     ∅     *     a     *     b
∅ |     T     T     F     F     F
a |     F     T     T     T     F
d |     F     T     F     T     F
c |     F     T     F     T     F
e |     F     T     F     T     F
b |     F     T     F     T     T
```

**Memo**

```js
var isMatch = function (s, p) {
    const n = s.length, m = p.length;
    const memo = Array.from({ length: n + 1 }, () => Array(m + 1)); // memo

    // dp(i, j) = do the first i letters of s match the first j letters of p?
    function dp(i, j) {
        if (j === 0) return i === 0;                     // empty pattern matches only empty s
        if (memo[i][j] !== undefined) return memo[i][j]; // memo

        const c = p[j - 1];
        if (c === '*') return memo[i][j] = dp(i, j - 1) || (i > 0 && dp(i - 1, j));
        if (i === 0) return memo[i][j] = false;
        if (c === '?' || c === s[i - 1]) return memo[i][j] = dp(i - 1, j - 1);
        return memo[i][j] = false;
    }

    return dp(n, m);
};
```

**Table**

```js
var isMatch = function (s, p) {
    const n = s.length, m = p.length;
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(false));
    dp[0][0] = true;
    for (let j = 1; j <= m; j++) dp[0][j] = p[j - 1] === '*' && dp[0][j - 1]; // empty s

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            const c = p[j - 1];
            if (c === '*') dp[i][j] = dp[i][j - 1] || dp[i - 1][j];  // match nothing | eat s[i-1]
            else if (c === '?' || c === s[i - 1]) dp[i][j] = dp[i - 1][j - 1];
        }
    }

    return dp[n][m];
};
```

Complexity: O(n·m).

## D. Intervals

- One string or array.
- The answer for `[i..j]` is built from smaller ranges inside it.
- Fill short ranges first.
- State: `dp(i, j)` = answer for the slice from `i` to `j`.

### D1. Longest Palindromic Subsequence (LC 516, Medium)

https://leetcode.com/problems/longest-palindromic-subsequence/

Length of the longest subsequence of `s` that reads the same both ways.

```
"bbbab"  →  4   ("bbbb")
```

| DP card | |
| --- | --- |
| State | Longest palindromic subsequence in `s[i..j]` |
| Choices | Ends match → keep both. Else drop left or right end |
| Recurrence | Match: `2 + dp(i+1, j−1)`. Else `max(dp(i+1, j), dp(i, j−1))` |
| Base cases | `i > j` → `0`. `i = j` → `1` |
| Answer | `dp(0, n−1)` |
| Fill order | Short ranges → long (i from the end, j forward) |

- Only the upper half is used (`i ≤ j`).
- Same answer as `LCS(s, reverse(s))`.

Filled table for s = bbbab:

```
    |   0 b   1 b   2 b   3 a   4 b
0 b |     1     2     3     3     4
1 b |           1     2     2     3
2 b |                 1     1     3
3 a |                       1     1
4 b |                             1
```

**Memo**

```js
var longestPalindromeSubseq = function (s) {
    const n = s.length;
    const memo = Array.from({ length: n }, () => Array(n)); // memo

    // dp(i, j) = longest palindromic subsequence inside s[i..j]
    function dp(i, j) {
        if (i > j) return 0;
        if (i === j) return 1;
        if (memo[i][j] !== undefined) return memo[i][j]; // memo

        if (s[i] === s[j]) return memo[i][j] = 2 + dp(i + 1, j - 1);
        return memo[i][j] = Math.max(dp(i + 1, j), dp(i, j - 1));
    }

    return dp(0, n - 1);
};
```

**Table**

```js
var longestPalindromeSubseq = function (s) {
    const n = s.length;
    const dp = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = n - 1; i >= 0; i--) {       // reads i + 1, so i goes down
        dp[i][i] = 1;
        for (let j = i + 1; j < n; j++) {    // reads j - 1, so j goes up
            if (s[i] === s[j]) dp[i][j] = 2 + dp[i + 1][j - 1];
            else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
        }
    }

    return dp[0][n - 1];
};
```

Complexity: O(n²).

### D2. Palindromic Substrings (LC 647, Medium)

https://leetcode.com/problems/palindromic-substrings/

Count the substrings (no gaps) that are palindromes.

```
"abc"  →  3
"aaa"  →  6
```

| DP card | |
| --- | --- |
| State | Is `s[i..j]` a palindrome? |
| Choices | None: check the ends and the inside |
| Recurrence | `s[i] === s[j] && (len ≤ 2 \|\| pal(i+1, j−1))` |
| Base cases | Length 1 or 2 with equal ends → true |
| Answer | Count the true cells |
| Fill order | Short ranges → long |

- D1 = subsequence (gaps allowed). D2 = substring (no gaps), so no choice and no `max`.
- Same table answers LC 5 (longest palindromic substring).
- Interview alternative: expand around each centre, O(1) memory.

Filled table for s = abba:

```
    |   0 a   1 b   2 b   3 a
0 a |     T     F     F     T
1 b |           T     T     F
2 b |                 T     F
3 a |                       T
```

**Memo**

```js
var countSubstrings = function (s) {
    const n = s.length;
    const memo = Array.from({ length: n }, () => Array(n)); // memo

    function pal(i, j) {
        if (i >= j) return true;
        if (memo[i][j] !== undefined) return memo[i][j]; // memo

        return memo[i][j] = s[i] === s[j] && pal(i + 1, j - 1);
    }

    let count = 0;
    for (let i = 0; i < n; i++)
        for (let j = i; j < n; j++)
            if (pal(i, j)) count++;

    return count;
};
```

**Table**

```js
var countSubstrings = function (s) {
    const n = s.length;
    const dp = Array.from({ length: n }, () => Array(n).fill(false));
    let count = 0;

    for (let i = n - 1; i >= 0; i--) {
        for (let j = i; j < n; j++) {
            dp[i][j] = s[i] === s[j] && (j - i < 2 || dp[i + 1][j - 1]);
            if (dp[i][j]) count++;
        }
    }

    return count;
};
```

Complexity: O(n²).

### D3. Burst Balloons (LC 312, Hard)

https://leetcode.com/problems/burst-balloons/

Bursting balloon `k` earns `left × nums[k] × right` (current neighbours; missing = 1). Maximise total coins.

```
[3,1,5,8]  →  167
  burst 1:  3·1·5 = 15
  burst 5:  3·5·8 = 120
  burst 3:  1·3·8 = 24
  burst 8:  1·8·1 = 8
```

| DP card | |
| --- | --- |
| State | Most coins from everything **strictly between** `l` and `r` (array padded with 1s) |
| Choices | Which balloon `k` bursts **last** |
| Recurrence | `max over k: a[l]·a[k]·a[r] + dp(l, k) + dp(k, r)` |
| Base cases | `r − l < 2` → `0` |
| Answer | `dp(0, n+1)` |
| Fill order | Short ranges → long |

- Pick the **last** balloon, not the first.
- First: its neighbours change and the two sides merge, so they depend on each other.
- Last: `k` sits between the sides the whole time, so they stay independent, and its final neighbours are exactly `l` and `r`.

Filled table for a = [3,1,5,8]:

```
    |   0:1   1:3   2:1   3:5   4:8   5:1
0:1 |           0     3    30   159   167
1:3 |                 0    15   135   159
2:1 |                       0    40    48
3:5 |                             0    40
4:8 |                                   0
5:1 |                                    
```

**Memo**

```js
var maxCoins = function (nums) {
    const a = [1, ...nums, 1];
    const n = a.length;
    const memo = Array.from({ length: n }, () => Array(n)); // memo

    // dp(l, r) = most coins from bursting everything strictly between l and r
    function dp(l, r) {
        if (r - l < 2) return 0;
        if (memo[l][r] !== undefined) return memo[l][r]; // memo

        let best = 0;
        for (let k = l + 1; k < r; k++) {                // k is burst last
            best = Math.max(best, a[l] * a[k] * a[r] + dp(l, k) + dp(k, r));
        }
        return memo[l][r] = best;
    }

    return dp(0, n - 1);
};
```

**Table** — Short ranges first, then longer ones.

```js
var maxCoins = function (nums) {
    const a = [1, ...nums, 1];
    const n = a.length;
    const dp = Array.from({ length: n }, () => Array(n).fill(0));

    for (let len = 2; len < n; len++) {
        for (let l = 0; l + len < n; l++) {
            const r = l + len;
            for (let k = l + 1; k < r; k++) {
                dp[l][r] = Math.max(dp[l][r], a[l] * a[k] * a[r] + dp[l][k] + dp[k][r]);
            }
        }
    }

    return dp[0][n - 1];
};
```

Complexity: O(n³) time, O(n²) memory.

## E. Knapsack

- A list of items and a budget (sum, amount).
- For each item: take it or leave it.
- State: `dp(i, c)` = answer using the first `i` items with budget `c`.

### E1. Partition Equal Subset Sum (LC 416, Medium)

https://leetcode.com/problems/partition-equal-subset-sum/

Can the array be split into two groups with equal sums?

```
[1,5,11,5]  →  true   ([1,5,5] and [11])
[1,2,3,5]   →  false
```

| DP card | |
| --- | --- |
| State | Can the first `i` numbers make exactly `t`? |
| Choices | Skip `(i-1, t)` or take `(i-1, t − x)` |
| Recurrence | `skip \|\| take` |
| Base cases | `t = 0` → true. No items left → false |
| Answer | `dp(n, total / 2)` |
| Fill order | First item → last item |

- Rephrase: find numbers that add up to half the total. Odd total → false.
- Take reads the row above: each number used once.
- One-row version: loop `t` **downward**, or a number gets reused (picture).

Filled table for a = [1,5,11,5]:

```
     |     0     1     2     3     4     5     6     7     8     9    10    11
∅    |     T     F     F     F     F     F     F     F     F     F     F     F
+ 1  |     T     T     F     F     F     F     F     F     F     F     F     F
+ 5  |     T     T     F     F     F     T     T     F     F     F     F     F
+ 11 |     T     T     F     F     F     T     T     F     F     F     F     T
+ 5  |     T     T     F     F     F     T     T     F     F     F     T     T
```

**Memo**

```js
var canPartition = function (nums) {
    const total = nums.reduce((a, b) => a + b, 0);
    if (total % 2 === 1) return false;
    const target = total / 2, n = nums.length;
    const memo = Array.from({ length: n + 1 }, () => Array(target + 1)); // memo

    // dp(i, t) = can some of the first i numbers add up to exactly t?
    function dp(i, t) {
        if (t === 0) return true;
        if (i === 0 || t < 0) return false;
        if (memo[i][t] !== undefined) return memo[i][t]; // memo

        return memo[i][t] = dp(i - 1, t) || dp(i - 1, t - nums[i - 1]); // skip || take
    }

    return dp(n, target);
};
```

**Table**

```js
var canPartition = function (nums) {
    const total = nums.reduce((a, b) => a + b, 0);
    if (total % 2 === 1) return false;
    const target = total / 2, n = nums.length;
    const dp = Array.from({ length: n + 1 }, () => Array(target + 1).fill(false));
    dp[0][0] = true;                         // no numbers: only sum 0

    for (let i = 1; i <= n; i++) {
        const x = nums[i - 1];
        for (let t = 0; t <= target; t++) {
            dp[i][t] = dp[i - 1][t] || (t >= x && dp[i - 1][t - x]);
        }
    }

    return dp[n][target];
};
```

**One row** — Loop t downward so each number is used at most once.

```js
var canPartition = function (nums) {
    const total = nums.reduce((a, b) => a + b, 0);
    if (total % 2 === 1) return false;
    const target = total / 2;
    const dp = Array(target + 1).fill(false);
    dp[0] = true;

    for (const x of nums) {
        for (let t = target; t >= x; t--) {
            dp[t] = dp[t] || dp[t - x];
        }
    }

    return dp[target];
};
```

- Q: Run the one-row code with an upward loop on [1, 2, 5]. Result?
  A: true, which is wrong. With x = 1, dp[1], dp[2], dp[3], dp[4] all turn true: the single 1 used four times.

Complexity: O(n · target) time. O(target) memory.

### E2. Target Sum (LC 494, Medium)

https://leetcode.com/problems/target-sum/

Put `+` or `−` before every number. Count the ways to reach `target`.

```
[1,1,1,1,1], target 3  →  5
```

| DP card | |
| --- | --- |
| State | Ways the first `i` numbers make subset sum `s` |
| Choices | Leave out or put in |
| Recurrence | `skip + take` |
| Base cases | No items: `s = 0` → 1, else 0 |
| Answer | `dp(n, P)`, `P = (total + target) / 2` |
| Fill order | First item → last item |

- Memo version tracks the signed sum directly (index shifted by `total`).
- Table version: plus-numbers `P`, minus-numbers `N`. `P − N = target`, `P + N = total`, so `P = (total + target) / 2`.
- Now it is E1 with `+` instead of `||`.

Filled table for a = [1,1,1,1,1], t = 3:

```
    |     0     1     2     3     4
∅   |     1     0     0     0     0
+ 1 |     1     1     0     0     0
+ 1 |     1     2     1     0     0
+ 1 |     1     3     3     1     0
+ 1 |     1     4     6     4     1
+ 1 |     1     5    10    10     5
```

**Memo** — Sums can be negative, so the memo index is shifted by total.

```js
var findTargetSumWays = function (nums, target) {
    const n = nums.length, total = nums.reduce((a, b) => a + b, 0);
    const memo = Array.from({ length: n + 1 }, () => Array(2 * total + 1)); // memo

    // dp(i, s) = ways to sign the first i numbers so they add up to s
    function dp(i, s) {
        if (i === 0) return s === 0 ? 1 : 0;
        if (Math.abs(s) > total) return 0;               // too far to reach
        if (memo[i][s + total] !== undefined) return memo[i][s + total]; // memo

        const x = nums[i - 1];
        return memo[i][s + total] = dp(i - 1, s - x) + dp(i - 1, s + x); // +x or -x
    }

    return dp(n, target);
};
```

**Table** — Count subsets that sum to P = (total + target) / 2.

```js
var findTargetSumWays = function (nums, target) {
    const total = nums.reduce((a, b) => a + b, 0);
    if (Math.abs(target) > total || (total + target) % 2 !== 0) return 0;
    const P = (total + target) / 2, n = nums.length;
    const dp = Array.from({ length: n + 1 }, () => Array(P + 1).fill(0));
    dp[0][0] = 1;

    for (let i = 1; i <= n; i++) {
        const x = nums[i - 1];
        for (let s = 0; s <= P; s++) {
            dp[i][s] = dp[i - 1][s] + (s >= x ? dp[i - 1][s - x] : 0);
        }
    }

    return dp[n][P];
};
```

**One row**

```js
var findTargetSumWays = function (nums, target) {
    const total = nums.reduce((a, b) => a + b, 0);
    if (Math.abs(target) > total || (total + target) % 2 !== 0) return 0;
    const P = (total + target) / 2;
    const dp = Array(P + 1).fill(0);
    dp[0] = 1;

    for (const x of nums) {
        for (let s = P; s >= x; s--) {   // downward: each number once
            dp[s] += dp[s - x];
        }
    }

    return dp[P];
};
```

- Q: nums = [0,0,1], target = 1. How many ways?
  A: 4. Each 0 can be +0 or −0, and those count separately.

Complexity: O(n · P) time, O(P) memory.

### E3. Coin Change II (LC 518, Medium)

https://leetcode.com/problems/coin-change-ii/

Unlimited coins of each kind. Count the combinations that make `amount`.

```
amount 5, coins [1,2,5]  →  4
  5 | 2+2+1 | 2+1+1+1 | 1+1+1+1+1
```

| DP card | |
| --- | --- |
| State | Ways to make `a` with the first `i` coin types |
| Choices | Never use this coin `(i-1, a)`, or use it once more `(i, a − c)` |
| Recurrence | `skip + use` |
| Base cases | `a = 0` → 1. No coins, `a > 0` → 0 |
| Answer | `dp(n, amount)` |
| Fill order | First coin → last coin |

- Difference from E1: "use" stays on the **same row**, since a coin can be reused.
- One-row version: loop the amount **upward**.

Filled table for c = [1,2,5], a = 5:

```
       |     0     1     2     3     4     5
∅      |     1     0     0     0     0     0
coin 1 |     1     1     1     1     1     1
coin 2 |     1     1     2     2     3     3
coin 5 |     1     1     2     2     3     4
```

**Memo**

```js
var change = function (amount, coins) {
    const n = coins.length;
    const memo = Array.from({ length: n + 1 }, () => Array(amount + 1)); // memo

    // dp(i, a) = ways to make a using only the first i coins
    function dp(i, a) {
        if (a === 0) return 1;
        if (i === 0 || a < 0) return 0;
        if (memo[i][a] !== undefined) return memo[i][a]; // memo

        const c = coins[i - 1];
        return memo[i][a] = dp(i - 1, a) + dp(i, a - c); // never use coin i | use it, stay on i
    }

    return dp(n, amount);
};
```

**Table**

```js
var change = function (amount, coins) {
    const n = coins.length;
    const dp = Array.from({ length: n + 1 }, () => Array(amount + 1).fill(0));
    dp[0][0] = 1;                            // no coins: only amount 0

    for (let i = 1; i <= n; i++) {
        const c = coins[i - 1];
        for (let a = 0; a <= amount; a++) {
            dp[i][a] = dp[i - 1][a] + (a >= c ? dp[i][a - c] : 0);
        }
    }

    return dp[n][amount];
};
```

**One row** — Loop a upward so a coin can be used again.

```js
var change = function (amount, coins) {
    const dp = Array(amount + 1).fill(0);
    dp[0] = 1;

    for (const c of coins) {
        for (let a = c; a <= amount; a++) {
            dp[a] += dp[a - c];
        }
    }

    return dp[amount];
};
```

- Q: Swap the loops (amount outside, coins inside). What do you count?
  A: Orderings: 1+2+2, 2+1+2, 2+2+1 count separately, so 9 instead of 4. That is LC 377.

Complexity: O(n · amount) time. O(amount) memory.

### E4. Coin Change (LC 322, Medium)

https://leetcode.com/problems/coin-change/

Unlimited coins. Fewest coins to make `amount`, or `-1`.

```
coins [1,2,5], amount 11  →  3   (5 + 5 + 1)
coins [2], amount 3       →  -1
```

| DP card | |
| --- | --- |
| State | Fewest coins to make `a` with the first `i` coin types |
| Choices | Skip, or use and stay |
| Recurrence | `min(dp(i-1, a), 1 + dp(i, a − c))` |
| Base cases | `a = 0` → 0. No coins, `a > 0` → Infinity |
| Answer | `dp(n, amount)`, or −1 |
| Fill order | First coin → last coin |

- Same skeleton as E3: `+` → `min`, done = 0, impossible = Infinity, take adds 1.
- Use the table: amount up to 10,000 makes the recursion very deep.

Filled table for c = [1,2,5], a = 11:

```
       |     0     1     2     3     4     5     6     7     8     9    10    11
∅      |     0     ∞     ∞     ∞     ∞     ∞     ∞     ∞     ∞     ∞     ∞     ∞
coin 1 |     0     1     2     3     4     5     6     7     8     9    10    11
coin 2 |     0     1     1     2     2     3     3     4     4     5     5     6
coin 5 |     0     1     1     2     2     1     2     2     3     3     2     3
```

**Memo** — Deep recursion for large amounts. Prefer the table here.

```js
var coinChange = function (coins, amount) {
    const n = coins.length;
    const memo = Array.from({ length: n + 1 }, () => Array(amount + 1)); // memo

    // dp(i, a) = fewest coins to make a using only the first i coins
    function dp(i, a) {
        if (a === 0) return 0;
        if (i === 0 || a < 0) return Infinity;
        if (memo[i][a] !== undefined) return memo[i][a]; // memo

        const c = coins[i - 1];
        return memo[i][a] = Math.min(dp(i - 1, a), 1 + dp(i, a - c));
    }

    const best = dp(n, amount);
    return best === Infinity ? -1 : best;
};
```

**Table**

```js
var coinChange = function (coins, amount) {
    const n = coins.length;
    const dp = Array.from({ length: n + 1 }, () => Array(amount + 1).fill(Infinity));
    dp[0][0] = 0;

    for (let i = 1; i <= n; i++) {
        const c = coins[i - 1];
        for (let a = 0; a <= amount; a++) {
            dp[i][a] = Math.min(dp[i - 1][a], a >= c ? 1 + dp[i][a - c] : Infinity);
        }
    }

    return dp[n][amount] === Infinity ? -1 : dp[n][amount];
};
```

**One row**

```js
var coinChange = function (coins, amount) {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (const c of coins) {
        for (let a = c; a <= amount; a++) {   // upward: reuse allowed
            dp[a] = Math.min(dp[a], 1 + dp[a - c]);
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
};
```

Complexity: O(n · amount).

## F. Index + state

- Walk through the days in order.
- Carry a small mode: holding a share or not.
- State: `dp(day, mode)` = best profit at the end of that day in that mode.

### F1. Best Time to Buy and Sell Stock with Cooldown (LC 309, Medium)

https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/

Trade as often as you like, one share at a time. After selling, wait one day before buying.

```
[1,2,3,0,2]  →  3   (buy 1, sell 2, rest, buy 0, sell 2)
```

| DP card | |
| --- | --- |
| State | Best profit at the end of day `i`, free or holding |
| Choices | Holding: keep or buy today. Free: rest or sell today |
| Recurrence | Hold: `max(hold(i-1), free(i-2) − p)`. Free: `max(free(i-1), hold(i-1) + p)` |
| Base cases | Before day 0: free = 0, holding = −∞ |
| Answer | `free(n-1)` |
| Fill order | Day 0 → last day |

- Cooldown = buy reads "free" from **two** days back.
- Two padding rows at the top so `i − 2` always exists.
- Holding before day 0 is impossible, so −∞.

Filled table for a = [1,2,3,0,2]:

```
           |    free holding
before     |       0      −∞
before     |       0      −∞
day 0 ($1) |       0      -1
day 1 ($2) |       1      -1
day 2 ($3) |       2      -1
day 3 ($0) |       2       1
day 4 ($2) |       3       1
```

**Memo**

```js
var maxProfit = function (prices) {
    const n = prices.length;
    const memo = Array.from({ length: n }, () => Array(2)); // memo

    // dp(i, h) = best profit at the end of day i; h = 1 means holding a share
    function dp(i, h) {
        if (i < 0) return h ? -Infinity : 0;             // before day 0
        if (memo[i][h] !== undefined) return memo[i][h]; // memo

        if (h) return memo[i][h] = Math.max(dp(i - 1, 1), dp(i - 2, 0) - prices[i]); // keep | buy (cooldown: i - 2)
        return memo[i][h] = Math.max(dp(i - 1, 0), dp(i - 1, 1) + prices[i]);        // rest | sell
    }

    return dp(n - 1, 0);
};
```

**Table** — Rows 0 and 1 are padding for "before day 0". Day d is row d + 2.

```js
var maxProfit = function (prices) {
    const n = prices.length;
    const dp = Array.from({ length: n + 2 }, () => [0, -Infinity]); // [free, holding]

    for (let d = 0; d < n; d++) {
        const i = d + 2;
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 2][0] - prices[d]); // keep | buy
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[d]); // rest | sell
    }

    return dp[n + 1][0];
};
```

**Variables**

```js
var maxProfit = function (prices) {
    let free = 0, hold = -Infinity, freeTwoAgo = 0;

    for (const p of prices) {
        const newHold = Math.max(hold, freeTwoAgo - p);
        freeTwoAgo = free;
        free = Math.max(free, hold + p);
        hold = newHold;
    }

    return free;
};
```

Complexity: O(n) time. O(1) memory with three variables.

### F2. Best Time to Buy and Sell Stock with Transaction Fee (LC 714, Medium)

https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/

Trade as often as you like. Each sale costs a fixed fee.

```
[1,3,2,8,4,9], fee 2  →  8   ((8 − 1 − 2) + (9 − 4 − 2))
```

| DP card | |
| --- | --- |
| State | Same as F1 |
| Choices | Same as F1 |
| Recurrence | Hold: `max(hold(i-1), free(i-1) − p)`. Free: `max(free(i-1), hold(i-1) + p − fee)` |
| Base cases | Before day 0: free = 0, holding = −∞ |
| Answer | `free(n-1)` |
| Fill order | Day 0 → last day |

- Two changes from F1: sell earns `p − fee`, and buy reads yesterday (no cooldown).
- Each day reads only the day before, so two variables are enough.

Filled table for a = [1,3,2,8,4,9], f = 2:

```
           |    free holding
before     |       0      −∞
day 0 ($1) |       0      -1
day 1 ($3) |       0      -1
day 2 ($2) |       0      -1
day 3 ($8) |       5      -1
day 4 ($4) |       5       1
day 5 ($9) |       8       1
```

**Memo**

```js
var maxProfit = function (prices, fee) {
    const n = prices.length;
    const memo = Array.from({ length: n }, () => Array(2)); // memo

    // dp(i, h) = best profit at the end of day i; h = 1 means holding a share
    function dp(i, h) {
        if (i < 0) return h ? -Infinity : 0;
        if (memo[i][h] !== undefined) return memo[i][h]; // memo

        if (h) return memo[i][h] = Math.max(dp(i - 1, 1), dp(i - 1, 0) - prices[i]);       // keep | buy
        return memo[i][h] = Math.max(dp(i - 1, 0), dp(i - 1, 1) + prices[i] - fee);       // rest | sell
    }

    return dp(n - 1, 0);
};
```

**Table** — Row 0 is padding for "before day 0". Day d is row d + 1.

```js
var maxProfit = function (prices, fee) {
    const n = prices.length;
    const dp = Array.from({ length: n + 1 }, () => [0, -Infinity]); // [free, holding]

    for (let d = 0; d < n; d++) {
        const i = d + 1;
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[d]);
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[d] - fee);
    }

    return dp[n][0];
};
```

**Variables**

```js
var maxProfit = function (prices, fee) {
    let free = 0, hold = -Infinity;

    for (const p of prices) {
        const prevFree = free;
        free = Math.max(free, hold + p - fee);
        hold = Math.max(hold, prevFree - p);
    }

    return free;
};
```

Complexity: O(n) time, O(1) memory.

