// JavaScript solutions for every 2D DP problem.
// Lines ending in "// memo" are the lines memoization adds. The site hides that comment,
// highlights the line, and builds the plain "Recursion" tab by removing those lines.
const SOLUTIONS = {
  // ---------------------------------------------------------------- A1
  A1: [
    { label: 'Memo', code: `var uniquePaths = function (m, n) {
    const memo = Array.from({ length: m }, () => Array(n)); // memo

    // dp(i, j) = number of ways to reach (i, j) from the start
    function dp(i, j) {
        if (i < 0 || j < 0) return 0;                    // off the grid
        if (i === 0 && j === 0) return 1;                // the start
        if (memo[i][j] !== undefined) return memo[i][j]; // memo

        return memo[i][j] = dp(i - 1, j) + dp(i, j - 1); // from above + from the left
    }

    return dp(m - 1, n - 1);
};` },
    { label: 'Table', note: 'Row 0 and column 0 are padding (0), so cell (i, j) of the grid is dp[i + 1][j + 1].', code: `var uniquePaths = function (m, n) {
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (i === 1 && j === 1) dp[i][j] = 1;          // the start
            else dp[i][j] = dp[i - 1][j] + dp[i][j - 1];   // from above + from the left
        }
    }

    return dp[m][n];
};` },
    { label: 'One row', note: 'dp[j] still holds the row above until it is overwritten.', code: `var uniquePaths = function (m, n) {
    const dp = Array(n).fill(1); // first row: one way to reach every cell

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[j] = dp[j] + dp[j - 1]; // above (old dp[j]) + left (new dp[j - 1])
        }
    }

    return dp[n - 1];
};` }
  ],

  // ---------------------------------------------------------------- A2
  A2: [
    { label: 'Memo', code: `var uniquePathsWithObstacles = function (grid) {
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
};` },
    { label: 'Table', note: 'Row 0 and column 0 are padding (0).', code: `var uniquePathsWithObstacles = function (grid) {
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
};` },
    { label: 'One row', note: 'dp[0] is padding. Setting dp[1] = 1 first gives the start cell its 1.', code: `var uniquePathsWithObstacles = function (grid) {
    const m = grid.length, n = grid[0].length;
    const dp = Array(n + 1).fill(0);
    dp[1] = 1;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            dp[j + 1] = grid[i][j] === 1 ? 0 : dp[j + 1] + dp[j];
        }
    }

    return dp[n];
};` }
  ],

  // ---------------------------------------------------------------- A3
  A3: [
    { label: 'Memo', code: `var minPathSum = function (grid) {
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
};` },
    { label: 'Table', note: 'Row 0 and column 0 are padding (Infinity).', code: `var minPathSum = function (grid) {
    const m = grid.length, n = grid[0].length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(Infinity));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (i === 1 && j === 1) dp[i][j] = grid[0][0];
            else dp[i][j] = grid[i - 1][j - 1] + Math.min(dp[i - 1][j], dp[i][j - 1]);
        }
    }

    return dp[m][n];
};` },
    { label: 'One row', note: 'dp[0] is padding. Setting dp[1] = 0 first makes the start cell cost grid[0][0].', code: `var minPathSum = function (grid) {
    const m = grid.length, n = grid[0].length;
    const dp = Array(n + 1).fill(Infinity);
    dp[1] = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            dp[j + 1] = grid[i][j] + Math.min(dp[j + 1], dp[j]); // above, left
        }
    }

    return dp[n];
};` }
  ],

  // ---------------------------------------------------------------- A4 (reverse)
  A4: [
    { label: 'Memo', code: `var minimumTotal = function (triangle) {
    const n = triangle.length;
    const memo = Array.from({ length: n }, (_, i) => Array(i + 1)); // memo

    // dp(i, j) = cheapest sum from (i, j) down to the bottom row
    function dp(i, j) {
        if (i === n - 1) return triangle[i][j];          // bottom row
        if (memo[i][j] !== undefined) return memo[i][j]; // memo

        return memo[i][j] = triangle[i][j] + Math.min(dp(i + 1, j), dp(i + 1, j + 1));
    }

    return dp(0, 0);
};` },
    { label: 'One row', note: 'Start from the bottom row and fold it upward. The answer ends up in dp[0].', code: `var minimumTotal = function (triangle) {
    const n = triangle.length;
    const dp = [...triangle[n - 1]]; // bottom row

    for (let i = n - 2; i >= 0; i--) {
        for (let j = 0; j <= i; j++) {
            dp[j] = triangle[i][j] + Math.min(dp[j], dp[j + 1]);
        }
    }

    return dp[0];
};` }
  ],

  // ---------------------------------------------------------------- A5
  A5: [
    { label: 'Memo', code: `var minFallingPathSum = function (matrix) {
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
};` },
    { label: 'Table', code: `var minFallingPathSum = function (matrix) {
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
};` },
    { label: 'Two rows', note: 'Each cell reads both diagonals of the row above, so keep the old row separate.', code: `var minFallingPathSum = function (matrix) {
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
};` }
  ],

  // ---------------------------------------------------------------- A6 (reverse)
  A6: [
    { label: 'Memo', code: `var calculateMinimumHP = function (dungeon) {
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
};` },
    { label: 'Table', note: 'Padding is Infinity, except the two cells next to the princess, which are 1.', code: `var calculateMinimumHP = function (dungeon) {
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
};` }
  ],

  // ---------------------------------------------------------------- B1
  B1: [
    { label: 'Memo', code: `var maximalSquare = function (matrix) {
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
};` },
    { label: 'Table', note: 'Row 0 and column 0 are padding (0).', code: `var maximalSquare = function (matrix) {
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
};` },
    { label: 'One row', note: 'One row plus a variable for the diagonal.', code: `var maximalSquare = function (matrix) {
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
};` }
  ],

  // ---------------------------------------------------------------- B2
  B2: [
    { label: 'Memo', code: `var countSquares = function (matrix) {
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
};` },
    { label: 'Table', code: `var countSquares = function (matrix) {
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
};` }
  ],

  // ---------------------------------------------------------------- C1
  C1: [
    { label: 'Memo', code: `var longestCommonSubsequence = function (text1, text2) {
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
};` },
    { label: 'Table', note: 'Row 0 and column 0 mean "empty string", so they stay 0.', code: `var longestCommonSubsequence = function (text1, text2) {
    const n = text1.length, m = text2.length;
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (text1[i - 1] === text2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
            else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }

    return dp[n][m];
};` },
    { label: 'Two rows', code: `var longestCommonSubsequence = function (text1, text2) {
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
};` }
  ],

  // ---------------------------------------------------------------- C2
  C2: [
    { label: 'Memo', code: `var minDistance = function (word1, word2) {
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
};` },
    { label: 'Table', code: `var minDistance = function (word1, word2) {
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
};` }
  ],

  // ---------------------------------------------------------------- C3
  C3: [
    { label: 'Memo', code: `var minDistance = function (word1, word2) {
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
};` },
    { label: 'Table', code: `var minDistance = function (word1, word2) {
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
};` },
    { label: 'Two rows', code: `var minDistance = function (word1, word2) {
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
};` }
  ],

  // ---------------------------------------------------------------- C4
  C4: [
    { label: 'Memo', code: `var numDistinct = function (s, t) {
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
};` },
    { label: 'Table', code: `var numDistinct = function (s, t) {
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
};` },
    { label: 'One row', note: 'Loop j from right to left so dp[j - 1] is still the previous row.', code: `var numDistinct = function (s, t) {
    const n = s.length, m = t.length;
    const dp = Array(m + 1).fill(0);
    dp[0] = 1;

    for (let i = 1; i <= n; i++) {
        for (let j = m; j >= 1; j--) {
            if (s[i - 1] === t[j - 1]) dp[j] += dp[j - 1];
        }
    }

    return dp[m];
};` }
  ],

  // ---------------------------------------------------------------- C5
  C5: [
    { label: 'Memo', code: `var isMatch = function (s, p) {
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
};` },
    { label: 'Table', code: `var isMatch = function (s, p) {
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
};` }
  ],

  // ---------------------------------------------------------------- D1
  D1: [
    { label: 'Memo', code: `var longestPalindromeSubseq = function (s) {
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
};` },
    { label: 'Table', code: `var longestPalindromeSubseq = function (s) {
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
};` }
  ],

  // ---------------------------------------------------------------- D2
  D2: [
    { label: 'Memo', code: `var countSubstrings = function (s) {
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
};` },
    { label: 'Table', code: `var countSubstrings = function (s) {
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
};` }
  ],

  // ---------------------------------------------------------------- D3
  D3: [
    { label: 'Memo', code: `var maxCoins = function (nums) {
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
};` },
    { label: 'Table', note: 'Short ranges first, then longer ones.', code: `var maxCoins = function (nums) {
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
};` }
  ],

  // ---------------------------------------------------------------- E1
  E1: [
    { label: 'Memo', code: `var canPartition = function (nums) {
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
};` },
    { label: 'Table', code: `var canPartition = function (nums) {
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
};` },
    { label: 'One row', note: 'Loop t downward so each number is used at most once.', code: `var canPartition = function (nums) {
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
};` }
  ],

  // ---------------------------------------------------------------- E2
  E2: [
    { label: 'Memo', note: 'Sums can be negative, so the memo index is shifted by total.', code: `var findTargetSumWays = function (nums, target) {
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
};` },
    { label: 'Table', note: 'Count subsets that sum to P = (total + target) / 2.', code: `var findTargetSumWays = function (nums, target) {
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
};` },
    { label: 'One row', code: `var findTargetSumWays = function (nums, target) {
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
};` }
  ],

  // ---------------------------------------------------------------- E3
  E3: [
    { label: 'Memo', code: `var change = function (amount, coins) {
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
};` },
    { label: 'Table', code: `var change = function (amount, coins) {
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
};` },
    { label: 'One row', note: 'Loop a upward so a coin can be used again.', code: `var change = function (amount, coins) {
    const dp = Array(amount + 1).fill(0);
    dp[0] = 1;

    for (const c of coins) {
        for (let a = c; a <= amount; a++) {
            dp[a] += dp[a - c];
        }
    }

    return dp[amount];
};` }
  ],

  // ---------------------------------------------------------------- E4
  E4: [
    { label: 'Memo', note: 'Deep recursion for large amounts. Prefer the table here.', code: `var coinChange = function (coins, amount) {
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
};` },
    { label: 'Table', code: `var coinChange = function (coins, amount) {
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
};` },
    { label: 'One row', code: `var coinChange = function (coins, amount) {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (const c of coins) {
        for (let a = c; a <= amount; a++) {   // upward: reuse allowed
            dp[a] = Math.min(dp[a], 1 + dp[a - c]);
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
};` }
  ],

  // ---------------------------------------------------------------- F1
  F1: [
    { label: 'Memo', code: `var maxProfit = function (prices) {
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
};` },
    { label: 'Table', note: 'Rows 0 and 1 are padding for "before day 0". Day d is row d + 2.', code: `var maxProfit = function (prices) {
    const n = prices.length;
    const dp = Array.from({ length: n + 2 }, () => [0, -Infinity]); // [free, holding]

    for (let d = 0; d < n; d++) {
        const i = d + 2;
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 2][0] - prices[d]); // keep | buy
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[d]); // rest | sell
    }

    return dp[n + 1][0];
};` },
    { label: 'Variables', code: `var maxProfit = function (prices) {
    let free = 0, hold = -Infinity, freeTwoAgo = 0;

    for (const p of prices) {
        const newHold = Math.max(hold, freeTwoAgo - p);
        freeTwoAgo = free;
        free = Math.max(free, hold + p);
        hold = newHold;
    }

    return free;
};` }
  ],

  // ---------------------------------------------------------------- F2
  F2: [
    { label: 'Memo', code: `var maxProfit = function (prices, fee) {
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
};` },
    { label: 'Table', note: 'Row 0 is padding for "before day 0". Day d is row d + 1.', code: `var maxProfit = function (prices, fee) {
    const n = prices.length;
    const dp = Array.from({ length: n + 1 }, () => [0, -Infinity]); // [free, holding]

    for (let d = 0; d < n; d++) {
        const i = d + 1;
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[d]);
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[d] - fee);
    }

    return dp[n][0];
};` },
    { label: 'Variables', code: `var maxProfit = function (prices, fee) {
    let free = 0, hold = -Infinity;

    for (const p of prices) {
        const prevFree = free;
        free = Math.max(free, hold + p - fee);
        hold = Math.max(hold, prevFree - p);
    }

    return free;
};` }
  ]
};
if (typeof module !== 'undefined') module.exports = SOLUTIONS;
