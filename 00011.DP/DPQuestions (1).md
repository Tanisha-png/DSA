# Dynamic Programming in JavaScript

## Essential Notes, Questions and Answers

A concise study sheet covering the most important ideas and common
interview patterns. All code examples use JavaScript.

## 1. What is Dynamic Programming?

Dynamic Programming (DP) solves a problem by solving smaller subproblems
and reusing their answers.

DP is useful when a problem has: 1. **Overlapping subproblems:** the
same smaller problems are solved repeatedly. 2. **Optimal
substructure:** a larger answer can be built from answers to smaller
problems.

Recursion alone does not mean DP is needed.

## 2. What is the difference between recursion, memoization and tabulation?

**Recursion** solves a problem by calling the same function on smaller
inputs.

**Memoization** is top down DP. It uses recursion and caches answers so
each state is computed once.

**Tabulation** is bottom up DP. It fills a table from base cases toward
the final answer.

## 3. Fibonacci: plain recursion, memoization and tabulation

### Q1. Write a recursive Fibonacci function.

``` javascript
function fibRecursive(n) {
  if (n < 0) throw new Error("n must be non-negative");
  if (n <= 1) return n;

  return fibRecursive(n - 1) + fibRecursive(n - 2);
}

console.log(fibRecursive(6)); // 8
```

**Explanation:** The base cases are `fib(0) = 0` and `fib(1) = 1`. Each
larger value depends on the previous two values.

**Complexity:** Exponential time, approximately `O(2^n)`, because many
subproblems are repeated. Call stack space is `O(n)`.

### Q2. Improve Fibonacci using memoization.

``` javascript
function fibMemo(n, memo = {}) {
  if (n < 0) throw new Error("n must be non-negative");
  if (n <= 1) return n;

  if (memo[n] !== undefined) return memo[n];

  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

console.log(fibMemo(6)); // 8
```

**Explanation:** `memo[n]` stores the answer for state `n`, preventing
repeated calculation.

**Complexity:** `O(n)` time and `O(n)` auxiliary space, including the
cache and recursion stack.

### Q3. Write Fibonacci using tabulation.

``` javascript
function fibTab(n) {
  if (n < 0) throw new Error("n must be non-negative");
  if (n <= 1) return n;

  const dp = Array(n + 1).fill(0);
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

console.log(fibTab(6)); // 8
```

**Complexity:** `O(n)` time and `O(n)` space.

### Q4. Reduce Fibonacci to constant extra space.

``` javascript
function fibOptimized(n) {
  if (n < 0) throw new Error("n must be non-negative");

  let prev2 = 0;
  let prev1 = 1;

  for (let i = 2; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return n === 0 ? 0 : prev1;
}

console.log(fibOptimized(6)); // 8
```

**Complexity:** `O(n)` time and `O(1)` auxiliary space.

## 4. How to design a DP solution

For each problem, answer these questions in order:

1.  **State:** What smaller problem does `dp[...]` represent?
2.  **Choices:** What options are available at this state?
3.  **Transition:** How does each choice use smaller states?
4.  **Base cases:** What are the smallest answers known directly?
5.  **Order:** In what order must states be computed?
6.  **Answer:** Which state gives the result?
7.  **Complexity:** How many states exist, and how much work does each
    state do?

## 5. Climbing Stairs

### Q5. A person can climb one or two steps. How many ways are there to reach step `n`?

``` javascript
function climbStairs(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("n must be a non-negative integer");
  }

  if (n <= 1) return 1;

  let oneStepBefore = 1; // ways to reach step 0
  let twoStepsBefore = 1; // ways to reach step 1

  for (let step = 2; step <= n; step++) {
    const current = oneStepBefore + twoStepsBefore;
    twoStepsBefore = oneStepBefore;
    oneStepBefore = current;
  }

  return oneStepBefore;
}

console.log(climbStairs(4)); // 5
```

**Transition:** `dp[n] = dp[n - 1] + dp[n - 2]`.

**Base cases:** `dp[0] = 1` and `dp[1] = 1`. There is one way to stay at
step zero, by taking no steps.

**Complexity:** `O(n)` time and `O(1)` space.

## 6. Take or skip

### Q6. House Robber: maximize money without robbing adjacent houses.

``` javascript
function rob(houses) {
  let twoBack = 0;
  let oneBack = 0;

  for (const money of houses) {
    const current = Math.max(oneBack, twoBack + money);
    twoBack = oneBack;
    oneBack = current;
  }

  return oneBack;
}

console.log(rob([2, 7, 9, 3, 1])); // 12
console.log(rob([])); // 0
```

**Explanation:** At each house, either skip it and keep `oneBack`, or
rob it and add its value to `twoBack`.

**Transition:** `dp[i] = max(dp[i - 1], dp[i - 2] + houses[i])`.

**Complexity:** `O(n)` time and `O(1)` space.

## 7. Subset Sum

### Q7. Determine whether some positive integers add up to a target.

``` javascript
function subsetSum(nums, target) {
  const dp = Array(target + 1).fill(false);
  dp[0] = true;

  for (const num of nums) {
    for (let sum = target; sum >= num; sum--) {
      dp[sum] = dp[sum] || dp[sum - num];
    }
  }

  return dp[target];
}

console.log(subsetSum([3, 4, 5], 9)); // true
console.log(subsetSum([3, 4, 5], 2)); // false
```

**Explanation:** `dp[sum]` tells whether a subset can make `sum`. The
loop runs backward so the current number is not reused more than once.

**Complexity:** `O(n × target)` time and `O(target)` space. This
implementation assumes non-negative integers.

### Q8. Why must the sum loop go backward in 0/1 subset sum?

Because each input number may be used only once. A backward loop
prevents a state updated using the current number from being reused
again during the same iteration. A forward loop can accidentally allow
repeated use of that number.

## 8. 0/1 Knapsack

### Q9. Maximize item value without exceeding capacity. Each item can be used once.

``` javascript
function knapsack(weights, values, capacity) {
  if (weights.length !== values.length) {
    throw new Error("weights and values must have equal lengths");
  }

  const dp = Array(capacity + 1).fill(0);

  for (let i = 0; i < weights.length; i++) {
    const weight = weights[i];
    const value = values[i];

    for (let cap = capacity; cap >= weight; cap--) {
      dp[cap] = Math.max(dp[cap], dp[cap - weight] + value);
    }
  }

  return dp[capacity];
}

console.log(knapsack([1, 3, 4], [15, 20, 30], 4)); // 35
```

**Explanation:** For each item, either skip it or take it if it fits.
The backward capacity loop ensures an item is used at most once.

**Complexity:** `O(n × capacity)` time and `O(capacity)` space.

## 9. Coin Change

### Q10. Find the minimum number of coins needed to make an amount.

``` javascript
function minCoins(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let current = 1; current <= amount; current++) {
    for (const coin of coins) {
      if (coin <= current) {
        dp[current] = Math.min(
          dp[current],
          dp[current - coin] + 1
        );
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

console.log(minCoins([1, 2, 5], 11)); // 3
console.log(minCoins([2], 3)); // -1
```

**Explanation:** `dp[x]` is the fewest coins needed to make amount `x`.
If it remains `Infinity`, the amount cannot be formed.

**Complexity:** `O(amount × numberOfCoins)` time and `O(amount)` space.
Coins must be positive integers.

### Q11. Count coin combinations, not ordered sequences.

``` javascript
function coinCombinations(coins, amount) {
  const dp = Array(amount + 1).fill(0);
  dp[0] = 1;

  for (const coin of coins) {
    for (let current = coin; current <= amount; current++) {
      dp[current] += dp[current - coin];
    }
  }

  return dp[amount];
}

console.log(coinCombinations([1, 2, 5], 5)); // 4
```

**Explanation:** Process each coin outside the amount loop to count
combinations without treating different orders as different answers.

**Complexity:** `O(amount × numberOfCoins)` time and `O(amount)` space.

## 10. Grid DP

### Q12. Count paths from the top left to the bottom right, moving only right or down.

``` javascript
function uniquePaths(rows, cols) {
  if (rows <= 0 || cols <= 0) return 0;

  const dp = Array(cols).fill(1);

  for (let row = 1; row < rows; row++) {
    for (let col = 1; col < cols; col++) {
      dp[col] = dp[col] + dp[col - 1];
    }
  }

  return dp[cols - 1];
}

console.log(uniquePaths(3, 3)); // 6
```

**Explanation:** The paths to a cell come from above and from the left.
`dp[col]` stores the value from above before it is updated, and
`dp[col - 1]` stores the current row's value from the left.

**Complexity:** `O(rows × cols)` time and `O(cols)` space.

## 11. String DP

### Q13. Find the length of the Longest Common Subsequence (LCS).

A subsequence keeps the relative order of characters but may skip
characters. A substring must be contiguous.

``` javascript
function lcs(a, b) {
  const dp = Array(b.length + 1).fill(0);

  for (let i = 1; i <= a.length; i++) {
    let diagonal = 0;

    for (let j = 1; j <= b.length; j++) {
      const oldAbove = dp[j];

      if (a[i - 1] === b[j - 1]) {
        dp[j] = diagonal + 1;
      } else {
        dp[j] = Math.max(dp[j], dp[j - 1]);
      }

      diagonal = oldAbove;
    }
  }

  return dp[b.length];
}

console.log(lcs("abcde", "ace")); // 3
```

**Transition:** If characters match, use `diagonal + 1`. Otherwise, take
the maximum of skipping a character from either string.

**Complexity:** `O(m × n)` time and `O(n)` space, where `m` and `n` are
string lengths.

### Q14. Find the minimum edit distance between two strings.

Allowed operations are insertion, deletion and replacement.

``` javascript
function editDistance(a, b) {
  const dp = Array(b.length + 1)
    .fill(0)
    .map((_, j) => j);

  for (let i = 1; i <= a.length; i++) {
    let diagonal = dp[0];
    dp[0] = i;

    for (let j = 1; j <= b.length; j++) {
      const oldAbove = dp[j];

      if (a[i - 1] === b[j - 1]) {
        dp[j] = diagonal;
      } else {
        dp[j] = 1 + Math.min(
          dp[j],     // delete from a
          dp[j - 1], // insert into a
          diagonal   // replace
        );
      }

      diagonal = oldAbove;
    }
  }

  return dp[b.length];
}

console.log(editDistance("horse", "ros")); // 3
```

**Complexity:** `O(m × n)` time and `O(n)` space.

## 12. Longest Increasing Subsequence

### Q15. Find the length of the Longest Increasing Subsequence (LIS).

``` javascript
function lis(nums) {
  const tails = [];

  for (const num of nums) {
    let left = 0;
    let right = tails.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (tails[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    tails[left] = num;
  }

  return tails.length;
}

console.log(lis([10, 9, 2, 5, 3, 7, 101, 18])); // 4
```

**Explanation:** `tails[k]` stores the smallest possible ending value
for an increasing subsequence of length `k + 1`. The `tails` array does
not necessarily represent the actual final subsequence.

**Complexity:** `O(n log n)` time and `O(n)` space.

## 13. Essential debugging questions

### Q16. Why is this Fibonacci base case wrong?

``` javascript
function fib(n) {
  if (n === 1) return 0;
  return fib(n - 1) + fib(n - 2);
}
```

**Answer:** It does not correctly define both base cases. For `n = 0`,
recursion continues into negative inputs. Use:

``` javascript
function fib(n) {
  if (n < 0) throw new Error("n must be non-negative");
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
```

### Q17. What is the most common 0/1 Knapsack loop direction bug?

**Answer:** Iterating capacity upward can reuse the same item multiple
times. Iterate from `capacity` down to `weight`.

### Q18. Why can a memoized recursive solution still fail for large input?

**Answer:** Memoization reduces repeated calculations, but recursion can
still exceed JavaScript's call stack limit. Use tabulation or an
iterative formulation when recursion depth may be large.

## 14. Choosing the right technique

### Q19. Does every problem need DP?

**Answer:** No. Choose the technique that fits the problem.

  Problem                                                    Common technique
  ---------------------------------------------------------- ----------------------------------
  Shortest path in an unweighted graph                       BFS
  Find two numbers that add to a target                      Hash set or hash map
  Maximum contiguous subarray sum                            Kadane's algorithm
  Count ways or optimize choices with repeated subproblems   Often DP
  Longest increasing subsequence                             DP or binary search based method
  Shortest paths in a weighted DAG                           DAG DP

### Q20. How do you calculate DP complexity?

**Answer:** Count the number of states and the work done per state.

If there are `n` states and each state takes `O(n)` work, total time is
usually `O(n²)`. A table with `n` rows and `m` columns usually takes
`O(n × m)` time if each cell takes constant work.

## 15. Final checklist for every DP problem

Before coding, confirm:

1.  What does each state mean?
2.  What choices are available?
3.  What recurrence represents those choices?
4.  Are the base cases correct?
5.  Is the computation order valid?
6.  Can the answer be reconstructed if required?
7.  What are the time and auxiliary space complexities?
8.  Have empty input, smallest input and impossible cases been handled?

## Quick revision

  -----------------------------------------------------------------------
  Term                                Meaning
  ----------------------------------- -----------------------------------
  State                               A smaller problem represented by
                                      one DP entry

  Transition                          Rule for calculating a state from
                                      other states

  Base case                           A state whose answer is directly
                                      known

  Memoization                         Top down recursion with caching

  Tabulation                          Bottom up table filling

  Space optimization                  Keep only the previous states
                                      needed

  0/1 choice                          An item can be used at most once

  Unbounded choice                    An item may be reused

  Overlapping subproblems             The same smaller problem appears
                                      repeatedly

  Optimal substructure                A larger optimum can be built from
                                      smaller optima
  -----------------------------------------------------------------------
