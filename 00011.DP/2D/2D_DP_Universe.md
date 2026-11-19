# 🌌 The 2D DP Universe

**Language:** JavaScript · **Problems:** 22 · **Levels:** Recursion → Memoization → Tabulation → Space-optimised

Every 2D DP problem in this sheet is solved with the same recipe. The goal is not to remember 22 solutions. The goal is to see that they are the **same solution with 3 parts changed**.

> Every code block in this file was run in Node.js against the LeetCode sample cases (and the brute-force versions against the memo versions). All of them pass.

---

## 🧭 How to use this sheet

1. Read **Part 0** fully. It is the engine. Everything else is a variation.
2. For every problem, **cover the solution** and fill the *DP Card* yourself first.
3. Open the `🎯 Predict` boxes only after you have made a guess.
4. Tick the boxes in the [Progress Tracker](#-progress-tracker) as you go.
5. Finish with the [Pattern Quiz](#-the-pattern-recognition-quiz). If you can classify a problem in 30 seconds, you have learned 2D DP.

### 🗺️ Map

| Part | Family | What changes in `dp(i, j)` | Problems |
| --- | --- | --- | --- |
| 0 | **Foundations** | The recipe, the 4 levels, the 2 directions | — |
| A | **Grid paths** | `(row, col)` in a grid | 62, 63, 64, 120, 931, 174 |
| B | **Squares in a grid** | `(row, col)` = bottom-right corner | 221, 1277 |
| C | **Two strings** | `(index in s1, index in s2)` | 1143, 583, 72, 115, 44 |
| D | **Interval (one string/array)** | `(left, right)` of a range | 516, 647, 312 |
| E | **Knapsack** | `(item index, capacity left)` | 416, 494, 518, 322 |
| F | **Index + state** | `(day, holding or not)` | 309, 714 |

---

# Part 0 · Foundations

## 0.1 When is a problem "2D DP"?

A problem is DP when:

1. You make a **sequence of choices** (go right / go down, take / skip, match / don't match).
2. The **same sub-problem appears again** through different choice paths (overlapping sub-problems).
3. The best answer is built from best answers of smaller pieces (optimal substructure).

It is **2D** DP when you need **two numbers** to describe "where am I right now?"

```
 1D:  dp(i)        "I am at house i"
 2D:  dp(i, j)     "I am at row i, col j"
                   "I have matched s1 up to i and s2 up to j"
                   "I am looking at the range i..j"
                   "I am at item i with capacity j left"
                   "I am on day i and I am (holding / not holding)"
```

> 💡 **The one question that unlocks every problem:**
> *"What is the smallest amount of information I need to describe where I am, so that the rest of the problem can be solved without knowing how I got here?"*
> If the answer is two numbers, it is 2D DP.

## 0.2 The DP Card (the 5 + 1 questions)

Fill this card **before** writing a single line of code. Every problem in this sheet starts with one.

| # | Question | Example (Unique Paths) |
| --- | --- | --- |
| 1 | **State**: what does `dp(i, j)` mean in plain English? | Number of ways to reach the target **from** `(i, j)` |
| 2 | **Choices**: what can I do from here? | Go right, go down |
| 3 | **Recurrence**: how do choices combine? | `dp(i, j+1) + dp(i+1, j)` |
| 4 | **Base cases**: where does recursion stop? | Outside grid → 0. Target → 1 |
| 5 | **Answer**: which state(s) do I return? | `dp(0, 0)` |
| 6 | **Order** (tabulation only): which cells must be ready first? | Bottom-right to top-left |

The combine operation tells you the **problem type**:

| The question asks for | Combine with | Invalid move returns |
| --- | --- | --- |
| Number of ways | `+` | `0` |
| Minimum cost | `Math.min` | `Infinity` |
| Maximum value | `Math.max` | `-Infinity` (or `0` when "do nothing" is allowed) |
| Is it possible? | `\|\|` | `false` |

## 0.3 The 4 levels of every solution

```
 Level 1: Plain recursion         Correct but exponential. Shows the LOGIC.
            │  add a memo table
            ▼
 Level 2: Memoization (top-down)  O(states). Easy to write from the recursion.
            │  replace calls with table reads, loop in dependency order
            ▼
 Level 3: Tabulation (bottom-up)  O(states). No recursion → no stack overflow.
            │  keep only the rows you still need
            ▼
 Level 4: Space-optimised         Same time, O(one row) memory.
```

**How Level 1 and Level 2 are written in this sheet:** every memo solution marks its memo-only lines with `// 🧠`.

* **Delete the `// 🧠` lines** and change `return memo[i][j] = X` to `return X` → you get **Level 1 (plain recursion)**.
* Keep them → **Level 2**.

So one code block teaches both levels, and you can see exactly what memoization adds: **two lines**.

### Why does memoization help so much? (Unique Paths, 3 × 3)

```
                          dp(0,0)
                 ┌───────────┴───────────┐
              dp(0,1)                  dp(1,0)
           ┌─────┴─────┐            ┌─────┴─────┐
       dp(0,2)     [dp(1,1)]    [dp(1,1)]    dp(2,0)
                    ↑   computed twice   ↑
```

`dp(1,1)` is solved twice. On bigger grids the repeats explode:

| Grid | Calls without memo | Calls with memo |
| --- | --- | --- |
| 3 × 3 | 27 | 17 |
| 5 × 5 | 363 | 49 |
| 10 × 10 | 272,271 | 199 |
| 15 × 15 | **230,001,839** | **449** |

(Measured by running both versions with a call counter.)

## 0.4 The two directions of a state

This is the most important idea that most sheets never say out loud.

```
 FORWARD-LOOKING ("from here to the end")       BACKWARD-LOOKING ("ending here")

   dp(i,j) = answer for the REST of the          dp(i,j) = answer for the piece that
             problem starting at (i,j)                     ENDS exactly at (i,j)

   (i,j) ──► ... ──► target                       start ──► ... ──► (i,j)

   depends on (i+1, j), (i, j+1)                  depends on (i-1, j), (i, j-1)
   answer: dp(0, 0)                               answer: dp(m-1, n-1) or best over all cells
```

Both are valid for most problems. In this sheet:

* **Families A, C, E, F use forward-looking** states. One convention, less confusion.
* **Family B (squares) uses "ending here"**, because a square is naturally described by its bottom-right corner.
* **Problem A6 (Dungeon Game) only works forward-looking.** You will see why.

## 0.5 Tabulation: "the padding IS the base case"

When you convert memo → table, add one extra row and column and fill it with the base-case value. Then the loop needs no `if (outside grid)` checks.

```
 Unique Paths 3×3, table of size 4×4       Fill order: bottom-right → top-left
                                           (because dp(i,j) needs the cell below and to the right)
        j=0  j=1  j=2  j=3(pad)
 i=0  [  ?    ?    ?    0  ]               ◄──────────────
 i=1  [  ?    ?    ?    0  ]               ◄──────────────
 i=2  [  ?    ?    1    0  ]               ◄──────────────  start here
 i=3  [  0    0    0    0  ]  ← padding = "outside grid → 0"
```

**Rule of thumb for loop direction:** look at the recurrence. If `dp(i, j)` reads `i+1`, loop `i` downward. If it reads `i-1`, loop `i` upward.

## 0.6 Memo array cheatsheet (JavaScript)

```js
// m rows, n cols, every cell undefined
const memo = Array.from({ length: m }, () => Array(n).fill(undefined));
```

* Use `undefined` (not `0` or `-1`) as "not computed". `0`, `-1`, `false` can all be real answers.
* **Never** write `Array(m).fill(Array(n))`. Every row would be the **same array object**.
* Triangle-shaped input → triangle-shaped memo: `Array.from({ length: n }, (_, i) => Array(i + 1))`.
* If an index can be negative (e.g. a running sum), shift it: `memo[i][sum + offset]`.

## 0.7 The 7 most common 2D DP bugs

| Bug | Symptom | Fix |
| --- | --- | --- |
| Memo check placed **before** the bounds check | `TypeError: Cannot read properties of undefined` | Bounds check first, memo check second |
| `Array(m).fill(Array(n))` | All rows change together | `Array.from({ length: m }, () => Array(n))` |
| Using `0` as "not computed" | Correct but very slow (TLE) | Use `undefined` |
| Returning `0` for an invalid move in a **min** problem | Answer is too small | Return `Infinity` |
| `"1"` vs `1` in matrix problems | Every cell treated as `0` | Read the input type (221 uses strings, 1277 uses numbers) |
| Wrong loop direction in tabulation | Reads cells not computed yet | Follow the dependency arrows |
| Deep recursion on large inputs (e.g. amount = 10⁴) | `RangeError: Maximum call stack size exceeded` | Use tabulation |

---

# Part A · Grid Paths

> **Family signature:** a grid, you start at one cell, you can only move in fixed directions (never back), and you count paths or minimise cost.
> **State:** `dp(i, j)` = answer for the journey **from** `(i, j)` to the target.

---

## A1. Unique Paths — [LC 62](https://leetcode.com/problems/unique-paths/) · Medium

**Problem:** A robot is at the top-left of an `m × n` grid. It can move only right or down. How many paths lead to the bottom-right?

```
Input: m = 3, n = 7   Output: 28
Input: m = 3, n = 2   Output: 3
```

| DP Card | |
| --- | --- |
| State | `dp(i, j)` = number of paths from `(i, j)` to the target |
| Choices | right `(i, j+1)`, down `(i+1, j)` |
| Recurrence | `dp(i, j) = dp(i, j+1) + dp(i+1, j)` |
| Base | outside grid → `0`; target → `1` |
| Answer | `dp(0, 0)` |

```
 (i,j) ──► (i,j+1)
   │
   ▼
 (i+1,j)          ways(here) = ways(right) + ways(down)
```

**Level 1 + 2 · Recursion / Memoization**

```js
var uniquePaths = function (m, n) {
    const memo = Array.from({ length: m }, () => Array(n).fill(undefined)); // 🧠

    function dp(i, j) {
        if (i >= m || j >= n) return 0;                 // fell off the grid
        if (i === m - 1 && j === n - 1) return 1;       // reached target
        if (memo[i][j] !== undefined) return memo[i][j]; // 🧠

        return memo[i][j] = dp(i, j + 1) + dp(i + 1, j);
    }

    return dp(0, 0);
};
```

**Level 3 · Tabulation**

```js
var uniquePaths = function (m, n) {
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0)); // padding = 0

    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (i === m - 1 && j === n - 1) dp[i][j] = 1;
            else dp[i][j] = dp[i + 1][j] + dp[i][j + 1];
        }
    }

    return dp[0][0];
};
```

**Level 4 · Space-optimised (one row)**

```js
var uniquePaths = function (m, n) {
    const dp = Array(n + 1).fill(0); // dp[j] holds the row below until we overwrite it

    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (i === m - 1 && j === n - 1) dp[j] = 1;
            else dp[j] = dp[j] + dp[j + 1]; // (below) + (right, already updated this row)
        }
    }

    return dp[0];
};
```

**🔍 Dry run (m = 3, n = 3)**

```
        j=0  j=1  j=2           How (0,0) got 6:
 i=0  [  6    3    1  ]           right (0,1) = 3
 i=1  [  3    2    1  ]           down  (1,0) = 3
 i=2  [  1    1    1  ]           3 + 3 = 6
```

The last row and last column are all `1`: from there, there is only one straight line to the target.

<details>
<summary>🎯 Predict: what is the table for m = 1, n = 5? What about the answer for m = 3, n = 7?</summary>

`m = 1`: a single row of `1`s, answer `1`. `m = 3, n = 7`: answer `28`. (Bonus: the answer is the binomial coefficient C(m+n−2, m−1), because you choose which `m−1` of the `m+n−2` moves are "down".)

</details>

**Complexity:** Recursion O(2^(m+n)) · Memo O(m·n) time & space · Tabulation O(m·n) · Space-opt O(n) memory.

---

## A2. Unique Paths II — [LC 63](https://leetcode.com/problems/unique-paths-ii/) · Medium

**Problem:** Same as A1, but `1` marks an obstacle you cannot step on.

```
Input: [[0,0,0],
        [0,1,0],
        [0,0,0]]      Output: 2
```

| DP Card | |
| --- | --- |
| State | `dp(i, j)` = paths from `(i, j)` to the target avoiding obstacles |
| Choices | right, down |
| Recurrence | same as A1 |
| Base | outside → `0`; **obstacle → `0`**; target → `1` |
| Answer | `dp(0, 0)` |

One new base case. That is the whole difference.

**Level 1 + 2**

```js
var uniquePathsWithObstacles = function (grid) {
    const m = grid.length, n = grid[0].length;
    const memo = Array.from({ length: m }, () => Array(n).fill(undefined)); // 🧠

    function dp(i, j) {
        if (i >= m || j >= n) return 0;
        if (grid[i][j] === 1) return 0;                 // blocked
        if (i === m - 1 && j === n - 1) return 1;
        if (memo[i][j] !== undefined) return memo[i][j]; // 🧠

        return memo[i][j] = dp(i, j + 1) + dp(i + 1, j);
    }

    return dp(0, 0);
};
```

**Level 3**

```js
var uniquePathsWithObstacles = function (grid) {
    const m = grid.length, n = grid[0].length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (grid[i][j] === 1) dp[i][j] = 0;
            else if (i === m - 1 && j === n - 1) dp[i][j] = 1;
            else dp[i][j] = dp[i + 1][j] + dp[i][j + 1];
        }
    }

    return dp[0][0];
};
```

**Level 4**

```js
var uniquePathsWithObstacles = function (grid) {
    const m = grid.length, n = grid[0].length;
    const dp = Array(n + 1).fill(0);

    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (grid[i][j] === 1) dp[j] = 0;
            else if (i === m - 1 && j === n - 1) dp[j] = 1;
            else dp[j] = dp[j] + dp[j + 1];
        }
    }

    return dp[0];
};
```

**🔍 Dry run**

```
        j=0  j=1  j=2
 i=0  [  2    1    1  ]     (0,0) = down 1 + right 1 = 2
 i=1  [  1    🧱   1  ]     the obstacle contributes 0 to its neighbours
 i=2  [  1    1    1  ]
```

<details>
<summary>🎯 Predict: what if the obstacle is on the target cell itself?</summary>

The answer is `0`. Our code checks the obstacle **before** the target check, so the target returns `0` and every path count becomes `0`. If you swap those two lines, you get a wrong answer. Order of base cases matters.

</details>

**Complexity:** same as A1.

---

## A3. Minimum Path Sum — [LC 64](https://leetcode.com/problems/minimum-path-sum/) · Medium

**Problem:** Move right or down from top-left to bottom-right. Minimise the sum of the cells you visit.

```
Input: [[1,3,1],
        [1,5,1],
        [4,2,1]]     Output: 7   (1 → 3 → 1 → 1 → 1)
```

| DP Card | |
| --- | --- |
| State | `dp(i, j)` = minimum sum from `(i, j)` to the target, including `grid[i][j]` |
| Choices | right, down |
| Recurrence | `grid[i][j] + min(dp(i, j+1), dp(i+1, j))` |
| Base | outside → `Infinity`; target → `grid[i][j]` |
| Answer | `dp(0, 0)` |

**Counting → optimising:** `+` became `min`, and the "invalid" value became `Infinity` so that `min` never picks it.

**Level 1 + 2**

```js
var minPathSum = function (grid) {
    const m = grid.length, n = grid[0].length;
    const memo = Array.from({ length: m }, () => Array(n).fill(undefined)); // 🧠

    function dp(i, j) {
        if (i >= m || j >= n) return Infinity;           // never choose this
        if (i === m - 1 && j === n - 1) return grid[i][j];
        if (memo[i][j] !== undefined) return memo[i][j]; // 🧠

        return memo[i][j] = grid[i][j] + Math.min(dp(i, j + 1), dp(i + 1, j));
    }

    return dp(0, 0);
};
```

**Level 3**

```js
var minPathSum = function (grid) {
    const m = grid.length, n = grid[0].length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(Infinity));

    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (i === m - 1 && j === n - 1) dp[i][j] = grid[i][j];
            else dp[i][j] = grid[i][j] + Math.min(dp[i + 1][j], dp[i][j + 1]);
        }
    }

    return dp[0][0];
};
```

**Level 4**

```js
var minPathSum = function (grid) {
    const m = grid.length, n = grid[0].length;
    const dp = Array(n + 1).fill(Infinity);

    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (i === m - 1 && j === n - 1) dp[j] = grid[i][j];
            else dp[j] = grid[i][j] + Math.min(dp[j], dp[j + 1]);
        }
    }

    return dp[0];
};
```

**🔍 Dry run** (fill from bottom-right)

```
 grid            dp (min cost from here)
 1  3  1         7  6  3        dp[2][2] = 1
 1  5  1   ──►   8  7  2        dp[2][1] = 2 + 1 = 3        dp[2][0] = 4 + 3 = 7
 4  2  1         7  3  1        dp[1][2] = 1 + 1 = 2        dp[1][1] = 5 + min(3, 2) = 7
                                dp[1][0] = 1 + min(7, 7) = 8
                                dp[0][2] = 1 + 2 = 3        dp[0][1] = 3 + min(7, 3) = 6
                                dp[0][0] = 1 + min(8, 6) = 7  ✅
```

To **recover the path**, start at `(0,0)` and always step to the neighbour with the smaller dp value: `7 → 6 → 3 → 2 → 1` = cells `1 → 3 → 1 → 1 → 1`.

<details>
<summary>🎯 Predict: what breaks if you return 0 instead of Infinity for "outside the grid"?</summary>

On the last row, `min(right, down)` would pick the out-of-grid `0` and "finish" without reaching the target. `dp[2][0]` would become `4 + 0 = 4` instead of `7`, and the final answer would be `5` instead of `7`.

</details>

**Complexity:** O(m·n) time, O(n) memory with Level 4.

---

## A4. Triangle — [LC 120](https://leetcode.com/problems/triangle/) · Medium

**Problem:** From the top of a triangle, move to one of the two adjacent numbers on the row below. Minimise the sum to the bottom.

```
Input:        2
             3 4
            6 5 7
           4 1 8 3        Output: 11  (2 + 3 + 5 + 1)
```

| DP Card | |
| --- | --- |
| State | `dp(i, j)` = minimum sum from `(i, j)` to the bottom row |
| Choices | down `(i+1, j)`, down-right `(i+1, j+1)` |
| Recurrence | `t[i][j] + min(dp(i+1, j), dp(i+1, j+1))` |
| Base | last row → `t[i][j]` (no out-of-bounds case, both children always exist) |
| Answer | `dp(0, 0)` |

```
 Stored as rows:     (i,j)
 [2]                  │ ╲
 [3,4]                ▼   ▼
 [6,5,7]          (i+1,j) (i+1,j+1)
 [4,1,8,3]
```

**Level 1 + 2**

```js
var minimumTotal = function (triangle) {
    const n = triangle.length;
    const memo = Array.from({ length: n }, (_, i) => Array(i + 1).fill(undefined)); // 🧠

    function dp(i, j) {
        if (i === n - 1) return triangle[i][j];
        if (memo[i][j] !== undefined) return memo[i][j]; // 🧠

        return memo[i][j] = triangle[i][j] + Math.min(dp(i + 1, j), dp(i + 1, j + 1));
    }

    return dp(0, 0);
};
```

**Level 3 + 4** (here the 1D version is the natural one: start with the bottom row and collapse upward)

```js
var minimumTotal = function (triangle) {
    const n = triangle.length;
    const dp = [...triangle[n - 1]]; // start from the bottom row

    for (let i = n - 2; i >= 0; i--) {
        for (let j = 0; j <= i; j++) {
            dp[j] = triangle[i][j] + Math.min(dp[j], dp[j + 1]);
        }
    }

    return dp[0];
};
```

**🔍 Dry run** (the triangle collapses like a funnel)

```
 start:  [4, 1, 8, 3]
 row 2:  [6+min(4,1), 5+min(1,8), 7+min(8,3)]  = [7, 6, 10]
 row 1:  [3+min(7,6), 4+min(6,10)]             = [9, 10]
 row 0:  [2+min(9,10)]                         = [11]  ✅
```

<details>
<summary>🎯 Predict: in Level 4 we update dp[j] left-to-right in place. Why doesn't it destroy values we still need?</summary>

`dp[j]` only needs `dp[j]` and `dp[j+1]` from the row below. Going left to right, when we overwrite `dp[j]`, the old `dp[j+1]` has not been touched yet. And nothing later needs the old `dp[j]`, because cell `j+1` only reads `j+1` and `j+2`. (In A5 this is **not** true. See why there.)

</details>

**Complexity:** Recursion O(2ⁿ) · Memo/Tabulation O(n²) · Memory O(n) with Level 4.

---

## A5. Minimum Falling Path Sum — [LC 931](https://leetcode.com/problems/minimum-falling-path-sum/) · Medium

**Problem:** Start at **any** cell of the first row. Each step goes down, down-left, or down-right. Minimise the sum to **any** cell of the last row.

```
Input: [[2,1,3],
        [6,5,4],
        [7,8,9]]      Output: 13  (1 → 5 → 7)
```

| DP Card | |
| --- | --- |
| State | `dp(i, j)` = minimum falling sum from `(i, j)` to the last row |
| Choices | `(i+1, j-1)`, `(i+1, j)`, `(i+1, j+1)` |
| Recurrence | `a[i][j] + min(of the three)` |
| Base | column outside → `Infinity`; last row → `a[i][j]` |
| Answer | **`min(dp(0, j))` over every `j`** (new: many starting points) |

```
        (i,j)
       ╱  │  ╲
      ▼   ▼   ▼
 (i+1,j-1) (i+1,j) (i+1,j+1)
```

**Level 1 + 2**

```js
var minFallingPathSum = function (matrix) {
    const n = matrix.length;
    const memo = Array.from({ length: n }, () => Array(n).fill(undefined)); // 🧠

    function dp(i, j) {
        if (j < 0 || j >= n) return Infinity;
        if (i === n - 1) return matrix[i][j];
        if (memo[i][j] !== undefined) return memo[i][j]; // 🧠

        return memo[i][j] = matrix[i][j] + Math.min(dp(i + 1, j - 1), dp(i + 1, j), dp(i + 1, j + 1));
    }

    let answer = Infinity;
    for (let j = 0; j < n; j++) answer = Math.min(answer, dp(0, j));
    return answer;
};
```

**Level 3 + 4**

```js
var minFallingPathSum = function (matrix) {
    const n = matrix.length;
    let below = [...matrix[n - 1]];

    for (let i = n - 2; i >= 0; i--) {
        const cur = Array(n);
        for (let j = 0; j < n; j++) {
            const left = j > 0 ? below[j - 1] : Infinity;
            const right = j < n - 1 ? below[j + 1] : Infinity;
            cur[j] = matrix[i][j] + Math.min(left, below[j], right);
        }
        below = cur; // a NEW row each time (see the trap below)
    }

    return Math.min(...below);
};
```

**🔍 Dry run**

```
 below = [7, 8, 9]
 row 1 = [6+min(7,8), 5+min(7,8,9), 4+min(8,9)]       = [13, 12, 12]
 row 0 = [2+min(13,12), 1+min(13,12,12), 3+min(12,12)] = [14, 13, 15]
 answer = min(14, 13, 15) = 13  ✅
```

<details>
<summary>🎯 Predict: why can't we update one array in place, like in Triangle?</summary>

Cell `j` needs `below[j-1]`. If we already overwrote `dp[j-1]` with the current row's value, we read the wrong number. Triangle only looks at `j` and `j+1` (to the right), so left-to-right in place is safe. Here we look **both ways**, so we need a second array.

</details>

**Complexity:** O(n²) time, O(n) memory.

---

## A6. Dungeon Game — [LC 174](https://leetcode.com/problems/dungeon-game/) · Hard · ⭐ new

**Problem:** A knight starts top-left and must reach the princess at bottom-right, moving right or down. Each cell adds or removes health. Health must **always stay ≥ 1**. What is the minimum starting health?

```
Input: [[-2,  -3,   3],
        [-5, -10,   1],
        [10,  30,  -5]]       Output: 7
```

**Why this problem is in the sheet:** it is the one grid problem where the **direction of the state really matters**.

Forward from the start, you would need to track *two* things: the current health and the lowest health so far. A path with high current health may have dipped dangerously earlier. One number per cell is not enough.

Backward from the princess, one number is enough: "how much health do I need **when I enter** this cell?"

| DP Card | |
| --- | --- |
| State | `dp(i, j)` = minimum health needed when entering `(i, j)` to survive to the end |
| Choices | right, down |
| Recurrence | `need = min(dp(i, j+1), dp(i+1, j)) - d[i][j]`, then `max(1, need)` |
| Base | outside → `Infinity`; princess cell → `max(1, 1 - d[i][j])` |
| Answer | `dp(0, 0)` |

`max(1, ...)` exists because a big healing cell can make `need` zero or negative, but you still must be alive (health ≥ 1) to enter it.

**Level 1 + 2**

```js
var calculateMinimumHP = function (dungeon) {
    const m = dungeon.length, n = dungeon[0].length;
    const memo = Array.from({ length: m }, () => Array(n).fill(undefined)); // 🧠

    function dp(i, j) {
        if (i >= m || j >= n) return Infinity;
        if (i === m - 1 && j === n - 1) return Math.max(1, 1 - dungeon[i][j]);
        if (memo[i][j] !== undefined) return memo[i][j]; // 🧠

        const need = Math.min(dp(i, j + 1), dp(i + 1, j)) - dungeon[i][j];
        return memo[i][j] = Math.max(1, need);
    }

    return dp(0, 0);
};
```

**Level 3** (padding trick: put `1` just right of and just below the princess, so she needs no special case)

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

**🔍 Dry run** (health needed on entering each cell)

```
 dungeon             dp
 -2  -3   3          7   5   2       dp[2][2] = max(1, 1-(-5))       = 6
 -5 -10   1   ──►    6  11   5       dp[2][1] = max(1, 6-30)         = 1   (30 heals you)
 10  30  -5          1   1   6       dp[1][1] = max(1, min(1,5)+10)  = 11
                                     dp[0][0] = max(1, min(6,5)+2)   = 7  ✅
```

The best route is right → right → down → down: `-2, -3, 3, 1, -5`. Starting with 7: `7 → 5 → 2 → 5 → 6 → 1`. Alive at every step.

<details>
<summary>🎯 Predict: write down a forward-DP "max health so far" approach and find a grid where it fails.</summary>

Try `[[1, -3, 3], [0, -2, 0], [-3, -3, -3]]`. The correct answer is **3**.

A forward DP that keeps, for each cell, the path with the best "lowest point so far" returns **5**. At the cell `(1, 2)` it has two candidates:

```
 path 1, 0, -2, 0   → running sums 1, 1, -1, -1   lowest −1, current −1   ← forward DP keeps this
 path 1, -3, 3, 0   → running sums 1, -2, 1, 1    lowest −2, current +1
```

It keeps the first path because its lowest point is better. Then the final `-3` drops it to −4 (needs 5 HP), while the second path would only drop to −2 (needs 3 HP).

Forward DP needs **two** numbers per cell (current health and lowest point so far), and neither alone decides which path is better. Backward DP needs only one: "health required on entry". That is why the state must look backward.

</details>

**Complexity:** O(m·n) time; O(n) memory if you keep one row.

---

# Part B · Squares in a Grid

> **Family signature:** find or count squares (or rectangles) made of `1`s.
> **State:** `dp(i, j)` = side of the largest all-`1` square whose **bottom-right corner** is `(i, j)` ("ending here").

### Why `1 + min(top, left, diagonal)`?

```
 A square of side k ending at (i,j) needs three squares of side k-1:

   ┌─────────┬──┐
   │ diagonal│  │        top      = square ending at (i-1, j)
   │ (i-1,j-1)  │        left     = square ending at (i, j-1)
   ├─────────┘  │        diagonal = square ending at (i-1, j-1)
   │   left  (i,j)
   └────────────┘        The weakest of the three limits you → min.
```

If any of the three neighbours is small, the big square has a hole. So the size is limited by the **smallest** neighbour, plus 1 for the current cell.

---

## B1. Maximal Square — [LC 221](https://leetcode.com/problems/maximal-square/) · Medium

**Problem:** In a matrix of `"0"`/`"1"` **strings**, find the area of the largest all-`1` square.

```
Input: [["1","0","1","0","0"],
        ["1","0","1","1","1"],
        ["1","1","1","1","1"],
        ["1","0","0","1","0"]]     Output: 4
```

| DP Card | |
| --- | --- |
| State | `dp(i, j)` = largest square side ending at `(i, j)` |
| Choices | (not a move) look at top, left, diagonal |
| Recurrence | cell is `"1"` → `1 + min(top, left, diag)`; cell is `"0"` → `0` |
| Base | outside (`i < 0` or `j < 0`) → `0` |
| Answer | `(max over all cells)²` (a square can end anywhere) |

**Level 1 + 2**

```js
var maximalSquare = function (matrix) {
    const m = matrix.length, n = matrix[0].length;
    const memo = Array.from({ length: m }, () => Array(n).fill(undefined)); // 🧠

    function dp(i, j) {
        if (i < 0 || j < 0) return 0;
        if (matrix[i][j] === "0") return 0;              // strings, not numbers!
        if (memo[i][j] !== undefined) return memo[i][j]; // 🧠

        return memo[i][j] = 1 + Math.min(dp(i - 1, j), dp(i, j - 1), dp(i - 1, j - 1));
    }

    let best = 0;
    for (let i = 0; i < m; i++)
        for (let j = 0; j < n; j++)
            best = Math.max(best, dp(i, j));

    return best * best;
};
```

**Level 3** (shift indices by 1 so row 0 and column 0 are padding)

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

**Level 4** (one row + a variable that remembers the diagonal)

```js
var maximalSquare = function (matrix) {
    const m = matrix.length, n = matrix[0].length;
    const dp = Array(n + 1).fill(0);
    let best = 0;

    for (let i = 1; i <= m; i++) {
        let diag = 0;                         // dp[i-1][j-1]
        for (let j = 1; j <= n; j++) {
            const top = dp[j];                // still the previous row's value
            if (matrix[i - 1][j - 1] === "1") {
                dp[j] = 1 + Math.min(top, dp[j - 1], diag);
                best = Math.max(best, dp[j]);
            } else {
                dp[j] = 0;
            }
            diag = top;                       // becomes the diagonal for j+1
        }
    }

    return best * best;
};
```

**🔍 Dry run**

```
 matrix          dp (side ending here)
 1 0 1 0 0       1 0 1 0 0
 1 0 1 1 1       1 0 1 1 1
 1 1 1 1 1  ──►  1 1 1 2 2      dp[2][3] = 1 + min(top 1, left 1, diag 1) = 2
 1 0 0 1 0       1 0 0 1 0      dp[3][3] = 1 + min(top 2, left 0, diag 1) = 1

 best side = 2  →  area = 4  ✅
```

<details>
<summary>🎯 Predict: what does this code return if you compare with the number 0 instead of the string "0"?</summary>

`"0" === 0` is `false`, so every cell is treated as `1`. For the example, the whole 4×5 matrix gives a side of 4 and the answer 16. Always check whether the input holds strings or numbers.

</details>

**Complexity:** O(m·n) time, O(n) memory with Level 4.

---

## B2. Count Square Submatrices with All Ones — [LC 1277](https://leetcode.com/problems/count-square-submatrices-with-all-ones/) · Medium

**Problem:** Count all square submatrices made only of `1`s (numbers this time).

```
Input: [[0,1,1,1],
        [1,1,1,1],
        [0,1,1,1]]     Output: 15
```

**Key insight:** if the largest square ending at `(i, j)` has side `k`, then exactly `k` squares end there (sides `1, 2, ..., k`). So the answer is the **sum** of all dp values.

```
 dp = 3 at a cell means these 3 squares end there:
   ┌─┐    ┌──┐    ┌───┐
   └─┘    └──┘    └───┘
   1×1    2×2     3×3
```

| DP Card | |
| --- | --- |
| State, Choices, Recurrence, Base | identical to B1 |
| Answer | **sum** of `dp(i, j)` over all cells |

**Level 1 + 2**

```js
var countSquares = function (matrix) {
    const m = matrix.length, n = matrix[0].length;
    const memo = Array.from({ length: m }, () => Array(n).fill(undefined)); // 🧠

    function dp(i, j) {
        if (i < 0 || j < 0) return 0;
        if (matrix[i][j] === 0) return 0;                // numbers here
        if (memo[i][j] !== undefined) return memo[i][j]; // 🧠

        return memo[i][j] = 1 + Math.min(dp(i - 1, j), dp(i, j - 1), dp(i - 1, j - 1));
    }

    let total = 0;
    for (let i = 0; i < m; i++)
        for (let j = 0; j < n; j++)
            total += dp(i, j);

    return total;
};
```

**Level 3** (in-place: reuse the matrix as the dp table)

```js
var countSquares = function (matrix) {
    const m = matrix.length, n = matrix[0].length;
    const dp = matrix.map(row => [...row]); // copy so we don't mutate the input
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

**🔍 Dry run**

```
 matrix        dp            row sums
 0 1 1 1       0 1 1 1   →   3
 1 1 1 1  ──►  1 1 2 2   →   6
 0 1 1 1       0 1 2 3   →   6
                              ───
                              15  ✅
```

**Complexity:** O(m·n) time.

---

# Part C · Two Strings

> **Family signature:** two strings (or arrays). Compare, align, match, transform.
> **State:** `dp(i, j)` = answer for the **suffixes** `s1[i..]` and `s2[j..]`.
> **The universal decision:** look at `s1[i]` and `s2[j]`. Do they match?

```
              s2 →  j
           ┌───┬───┬───┬───┐
 s1   i    │   │ ↘ │ → │   │    ↘ (i+1, j+1)  use both characters (match / replace)
  ↓        │   │ ↓ │   │   │    ↓ (i+1, j)    skip s1[i]   (delete)
           └───┴───┴───┴───┘    → (i, j+1)    skip s2[j]   (insert)
```

Every problem in this family is **these 3 arrows** with a different combine rule. Last row / last column (one string is empty) are the base cases.

---

## C1. Longest Common Subsequence — [LC 1143](https://leetcode.com/problems/longest-common-subsequence/) · Medium

**Problem:** Length of the longest sequence that appears in both strings in order (not necessarily contiguous).

```
Input: text1 = "abcde", text2 = "ace"   Output: 3  ("ace")
```

| DP Card | |
| --- | --- |
| State | `dp(i, j)` = LCS of `a[i..]` and `b[j..]` |
| Choices | match → take both; otherwise skip one from `a` or one from `b` |
| Recurrence | `a[i] === b[j]` → `1 + dp(i+1, j+1)`; else `max(dp(i+1, j), dp(i, j+1))` |
| Base | either string empty (`i === n` or `j === m`) → `0` |
| Answer | `dp(0, 0)` |

**Level 1 + 2**

```js
var longestCommonSubsequence = function (a, b) {
    const n = a.length, m = b.length;
    const memo = Array.from({ length: n }, () => Array(m).fill(undefined)); // 🧠

    function dp(i, j) {
        if (i === n || j === m) return 0;
        if (memo[i][j] !== undefined) return memo[i][j]; // 🧠

        if (a[i] === b[j]) return memo[i][j] = 1 + dp(i + 1, j + 1);
        return memo[i][j] = Math.max(dp(i + 1, j), dp(i, j + 1));
    }

    return dp(0, 0);
};
```

**Level 3**

```js
var longestCommonSubsequence = function (a, b) {
    const n = a.length, m = b.length;
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

    for (let i = n - 1; i >= 0; i--) {
        for (let j = m - 1; j >= 0; j--) {
            if (a[i] === b[j]) dp[i][j] = 1 + dp[i + 1][j + 1];
            else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
        }
    }

    return dp[0][0];
};
```

**Level 4** (two rows)

```js
var longestCommonSubsequence = function (a, b) {
    const n = a.length, m = b.length;
    let below = Array(m + 1).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        const cur = Array(m + 1).fill(0);
        for (let j = m - 1; j >= 0; j--) {
            if (a[i] === b[j]) cur[j] = 1 + below[j + 1];
            else cur[j] = Math.max(below[j], cur[j + 1]);
        }
        below = cur;
    }

    return below[0];
};
```

**🔍 Dry run** (`↘` marks a match)

```
          a    c    e    ∅
 a     [ 3↘   2    1    0 ]     dp[0][0]: 'a'='a' → 1 + dp[1][1] = 1 + 2 = 3
 b     [ 2    2    1    0 ]
 c     [ 2    2↘   1    0 ]     dp[2][1]: 'c'='c' → 1 + dp[3][2] = 2
 d     [ 1    1    1    0 ]
 e     [ 1    1    1↘   0 ]     dp[4][2]: 'e'='e' → 1
 ∅     [ 0    0    0    0 ]
```

<details>
<summary>🎯 Predict: when the characters match, why don't we also try max(dp(i+1, j), dp(i, j+1))?</summary>

Taking a matching pair is never worse. Any common subsequence that skips `a[i]` can be changed to use `a[i]` with `b[j]` instead, without losing length. So `1 + dp(i+1, j+1)` is always at least as good.

</details>

**Complexity:** O(n·m) time, O(m) memory with Level 4.

---

## C2. Delete Operation for Two Strings — [LC 583](https://leetcode.com/problems/delete-operation-for-two-strings/) · Medium

**Problem:** Minimum number of character deletions (from either string) to make them equal.

```
Input: "sea", "eat"   Output: 2   (delete 's' → "ea", delete 't' → "ea")
```

| DP Card | |
| --- | --- |
| State | `dp(i, j)` = min deletions to make `a[i..]` and `b[j..]` equal |
| Choices | match → keep both; else delete `a[i]` or delete `b[j]` |
| Recurrence | match → `dp(i+1, j+1)`; else `1 + min(dp(i+1, j), dp(i, j+1))` |
| Base | `i === n` → delete the rest of `b`: `m - j`; `j === m` → `n - i` |
| Answer | `dp(0, 0)` |

> **Shortcut:** keep the LCS, delete everything else → `n + m - 2 * LCS`. Same answer. The direct DP below teaches the "non-zero base case" idea you need for Edit Distance.

**Level 1 + 2**

```js
var minDistance = function (a, b) {
    const n = a.length, m = b.length;
    const memo = Array.from({ length: n }, () => Array(m).fill(undefined)); // 🧠

    function dp(i, j) {
        if (i === n) return m - j;   // delete all that is left in b
        if (j === m) return n - i;   // delete all that is left in a
        if (memo[i][j] !== undefined) return memo[i][j]; // 🧠

        if (a[i] === b[j]) return memo[i][j] = dp(i + 1, j + 1);
        return memo[i][j] = 1 + Math.min(dp(i + 1, j), dp(i, j + 1));
    }

    return dp(0, 0);
};
```

**Level 3**

```js
var minDistance = function (a, b) {
    const n = a.length, m = b.length;
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

    for (let i = n; i >= 0; i--) {
        for (let j = m; j >= 0; j--) {
            if (i === n) dp[i][j] = m - j;
            else if (j === m) dp[i][j] = n - i;
            else if (a[i] === b[j]) dp[i][j] = dp[i + 1][j + 1];
            else dp[i][j] = 1 + Math.min(dp[i + 1][j], dp[i][j + 1]);
        }
    }

    return dp[0][0];
};
```

**🔍 Dry run**

```
          e    a    t    ∅
 s     [ 2    3    4    3 ]     ← answer dp[0][0] = 2
 e     [ 1↘   2    3    2 ]
 a     [ 2    1↘   2    1 ]
 ∅     [ 3    2    1    0 ]     ← base row: delete the rest of "eat"
```

**Complexity:** O(n·m).

---

## C3. Edit Distance — [LC 72](https://leetcode.com/problems/edit-distance/) · Medium · ⭐ interview favourite

**Problem:** Minimum number of insert / delete / replace operations to turn `word1` into `word2`.

```
Input: "horse", "ros"   Output: 3
  horse → rorse (replace h→r) → rose (delete r) → ros (delete e)
```

| DP Card | |
| --- | --- |
| State | `dp(i, j)` = min operations to turn `a[i..]` into `b[j..]` |
| Choices | match → free; else **insert** `(i, j+1)`, **delete** `(i+1, j)`, **replace** `(i+1, j+1)` |
| Recurrence | match → `dp(i+1, j+1)`; else `1 + min(insert, delete, replace)` |
| Base | `i === n` → insert the rest: `m - j`; `j === m` → delete the rest: `n - i` |
| Answer | `dp(0, 0)` |

```
 Insert  b[j] in front of a[i]  → b[j] is now handled, a[i] is not  → (i,   j+1)
 Delete  a[i]                   → a[i] is gone, b[j] still needed    → (i+1, j  )
 Replace a[i] with b[j]         → both handled                       → (i+1, j+1)
```

**Level 1 + 2**

```js
var minDistance = function (a, b) {
    const n = a.length, m = b.length;
    const memo = Array.from({ length: n }, () => Array(m).fill(undefined)); // 🧠

    function dp(i, j) {
        if (i === n) return m - j;
        if (j === m) return n - i;
        if (memo[i][j] !== undefined) return memo[i][j]; // 🧠

        if (a[i] === b[j]) return memo[i][j] = dp(i + 1, j + 1);
        return memo[i][j] = 1 + Math.min(
            dp(i, j + 1),     // insert
            dp(i + 1, j),     // delete
            dp(i + 1, j + 1)  // replace
        );
    }

    return dp(0, 0);
};
```

**Level 3**

```js
var minDistance = function (a, b) {
    const n = a.length, m = b.length;
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

    for (let i = n; i >= 0; i--) {
        for (let j = m; j >= 0; j--) {
            if (i === n) dp[i][j] = m - j;
            else if (j === m) dp[i][j] = n - i;
            else if (a[i] === b[j]) dp[i][j] = dp[i + 1][j + 1];
            else dp[i][j] = 1 + Math.min(dp[i][j + 1], dp[i + 1][j], dp[i + 1][j + 1]);
        }
    }

    return dp[0][0];
};
```

**🔍 Dry run**

```
          r    o    s    ∅
 h     [ 3    3    4    5 ]    dp[0][0] = 1 + min(ins 3, del 2, rep 2) = 3  ✅
 o     [ 3    2↘   3    4 ]
 r     [ 2↘   2    2    3 ]
 s     [ 3    2    1↘   2 ]
 e     [ 3    2    1    1 ]
 ∅     [ 3    2    1    0 ]
```

<details>
<summary>🎯 Predict: compare C2 and C3. What is the only difference in the recurrence?</summary>

C3 adds a **third** choice: replace `(i+1, j+1)` at cost 1. Without replace, C3 becomes C2 (insert into `a` ≈ delete from `b`). Spotting "same table, one more arrow" is the skill this family trains.

</details>

**Complexity:** O(n·m) time, O(m) memory with two rows.

---

## C4. Distinct Subsequences — [LC 115](https://leetcode.com/problems/distinct-subsequences/) · Hard

**Problem:** Count how many distinct subsequences of `s` equal `t`.

```
Input: s = "rabbbit", t = "rabbit"   Output: 3   (choose which 'b' to drop)
```

| DP Card | |
| --- | --- |
| State | `dp(i, j)` = number of ways `s[i..]` can form `t[j..]` |
| Choices | always: skip `s[i]`; if `s[i] === t[j]`: also use it |
| Recurrence | `dp(i+1, j) + (s[i] === t[j] ? dp(i+1, j+1) : 0)` |
| Base | `j === m` (t fully built) → `1`; `i === n` (s ran out) → `0` |
| Answer | `dp(0, 0)` |

**Order of base cases matters:** check `j === m` first. Building an empty `t` from an empty `s` is 1 way.

**Level 1 + 2**

```js
var numDistinct = function (s, t) {
    const n = s.length, m = t.length;
    const memo = Array.from({ length: n }, () => Array(m).fill(undefined)); // 🧠

    function dp(i, j) {
        if (j === m) return 1;
        if (i === n) return 0;
        if (memo[i][j] !== undefined) return memo[i][j]; // 🧠

        let ways = dp(i + 1, j);                       // skip s[i]
        if (s[i] === t[j]) ways += dp(i + 1, j + 1);   // use s[i]
        return memo[i][j] = ways;
    }

    return dp(0, 0);
};
```

**Level 3**

```js
var numDistinct = function (s, t) {
    const n = s.length, m = t.length;
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
    for (let i = 0; i <= n; i++) dp[i][m] = 1;

    for (let i = n - 1; i >= 0; i--) {
        for (let j = m - 1; j >= 0; j--) {
            dp[i][j] = dp[i + 1][j] + (s[i] === t[j] ? dp[i + 1][j + 1] : 0);
        }
    }

    return dp[0][0];
};
```

**🔍 Dry run**

```
          r   a   b   b   i   t   ∅
 r     [  3   3   3   3   1   1   1 ]   ← answer
 a     [  0   3   3   3   1   1   1 ]
 b     [  0   0   3   3   1   1   1 ]   dp[2][2] = skip 1 + use dp[3][3] 2 = 3
 b     [  0   0   1   2   1   1   1 ]
 b     [  0   0   0   1   1   1   1 ]
 i     [  0   0   0   0   1   1   1 ]
 t     [  0   0   0   0   0   1   1 ]
 ∅     [  0   0   0   0   0   0   1 ]
```

**Complexity:** O(n·m).

---

## C5. Wildcard Matching — [LC 44](https://leetcode.com/problems/wildcard-matching/) · Hard

**Problem:** `?` matches one character, `*` matches any sequence (including empty). Does the pattern match the **whole** string?

```
("aa", "a") → false     ("aa", "*") → true
("cb", "?a") → false    ("adceb", "*a*b") → true
```

| DP Card | |
| --- | --- |
| State | `dp(i, j)` = does `s[i..]` match `p[j..]`? |
| Choices | `p[j]` is `*` → match empty `(i, j+1)` **or** eat one char `(i+1, j)`; `?` or same char → `(i+1, j+1)` |
| Recurrence | boolean `\|\|` |
| Base | `j === m` → `i === n`; `i === n` → the rest of `p` must be all `*` |
| Answer | `dp(0, 0)` |

```
 '*' at p[j]:
     match nothing      → move pattern only      (i,   j+1)
     match s[i] & stay  → move string only       (i+1, j  )   (* can eat more)
```

**Level 1 + 2** (note: memo has `n + 1` rows because `i` can equal `n` while `j < m`)

```js
var isMatch = function (s, p) {
    const n = s.length, m = p.length;
    const memo = Array.from({ length: n + 1 }, () => Array(m).fill(undefined)); // 🧠

    function dp(i, j) {
        if (j === m) return i === n;
        if (memo[i][j] !== undefined) return memo[i][j]; // 🧠

        let ok;
        if (p[j] === "*") ok = dp(i, j + 1) || (i < n && dp(i + 1, j));
        else ok = i < n && (p[j] === "?" || p[j] === s[i]) && dp(i + 1, j + 1);

        return memo[i][j] = ok;
    }

    return dp(0, 0);
};
```

**Level 3**

```js
var isMatch = function (s, p) {
    const n = s.length, m = p.length;
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(false));
    dp[n][m] = true;
    for (let j = m - 1; j >= 0; j--) dp[n][j] = p[j] === "*" && dp[n][j + 1];

    for (let i = n - 1; i >= 0; i--) {
        for (let j = m - 1; j >= 0; j--) {
            if (p[j] === "*") dp[i][j] = dp[i][j + 1] || dp[i + 1][j];
            else if (p[j] === "?" || p[j] === s[i]) dp[i][j] = dp[i + 1][j + 1];
        }
    }

    return dp[0][0];
};
```

**🔍 Dry run** (`s = "adceb"`, `p = "*a*b"`)

```
          *    a    *    b    ∅
 a     [  T    T    T    F    F ]   ← dp[0][0] = T ✅
 d     [  F    F    T    F    F ]
 c     [  F    F    T    F    F ]
 e     [  F    F    T    F    F ]
 b     [  F    F    T    T    F ]
 ∅     [  F    F    F    F    T ]
```

Read the `*` column (index 2): it is `T` all the way down from `d` to `b`. That is the `*` "eating" `d`, `c`, `e`.

**Complexity:** O(n·m).

---

# Part D · Interval DP (one string or array)

> **Family signature:** the answer for a range `[i..j]` depends on smaller ranges inside it.
> **State:** `dp(i, j)` = answer for the sub-range from index `i` to index `j`.
> **Fill order:** by **length** (short ranges first), or `i` from right to left and `j` from `i` to the right.

```
 Only the upper triangle is used (i ≤ j):     Small ranges sit near the diagonal.

        j →                                    ┌─────────────────┐
     i ┌───┬───┬───┬───┐                       │ s[i] ......s[j] │
     ↓ │ 1 │ 2 │ 3 │ 4 │  ← length grows →     └─────────────────┘
       │ · │ 1 │ 2 │ 3 │                         shrink from the left  (i+1, j)
       │ · │ · │ 1 │ 2 │                         shrink from the right (i, j-1)
       │ · │ · │ · │ 1 │                         shrink both           (i+1, j-1)
       └───┴───┴───┴───┘
```

---

## D1. Longest Palindromic Subsequence — [LC 516](https://leetcode.com/problems/longest-palindromic-subsequence/) · Medium

**Problem:** Length of the longest subsequence of `s` that reads the same both ways.

```
Input: "bbbab"   Output: 4  ("bbbb")
```

| DP Card | |
| --- | --- |
| State | `dp(i, j)` = LPS length inside `s[i..j]` |
| Choices | ends match → use both; else drop the left end or the right end |
| Recurrence | `s[i] === s[j]` → `2 + dp(i+1, j-1)`; else `max(dp(i+1, j), dp(i, j-1))` |
| Base | `i > j` → `0`; `i === j` → `1` |
| Answer | `dp(0, n-1)` |

> **Link to C1:** LPS(s) = LCS(s, reverse(s)). Same answer, different view.

**Level 1 + 2**

```js
var longestPalindromeSubseq = function (s) {
    const n = s.length;
    const memo = Array.from({ length: n }, () => Array(n).fill(undefined)); // 🧠

    function dp(i, j) {
        if (i > j) return 0;
        if (i === j) return 1;
        if (memo[i][j] !== undefined) return memo[i][j]; // 🧠

        if (s[i] === s[j]) return memo[i][j] = 2 + dp(i + 1, j - 1);
        return memo[i][j] = Math.max(dp(i + 1, j), dp(i, j - 1));
    }

    return dp(0, n - 1);
};
```

**Level 3**

```js
var longestPalindromeSubseq = function (s) {
    const n = s.length;
    const dp = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = n - 1; i >= 0; i--) {       // i reads i+1 → go down
        dp[i][i] = 1;
        for (let j = i + 1; j < n; j++) {    // j reads j-1 → go up
            if (s[i] === s[j]) dp[i][j] = 2 + dp[i + 1][j - 1];
            else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
        }
    }

    return dp[0][n - 1];
};
```

**🔍 Dry run** (`"bbbab"`)

```
        0b  1b  2b  3a  4b
 0b  [  1   2   3   3   4 ]   ← dp[0][4]: 'b'='b' → 2 + dp[1][3] = 2 + 2 = 4 ✅
 1b  [  ·   1   2   2   3 ]
 2b  [  ·   ·   1   1   3 ]
 3a  [  ·   ·   ·   1   1 ]
 4b  [  ·   ·   ·   ·   1 ]
```

**Complexity:** O(n²).

---

## D2. Palindromic Substrings — [LC 647](https://leetcode.com/problems/palindromic-substrings/) · Medium

**Problem:** Count substrings (contiguous) that are palindromes.

```
Input: "abc" → 3      Input: "aaa" → 6
```

| DP Card | |
| --- | --- |
| State | `pal(i, j)` = is `s[i..j]` a palindrome? |
| Recurrence | `s[i] === s[j] && (length ≤ 2 \|\| pal(i+1, j-1))` |
| Answer | **count** of `true` cells |

Subsequence (D1) vs substring (D2): substring has **no skipping**, so there is no `max` of two options, only "do the ends match and is the inside a palindrome?"

**Level 1 + 2**

```js
var countSubstrings = function (s) {
    const n = s.length;
    const memo = Array.from({ length: n }, () => Array(n).fill(undefined)); // 🧠

    function pal(i, j) {
        if (i >= j) return true;
        if (memo[i][j] !== undefined) return memo[i][j]; // 🧠

        return memo[i][j] = s[i] === s[j] && pal(i + 1, j - 1);
    }

    let count = 0;
    for (let i = 0; i < n; i++)
        for (let j = i; j < n; j++)
            if (pal(i, j)) count++;

    return count;
};
```

**Level 3**

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

**🔍 Dry run** (`"abba"` → 6: `a, b, b, a, bb, abba`)

```
        0a  1b  2b  3a
 0a  [  T   F   F   T ]   ← "abba": a=a and inside "bb" is T
 1b  [  ·   T   T   F ]   ← "bb"
 2b  [  ·   ·   T   F ]
 3a  [  ·   ·   ·   T ]
```

> Interview note: "expand around centre" solves this in O(n²) time with O(1) memory. The DP version is worth knowing because the same table answers LC 5 (Longest Palindromic Substring).

**Complexity:** O(n²).

---

## D3. Burst Balloons — [LC 312](https://leetcode.com/problems/burst-balloons/) · Hard · ⭐ the classic interval DP

**Problem:** Bursting balloon `k` earns `left × nums[k] × right` (its current neighbours). Maximise total coins.

```
Input: [3,1,5,8]   Output: 167
  burst 1: 3·1·5 = 15   [3,5,8]
  burst 5: 3·5·8 = 120  [3,8]
  burst 3: 1·3·8 = 24   [8]
  burst 8: 1·8·1 = 8    → 167
```

**The trick that makes it solvable:** think about which balloon is burst **LAST** in a range, not first.

```
 If k bursts FIRST, its neighbours change, and the left and right parts get glued together.
 The sub-problems are NOT independent. ❌

 If k bursts LAST between walls l and r:
   ┌── l ──[ left part ]── k ──[ right part ]── r ──┐
   left part and right part are burst while k still stands between them,
   so they never touch each other. Independent sub-problems. ✅
   When k finally bursts, its neighbours are exactly l and r.
```

| DP Card | |
| --- | --- |
| Setup | pad: `a = [1, ...nums, 1]` |
| State | `dp(l, r)` = max coins from bursting every balloon **strictly between** `l` and `r` |
| Choices | which `k` (l < k < r) bursts last |
| Recurrence | `max over k of a[l]·a[k]·a[r] + dp(l, k) + dp(k, r)` |
| Base | `r - l < 2` (nothing between) → `0` |
| Answer | `dp(0, n+1)` |

**Level 1 + 2**

```js
var maxCoins = function (nums) {
    const a = [1, ...nums, 1];
    const n = a.length;
    const memo = Array.from({ length: n }, () => Array(n).fill(undefined)); // 🧠

    function dp(l, r) {
        if (r - l < 2) return 0;
        if (memo[l][r] !== undefined) return memo[l][r]; // 🧠

        let best = 0;
        for (let k = l + 1; k < r; k++) {
            best = Math.max(best, a[l] * a[k] * a[r] + dp(l, k) + dp(k, r));
        }
        return memo[l][r] = best;
    }

    return dp(0, n - 1);
};
```

**Level 3** (by increasing gap)

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

**🔍 Dry run** (`a = [1, 3, 1, 5, 8, 1]`)

```
         0:1  1:3  2:1  3:5  4:8  5:1
 0:1  [   ·    0    3   30  159  167 ]  ← answer
 1:3  [   ·    ·    0   15  135  159 ]
 2:1  [   ·    ·    ·    0   40   48 ]
 3:5  [   ·    ·    ·    ·    0   40 ]
 4:8  [   ·    ·    ·    ·    ·    0 ]

 dp[0][5]: best k is 4 (balloon 8 last): 1·8·1 + dp[0][4] + dp[4][5] = 8 + 159 + 0 = 167 ✅
```

**Complexity:** O(n³) time (n² states × n choices of k), O(n²) memory.

---

# Part E · Knapsack (index × capacity)

> **Family signature:** a list of items, a target or capacity. For each item: take it or not.
> **State:** `dp(i, c)` = answer using items from `i` onward with `c` capacity (or target) left.

```
               take item i (0/1 knapsack):   (i+1, c - w[i])   ← move on, can't reuse
  (i, c)  ──►  take item i (unbounded):      (i,   c - w[i])   ← stay, can reuse
               skip item i:                  (i+1, c)
```

**0/1 vs unbounded** is the single most important distinction in this family. It decides one index in the recurrence **and** the loop direction in the 1D version.

---

## E1. Partition Equal Subset Sum — [LC 416](https://leetcode.com/problems/partition-equal-subset-sum/) · Medium · 0/1

**Problem:** Can the array be split into two subsets with equal sums?

```
[1,5,11,5] → true  ([1,5,5] and [11])      [1,2,3,5] → false
```

**Rephrase:** total = 22, so we need a subset that sums to `11`. Odd total → impossible.

| DP Card | |
| --- | --- |
| State | `dp(i, t)` = can items `i..` make exactly `t`? |
| Choices | skip `(i+1, t)`; take `(i+1, t - nums[i])` |
| Recurrence | `skip \|\| take` |
| Base | `t === 0` → `true`; `i === n` or `t < 0` → `false` |
| Answer | `dp(0, total / 2)` |

**Level 1 + 2**

```js
var canPartition = function (nums) {
    const total = nums.reduce((a, b) => a + b, 0);
    if (total % 2 === 1) return false;

    const n = nums.length, target = total / 2;
    const memo = Array.from({ length: n }, () => Array(target + 1).fill(undefined)); // 🧠

    function dp(i, t) {
        if (t === 0) return true;
        if (i === n || t < 0) return false;
        if (memo[i][t] !== undefined) return memo[i][t]; // 🧠

        return memo[i][t] = dp(i + 1, t) || dp(i + 1, t - nums[i]);
    }

    return dp(0, target);
};
```

**Level 4** (1D, loop `t` **downward**)

```js
var canPartition = function (nums) {
    const total = nums.reduce((a, b) => a + b, 0);
    if (total % 2 === 1) return false;

    const target = total / 2;
    const dp = Array(target + 1).fill(false);
    dp[0] = true;

    for (const x of nums) {
        for (let t = target; t >= x; t--) {   // downward = each item used at most once
            dp[t] = dp[t] || dp[t - x];
        }
    }

    return dp[target];
};
```

**🔍 Dry run** (2D table, `T` = reachable)

```
 t →      0  1  2  3  4  5  6  7  8  9 10 11
 i0=1   [ T  T  F  F  F  T  T  F  F  F  T  T ]  ← dp[0][11] = T ✅
 i1=5   [ T  F  F  F  F  T  F  F  F  F  T  T ]
 i2=11  [ T  F  F  F  F  T  F  F  F  F  F  T ]
 i3=5   [ T  F  F  F  F  T  F  F  F  F  F  F ]
 ∅      [ T  F  F  F  F  F  F  F  F  F  F  F ]
```

<details>
<summary>🎯 Predict: what goes wrong in the 1D version if t goes upward (t = x … target)?</summary>

Going upward, `dp[t - x]` may already include item `x` from **this same round**, so `x` can be used again. With `nums = [1, 2, 5]` (total 8, target 4), the very first item `x = 1` sets `dp[1]`, then `dp[2]` from `dp[1]`, then `dp[3]`, then `dp[4]`: that is "1 + 1 + 1 + 1", using the single `1` four times. It returns `true`, but the real answer is `false`. Downward = 0/1. Upward = unbounded.

</details>

**Complexity:** O(n · target) time, O(target) memory.

---

## E2. Target Sum — [LC 494](https://leetcode.com/problems/target-sum/) · Medium · 0/1 counting

**Problem:** Put `+` or `-` before each number. Count ways to reach `target`.

```
nums = [1,1,1,1,1], target = 3 → 5
```

**Direct DP:** `dp(i, sum)` = ways using numbers `i..` when the current sum is `sum`. The sum can be negative, so we shift it by `total` in the memo.

**Level 1 + 2**

```js
var findTargetSumWays = function (nums, target) {
    const n = nums.length, total = nums.reduce((a, b) => a + b, 0);
    const memo = Array.from({ length: n }, () => Array(2 * total + 1).fill(undefined)); // 🧠

    function dp(i, sum) {
        if (i === n) return sum === target ? 1 : 0;
        if (memo[i][sum + total] !== undefined) return memo[i][sum + total]; // 🧠

        return memo[i][sum + total] = dp(i + 1, sum + nums[i]) + dp(i + 1, sum - nums[i]);
    }

    return dp(0, 0);
};
```

**Smarter: turn it into subset counting.**

```
 P = sum of the "+" numbers,  N = sum of the "−" numbers
 P − N = target
 P + N = total
 ─────────────
 2P = target + total   →   P = (target + total) / 2

 "Count subsets that sum to P". Same shape as E1, but counting (+) instead of (||).
```

**Level 4**

```js
var findTargetSumWays = function (nums, target) {
    const total = nums.reduce((a, b) => a + b, 0);
    if (Math.abs(target) > total || (total + target) % 2 === 1) return 0;

    const P = (total + target) / 2;
    const dp = Array(P + 1).fill(0);
    dp[0] = 1;

    for (const x of nums) {
        for (let s = P; s >= x; s--) {   // 0/1 → downward
            dp[s] += dp[s - x];
        }
    }

    return dp[P];
};
```

**🔍 Dry run** (`P = (5 + 3) / 2 = 4`, 2D view)

```
 s →    0   1   2   3   4
 i0  [  1   5  10  10   5 ]  ← 5 ways ✅  (choose which four 1s are "+": C(5,4) = 5)
 i1  [  1   4   6   4   1 ]
 i2  [  1   3   3   1   0 ]
 i3  [  1   2   1   0   0 ]
 i4  [  1   1   0   0   0 ]
 ∅   [  1   0   0   0   0 ]
```

Pascal's triangle appears because every number is `1`.

**Complexity:** direct O(n · total); subset version O(n · P) with O(P) memory.

---

## E3. Coin Change II — [LC 518](https://leetcode.com/problems/coin-change-ii/) · Medium · unbounded counting

**Problem:** Count combinations of coins (unlimited supply) that make `amount`.

```
amount = 5, coins = [1,2,5] → 4   (5, 2+2+1, 2+1+1+1, 1+1+1+1+1)
```

| DP Card | |
| --- | --- |
| State | `dp(i, a)` = ways to make `a` using coins `i..` |
| Choices | skip coin `(i+1, a)`; use coin **and stay** `(i, a - coins[i])` |
| Recurrence | `skip + use` |
| Base | `a === 0` → `1`; `i === n` or `a < 0` → `0` |
| Answer | `dp(0, amount)` |

**Level 1 + 2**

```js
var change = function (amount, coins) {
    const n = coins.length;
    const memo = Array.from({ length: n }, () => Array(amount + 1).fill(undefined)); // 🧠

    function dp(i, a) {
        if (a === 0) return 1;
        if (i === n || a < 0) return 0;
        if (memo[i][a] !== undefined) return memo[i][a]; // 🧠

        return memo[i][a] = dp(i + 1, a) + dp(i, a - coins[i]);
    }

    return dp(0, amount);
};
```

**Level 4** (1D, loop `a` **upward** because coins are reusable)

```js
var change = function (amount, coins) {
    const dp = Array(amount + 1).fill(0);
    dp[0] = 1;

    for (const c of coins) {               // coins outer → combinations
        for (let a = c; a <= amount; a++) { // upward → unlimited use
            dp[a] += dp[a - c];
        }
    }

    return dp[amount];
};
```

**🔍 Dry run**

```
 a →     0   1   2   3   4   5
 c1   [  1   1   2   2   3   4 ]  ← answer 4 ✅
 c2   [  1   0   1   0   1   1 ]
 c5   [  1   0   0   0   0   1 ]
 ∅    [  1   0   0   0   0   0 ]
```

<details>
<summary>🎯 Predict: swap the loops (amount outer, coins inner). What do you count now?</summary>

**Permutations** (ordered sequences): `1+2+2`, `2+1+2`, `2+2+1` all count separately. For amount 5 you get 9 instead of 4. That is LC 377 (Combination Sum IV). Coins outer = each combination counted once, in coin order.

</details>

**Complexity:** O(n · amount) time, O(amount) memory.

---

## E4. Coin Change — [LC 322](https://leetcode.com/problems/coin-change/) · Medium · unbounded minimum

**Problem:** Fewest coins to make `amount` (unlimited supply), or `-1`.

```
coins = [1,2,5], amount = 11 → 3 (5+5+1)      coins = [2], amount = 3 → -1
```

| DP Card | |
| --- | --- |
| State | `dp(i, a)` = fewest coins to make `a` with coins `i..` |
| Recurrence | `min(dp(i+1, a), 1 + dp(i, a - coins[i]))` |
| Base | `a === 0` → `0`; `i === n` or `a < 0` → `Infinity` |
| Answer | `dp(0, amount)`, or `-1` if `Infinity` |

Same skeleton as E3: `+` → `min`, `1` → `0`, `0` → `Infinity`, and "+1 coin" on the take branch.

**Level 1 + 2**

```js
var coinChange = function (coins, amount) {
    const n = coins.length;
    const memo = Array.from({ length: n }, () => Array(amount + 1).fill(undefined)); // 🧠

    function dp(i, a) {
        if (a === 0) return 0;
        if (i === n || a < 0) return Infinity;
        if (memo[i][a] !== undefined) return memo[i][a]; // 🧠

        return memo[i][a] = Math.min(dp(i + 1, a), 1 + dp(i, a - coins[i]));
    }

    const ans = dp(0, amount);
    return ans === Infinity ? -1 : ans;
};
```

**Level 4** (prefer this: recursion depth can reach `amount` = 10⁴)

```js
var coinChange = function (coins, amount) {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (const c of coins) {
        for (let a = c; a <= amount; a++) {
            dp[a] = Math.min(dp[a], 1 + dp[a - c]);
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
};
```

**🔍 Dry run** (`∞` = impossible)

```
 a →    0  1  2  3  4  5  6  7  8  9 10 11
 c1  [  0  1  1  2  2  1  2  2  3  3  2  3 ]  ← 3 ✅
 c2  [  0  ∞  1  ∞  2  1  3  2  4  3  2  4 ]
 c5  [  0  ∞  ∞  ∞  ∞  1  ∞  ∞  ∞  ∞  2  ∞ ]
 ∅   [  0  ∞  ∞  ∞  ∞  ∞  ∞  ∞  ∞  ∞  ∞  ∞ ]
```

**Complexity:** O(n · amount).

### 🧩 The Knapsack Quartet

| | 0/1 (each item once) | Unbounded (reuse) |
| --- | --- | --- |
| **Possible?** (`\|\|`) | E1 Partition | (Word Break-style) |
| **Count** (`+`) | E2 Target Sum | E3 Coin Change II |
| **Min / Max** | 0/1 Knapsack, LC 474 | E4 Coin Change |
| Take-branch next state | `(i+1, c - w)` | `(i, c - w)` |
| 1D loop direction | **downward** | **upward** |

---

# Part F · Index + State

> **Family signature:** you walk through a sequence, and at each step you are in one of a few **modes** (holding stock or not, on cooldown or not).
> **State:** `dp(i, mode)`. The second dimension is small (2 or 3), but the thinking is pure 2D DP.

```
 State machine for stock problems:

            buy (−price)
   ┌──────┐ ──────────► ┌──────┐
   │ FREE │             │ HOLD │
   └──────┘ ◄────────── └──────┘
     ↺ rest    sell (+price)   ↺ rest
```

---

## F1. Best Time to Buy and Sell Stock with Cooldown — [LC 309](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/) · Medium

**Problem:** Unlimited transactions, one share at a time, and after a sell you must skip the next day.

```
prices = [1,2,3,0,2] → 3   (buy 1, sell 2, cooldown, buy 0, sell 2)
```

| DP Card | |
| --- | --- |
| State | `dp(i, holding)` = max profit from day `i` on, given whether I hold a share |
| Choices | holding: rest or **sell** (then skip a day); free: rest or **buy** |
| Recurrence | hold: `max(dp(i+1, 1), price + dp(i+2, 0))`; free: `max(dp(i+1, 0), -price + dp(i+1, 1))` |
| Base | `i >= n` → `0` |
| Answer | `dp(0, 0)` |

**Level 1 + 2**

```js
var maxProfit = function (prices) {
    const n = prices.length;
    const memo = Array.from({ length: n }, () => Array(2).fill(undefined)); // 🧠

    function dp(i, holding) {
        if (i >= n) return 0;
        if (memo[i][holding] !== undefined) return memo[i][holding]; // 🧠

        const rest = dp(i + 1, holding);
        const act = holding
            ? prices[i] + dp(i + 2, 0)   // sell, then cooldown
            : -prices[i] + dp(i + 1, 1); // buy
        return memo[i][holding] = Math.max(rest, act);
    }

    return dp(0, 0);
};
```

**Level 3**

```js
var maxProfit = function (prices) {
    const n = prices.length;
    const dp = Array.from({ length: n + 2 }, () => [0, 0]);

    for (let i = n - 1; i >= 0; i--) {
        dp[i][1] = Math.max(dp[i + 1][1], prices[i] + dp[i + 2][0]);
        dp[i][0] = Math.max(dp[i + 1][0], -prices[i] + dp[i + 1][1]);
    }

    return dp[0][0];
};
```

**🔍 Dry run**

```
 day:price   free  hold
 0:1      [   3     4 ]   ← answer dp[0][free] = 3 ✅
 1:2      [   2     4 ]
 2:3      [   2     3 ]
 3:0      [   2     2 ]
 4:2      [   0     2 ]
 end      [   0     0 ]
```

**Complexity:** O(n) time, O(1) memory possible (keep 3 rows of 2 values).

---

## F2. Best Time to Buy and Sell Stock with Transaction Fee — [LC 714](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/) · Medium

**Problem:** Unlimited transactions, pay `fee` on every sell.

```
prices = [1,3,2,8,4,9], fee = 2 → 8   ((8−1−2) + (9−4−2))
```

Same machine as F1. Two changes: sell earns `price - fee`, and there is no cooldown (`i+1` instead of `i+2`).

**Level 1 + 2**

```js
var maxProfit = function (prices, fee) {
    const n = prices.length;
    const memo = Array.from({ length: n }, () => Array(2).fill(undefined)); // 🧠

    function dp(i, holding) {
        if (i === n) return 0;
        if (memo[i][holding] !== undefined) return memo[i][holding]; // 🧠

        const rest = dp(i + 1, holding);
        const act = holding
            ? prices[i] - fee + dp(i + 1, 0)
            : -prices[i] + dp(i + 1, 1);
        return memo[i][holding] = Math.max(rest, act);
    }

    return dp(0, 0);
};
```

**Level 4** (two variables)

```js
var maxProfit = function (prices, fee) {
    let free = 0, hold = 0; // values for day i+1

    for (let i = prices.length - 1; i >= 0; i--) {
        const newHold = Math.max(hold, prices[i] - fee + free);
        const newFree = Math.max(free, -prices[i] + hold);
        hold = newHold;
        free = newFree;
    }

    return free;
};
```

**🔍 Dry run**

```
 day:price   free  hold
 0:1      [   8     9 ]   ← 8 ✅
 1:3      [   7     9 ]
 2:2      [   7     9 ]
 3:8      [   3     9 ]
 4:4      [   3     7 ]
 5:9      [   0     7 ]
 end      [   0     0 ]
```

**Complexity:** O(n) time, O(1) memory.

---

# 🧠 The Pattern-Recognition Quiz

Read each statement. Decide the **family** and write the **state** before you open the answer.

<details>
<summary>Q1. "Given a grid with costs, start anywhere in the first column and end anywhere in the last column, moving right, up-right or down-right. Minimise cost."</summary>

**Family A (grid paths).** It is A5 rotated 90°. `dp(i, j)` = min cost from `(i, j)` to the last column; answer = min over all rows in column 0.

</details>

<details>
<summary>Q2. "Find the shortest string that has both s1 and s2 as subsequences."</summary>

**Family C (two strings).** Shortest Common Supersequence (LC 1092). Length = `n + m − LCS`. Build the string by walking the LCS table.

</details>

<details>
<summary>Q3. "Given strings of 0s and 1s, find the largest subset with at most m zeros and n ones."</summary>

**Family E (0/1 knapsack) with two capacities** (LC 474). State `dp(i, zerosLeft, onesLeft)`, or a 2D table over `(zeros, ones)` with downward loops.

</details>

<details>
<summary>Q4. "Minimum cuts so that every piece of the string is a palindrome."</summary>

**Family D + 1D** (LC 132). Precompute `pal(i, j)` with D2, then `cuts(i)` = min over `j` where `pal(i, j)` of `1 + cuts(j+1)`.

</details>

<details>
<summary>Q5. "Stock prices, at most k transactions."</summary>

**Family F with a third dimension** (LC 188). `dp(i, holding, transactionsLeft)`.

</details>

<details>
<summary>Q6. "Find the length of the longest common contiguous subarray of two arrays."</summary>

**Family C, "ending here" variant** (LC 718). `dp(i, j)` = length of the common run **starting** at `i` and `j`: `a[i] === b[j] ? 1 + dp(i+1, j+1) : 0`. Answer = max over all cells (like B1). No skipping, because it must be contiguous.

</details>

<details>
<summary>Q7. "Does string s3 come from interleaving s1 and s2?"</summary>

**Family C** (LC 97). `dp(i, j)` = can `s1[i..]` and `s2[j..]` form `s3[i+j..]`? Choices: take from s1 or from s2. Boolean `||`.

</details>

<details>
<summary>Q8. "Merge adjacent piles of stones. Cost of a merge = total weight. Minimise cost."</summary>

**Family D (interval)** (LC 1000 / classic Matrix Chain Multiplication). `dp(l, r)` = min cost to merge range; try every split point `k`. Same shape as D3.

</details>

<details>
<summary>Q9. "Count the number of paths in a grid that move right or down and whose cell sum is divisible by k."</summary>

**Family A with an extra state** (LC 2435). `dp(i, j, remainder)`. When a constraint depends on the path's history, add that history to the state.

</details>

<details>
<summary>Q10. "Two robots start at the top corners and move down collecting cherries."</summary>

**Family A, 3D** (LC 1463 Cherry Pickup II). Both robots are always on the same row, so `dp(row, col1, col2)` and 9 choice pairs.

</details>

---

# 🎓 Final Comparison: all 22 problems

| # | Problem | Family | State `dp(i, j)` | Combine | Base | Answer |
| --- | --- | --- | --- | --- | --- | --- |
| A1 | Unique Paths | Grid | paths from cell | `+` | out → 0, target → 1 | `dp(0,0)` |
| A2 | Unique Paths II | Grid | paths from cell | `+` | + obstacle → 0 | `dp(0,0)` |
| A3 | Min Path Sum | Grid | min cost from cell | `min` | out → ∞ | `dp(0,0)` |
| A4 | Triangle | Grid | min cost from cell | `min` | last row | `dp(0,0)` |
| A5 | Min Falling Path | Grid | min cost from cell | `min` of 3 | col out → ∞ | min of row 0 |
| A6 | Dungeon Game | Grid | HP needed on entry | `max(1, min − d)` | out → ∞ | `dp(0,0)` |
| B1 | Maximal Square | Squares | side ending at cell | `1 + min` of 3 | out → 0 | `max²` |
| B2 | Count Squares | Squares | side ending at cell | `1 + min` of 3 | out → 0 | sum |
| C1 | LCS | Strings | LCS of suffixes | match `+1` / `max` | empty → 0 | `dp(0,0)` |
| C2 | Delete Operation | Strings | deletions | match / `1 + min` | empty → length left | `dp(0,0)` |
| C3 | Edit Distance | Strings | operations | match / `1 + min` of 3 | empty → length left | `dp(0,0)` |
| C4 | Distinct Subseq. | Strings | ways | skip `+` use | t done → 1 | `dp(0,0)` |
| C5 | Wildcard | Strings | matches? | `\|\|` | both done → T | `dp(0,0)` |
| D1 | Longest Pal. Subseq. | Interval | LPS in `[i..j]` | match `+2` / `max` | `i==j` → 1 | `dp(0,n-1)` |
| D2 | Pal. Substrings | Interval | is palindrome? | `&&` | len ≤ 2 | count T |
| D3 | Burst Balloons | Interval | max coins in `(l..r)` | `max` over last `k` | gap < 2 → 0 | `dp(0,n+1)` |
| E1 | Partition | Knapsack 0/1 | reachable? | `\|\|` | t = 0 → T | `dp(0, sum/2)` |
| E2 | Target Sum | Knapsack 0/1 | ways | `+` | end: sum = target | `dp(0,0)` |
| E3 | Coin Change II | Knapsack ∞ | ways | `+` | a = 0 → 1 | `dp(0, amt)` |
| E4 | Coin Change | Knapsack ∞ | fewest coins | `min` | a = 0 → 0 | `dp(0, amt)` |
| F1 | Stock Cooldown | Index+state | profit | `max` | end → 0 | `dp(0, free)` |
| F2 | Stock Fee | Index+state | profit | `max` | end → 0 | `dp(0, free)` |

---

# 🗣️ How to explain a DP solution in an interview (60 seconds)

1. "Let `dp(i, j)` be **[state in plain English]**."
2. "From here I can **[choices]**, so `dp(i, j) = [recurrence]`."
3. "It stops when **[base cases]**."
4. "The answer is **[answer state]**."
5. "There are **[#states]** states and each takes **[#choices]** work, so time is **[product]**."
6. "I'd write it top-down first, then convert to bottom-up and keep only **[one row / two rows]** for **[space]**."

---

# ✅ Progress Tracker

Tick a box when you can write the solution **from a blank file** without looking.

| | Problem | Memo | Tabulation | Space-opt | Explained it out loud |
| --- | --- | --- | --- | --- | --- |
| A1 | Unique Paths (62) | - [ ] | - [ ] | - [ ] | - [ ] |
| A2 | Unique Paths II (63) | - [ ] | - [ ] | - [ ] | - [ ] |
| A3 | Minimum Path Sum (64) | - [ ] | - [ ] | - [ ] | - [ ] |
| A4 | Triangle (120) | - [ ] | - [ ] | - [ ] | - [ ] |
| A5 | Min Falling Path Sum (931) | - [ ] | - [ ] | - [ ] | - [ ] |
| A6 | Dungeon Game (174) | - [ ] | - [ ] | - [ ] | - [ ] |
| B1 | Maximal Square (221) | - [ ] | - [ ] | - [ ] | - [ ] |
| B2 | Count Squares (1277) | - [ ] | - [ ] | - [ ] | - [ ] |
| C1 | LCS (1143) | - [ ] | - [ ] | - [ ] | - [ ] |
| C2 | Delete Operation (583) | - [ ] | - [ ] | - [ ] | - [ ] |
| C3 | Edit Distance (72) | - [ ] | - [ ] | - [ ] | - [ ] |
| C4 | Distinct Subsequences (115) | - [ ] | - [ ] | - [ ] | - [ ] |
| C5 | Wildcard Matching (44) | - [ ] | - [ ] | - [ ] | - [ ] |
| D1 | Longest Pal. Subsequence (516) | - [ ] | - [ ] | - [ ] | - [ ] |
| D2 | Palindromic Substrings (647) | - [ ] | - [ ] | - [ ] | - [ ] |
| D3 | Burst Balloons (312) | - [ ] | - [ ] | - [ ] | - [ ] |
| E1 | Partition Equal Subset (416) | - [ ] | - [ ] | - [ ] | - [ ] |
| E2 | Target Sum (494) | - [ ] | - [ ] | - [ ] | - [ ] |
| E3 | Coin Change II (518) | - [ ] | - [ ] | - [ ] | - [ ] |
| E4 | Coin Change (322) | - [ ] | - [ ] | - [ ] | - [ ] |
| F1 | Stock w/ Cooldown (309) | - [ ] | - [ ] | - [ ] | - [ ] |
| F2 | Stock w/ Fee (714) | - [ ] | - [ ] | - [ ] | - [ ] |

> Markdown tables don't render checkboxes in every viewer. If yours shows `- [ ]` as text, replace it with ✅ when done.

### Suggested 2-week plan

| Day | Learn | Then solve on your own (homework) |
| --- | --- | --- |
| 1 | Part 0 + A1, A2 | LC 1289 Min Falling Path Sum II |
| 2 | A3, A4 | LC 2304 Minimum Path Cost in a Grid |
| 3 | A5, A6 | LC 741 Cherry Pickup (hard, 3D peek) |
| 4 | B1, B2 | LC 85 Maximal Rectangle |
| 5 | C1, C2 | LC 1092 Shortest Common Supersequence, LC 718 |
| 6 | C3 | LC 712 Minimum ASCII Delete Sum |
| 7 | C4, C5 | LC 10 Regular Expression Matching, LC 97 Interleaving String |
| 8 | **Revision:** redo A3, B1, C3 from blank | Pattern Quiz Q1–Q5 |
| 9 | D1, D2 | LC 5 Longest Palindromic Substring, LC 132 |
| 10 | D3 | LC 1039 Min Score Triangulation, LC 1547 Min Cost to Cut a Stick |
| 11 | E1, E2 | LC 474 Ones and Zeroes, LC 1049 Last Stone Weight II |
| 12 | E3, E4 | LC 377 Combination Sum IV (compare with E3!) |
| 13 | F1, F2 | LC 123, LC 188 (3D: add transaction count) |
| 14 | **Final:** Pattern Quiz Q6–Q10, redo D3 and C5 from blank | |

---

# 🚀 Where to go next

* **3D DP**: add a third changing parameter (LC 1463, LC 188, LC 474, LC 2435). The recipe does not change. The DP Card just gets a longer "State" line.
* **DP on trees**: `dp(node, state)` (LC 337 House Robber III).
* **Bitmask DP**: `dp(mask, i)` for small sets (LC 847, LC 1125).
* **Digit DP**: `dp(position, tight, ...)` for counting numbers with a property.

> **The one sentence to remember:** *Define the state in plain English, list the choices, combine them with `+`, `min`, `max` or `||`, and stop at the base case. Everything else is bookkeeping.*
