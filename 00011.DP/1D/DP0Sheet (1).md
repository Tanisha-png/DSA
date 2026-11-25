# Recursion and Dynamic Programming in JavaScript

## Questions with Answers

**Language:** JavaScript using Node.js\
**Level:** Beginner to intermediate\
**Purpose:** Learn recursion first, then understand overlapping
subproblems, memoization, tabulation, and state transitions.

Run each code example separately with Node.js. Every example is self
contained.

## 1. Sum from 1 to n using recursion

**Question:** Write a recursive function that returns the sum of all
integers from `1` to `n`. Assume `n` is a nonnegative integer.

**Answer:**

``` javascript
function sumToN(n) {
  if (n === 0) {
    return 0;
  }

  return n + sumToN(n - 1);
}

console.log(sumToN(5)); // 15
```

**Expected output:**

``` text
15
```

## 2. Factorial using recursion

**Question:** Write a recursive function to calculate `n!`. Define `0!`
as `1`.

**Answer:**

``` javascript
function factorial(n) {
  if (n < 0) {
    throw new Error("n must be nonnegative");
  }

  if (n === 0 || n === 1) {
    return 1;
  }

  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
console.log(factorial(0)); // 1
```

**Expected output:**

``` text
120
1
```

## 3. Print numbers from n down to 1

**Question:** Use recursion to print `n, n - 1, ... 1`.

**Answer:**

``` javascript
function printDescending(n) {
  if (n < 1) {
    return;
  }

  console.log(n);
  printDescending(n - 1);
}

printDescending(4);
```

**Expected output:**

``` text
4
3
2
1
```

## 4. Print numbers from 1 to n

**Question:** Use recursion to print `1, 2, ... n` without using a loop.

**Answer:**

``` javascript
function printAscending(n) {
  if (n < 1) {
    return;
  }

  printAscending(n - 1);
  console.log(n);
}

printAscending(4);
```

**Expected output:**

``` text
1
2
3
4
```

## 5. Reverse a string using recursion

**Question:** Write a recursive function that returns a reversed string.

**Answer:**

``` javascript
function reverseString(text) {
  if (text.length <= 1) {
    return text;
  }

  return reverseString(text.slice(1)) + text[0];
}

console.log(reverseString("code"));
```

**Expected output:**

``` text
edoc
```

## 6. Find the nth Fibonacci number using plain recursion

**Question:** Use `F(0) = 0`, `F(1) = 1`, and
`F(n) = F(n - 1) + F(n - 2)`.

**Answer:**

``` javascript
function fibonacci(n) {
  if (n < 0) {
    throw new Error("n must be nonnegative");
  }

  if (n <= 1) {
    return n;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(6)); // 8
```

**Expected output:**

``` text
8
```

## 7. Count calls in recursive Fibonacci

**Question:** Count how many times the Fibonacci function is called,
including the first call, when calculating `fibonacci(4)`.

**Answer:**

``` javascript
function fibonacciWithCallCount(n, stats) {
  stats.calls += 1;

  if (n <= 1) {
    return n;
  }

  return fibonacciWithCallCount(n - 1, stats) +
    fibonacciWithCallCount(n - 2, stats);
}

const stats = { calls: 0 };
const result = fibonacciWithCallCount(4, stats);

console.log("Result:", result);
console.log("Calls:", stats.calls);
```

**Expected output:**

``` text
Result: 3
Calls: 9
```

## 8. Fibonacci using memoization

**Question:** Improve recursive Fibonacci by storing results that have
already been calculated.

**Answer:**

``` javascript
function fibonacciMemo(n, memo = {}) {
  if (n < 0) {
    throw new Error("n must be nonnegative");
  }

  if (n <= 1) {
    return n;
  }

  if (memo[n] !== undefined) {
    return memo[n];
  }

  memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  return memo[n];
}

console.log(fibonacciMemo(10)); // 55
```

**Expected output:**

``` text
55
```

## 9. Fibonacci using tabulation

**Question:** Solve Fibonacci iteratively by building answers from the
smallest states upward.

**Answer:**

``` javascript
function fibonacciTabulation(n) {
  if (n < 0) {
    throw new Error("n must be nonnegative");
  }

  if (n <= 1) {
    return n;
  }

  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

console.log(fibonacciTabulation(10)); // 55
```

**Expected output:**

``` text
55
```

## 10. Fibonacci using constant extra space

**Question:** Calculate Fibonacci without storing the entire DP table.

**Answer:**

``` javascript
function fibonacciSpaceOptimized(n) {
  if (n < 0) {
    throw new Error("n must be nonnegative");
  }

  if (n <= 1) {
    return n;
  }

  let previous = 0;
  let current = 1;

  for (let i = 2; i <= n; i++) {
    const next = previous + current;
    previous = current;
    current = next;
  }

  return current;
}

console.log(fibonacciSpaceOptimized(10)); // 55
```

**Expected output:**

``` text
55
```

## 11. Climbing stairs using recursion

**Question:** A person can climb either one or two stairs at a time.
Return the number of different ways to reach stair `n`.

**Answer:**

``` javascript
function climbStairsRecursive(n) {
  if (n < 0) {
    return 0;
  }

  if (n === 0) {
    return 1;
  }

  return climbStairsRecursive(n - 1) + climbStairsRecursive(n - 2);
}

console.log(climbStairsRecursive(4)); // 5
```

**Expected output:**

``` text
5
```

## 12. Climbing stairs using memoization

**Question:** Optimize the climbing stairs solution by remembering the
answer for each stair number.

**Answer:**

``` javascript
function climbStairsMemo(n, memo = {}) {
  if (n < 0) {
    return 0;
  }

  if (n === 0) {
    return 1;
  }

  if (memo[n] !== undefined) {
    return memo[n];
  }

  memo[n] = climbStairsMemo(n - 1, memo) + climbStairsMemo(n - 2, memo);
  return memo[n];
}

console.log(climbStairsMemo(5)); // 8
```

**Expected output:**

``` text
8
```

## 13. Minimum cost frog jump using recursion

**Question:** A frog starts at index `0`. It may jump one or two
positions. The cost of a jump from `i` to `j` is
`Math.abs(heights[i] - heights[j])`. Find the minimum cost to reach the
last index.

**Answer:**

``` javascript
function frogJumpRecursive(heights, index = heights.length - 1) {
  if (index === 0) {
    return 0;
  }

  const oneStep = frogJumpRecursive(heights, index - 1) +
    Math.abs(heights[index] - heights[index - 1]);

  let twoSteps = Infinity;
  if (index > 1) {
    twoSteps = frogJumpRecursive(heights, index - 2) +
      Math.abs(heights[index] - heights[index - 2]);
  }

  return Math.min(oneStep, twoSteps);
}

console.log(frogJumpRecursive([10, 30, 20, 40])); // 30
```

**Expected output:**

``` text
30
```

## 14. Minimum cost frog jump using memoization

**Question:** Optimize the frog jump solution so each index is solved
only once.

**Answer:**

``` javascript
function frogJumpMemo(heights) {
  if (heights.length === 0) {
    return 0;
  }

  const memo = new Array(heights.length).fill(undefined);

  function solve(index) {
    if (index === 0) {
      return 0;
    }

    if (memo[index] !== undefined) {
      return memo[index];
    }

    const oneStep = solve(index - 1) +
      Math.abs(heights[index] - heights[index - 1]);

    let twoSteps = Infinity;
    if (index > 1) {
      twoSteps = solve(index - 2) +
        Math.abs(heights[index] - heights[index - 2]);
    }

    memo[index] = Math.min(oneStep, twoSteps);
    return memo[index];
  }

  return solve(heights.length - 1);
}

console.log(frogJumpMemo([10, 30, 20, 40])); // 30
```

**Expected output:**

``` text
30
```

## 15. House Robber using recursion

**Question:** Given nonnegative house values, find the maximum amount
that can be collected without choosing two adjacent houses.

**Answer:**

``` javascript
function houseRobberRecursive(values, index = 0) {
  if (index >= values.length) {
    return 0;
  }

  const skip = houseRobberRecursive(values, index + 1);
  const take = values[index] + houseRobberRecursive(values, index + 2);

  return Math.max(take, skip);
}

console.log(houseRobberRecursive([2, 7, 9, 3, 1])); // 12
```

**Expected output:**

``` text
12
```

## 16. House Robber using memoization

**Question:** Optimize House Robber by storing the best result from each
index onward.

**Answer:**

``` javascript
function houseRobberMemo(values) {
  const memo = new Array(values.length).fill(undefined);

  function solve(index) {
    if (index >= values.length) {
      return 0;
    }

    if (memo[index] !== undefined) {
      return memo[index];
    }

    const skip = solve(index + 1);
    const take = values[index] + solve(index + 2);

    memo[index] = Math.max(take, skip);
    return memo[index];
  }

  return solve(0);
}

console.log(houseRobberMemo([2, 7, 9, 3, 1])); // 12
```

**Expected output:**

``` text
12
```

## 17. House Robber using tabulation

**Question:** Solve House Robber using a bottom up DP array.

**Answer:**

``` javascript
function houseRobberTabulation(values) {
  const n = values.length;
  const dp = new Array(n + 2).fill(0);

  for (let i = n - 1; i >= 0; i--) {
    dp[i] = Math.max(values[i] + dp[i + 2], dp[i + 1]);
  }

  return dp[0];
}

console.log(houseRobberTabulation([2, 7, 9, 3, 1])); // 12
```

**Expected output:**

``` text
12
```

## 18. Subset sum using recursion

**Question:** Given positive integers and a target, determine whether
any subset adds up to the target. Each element may be used at most once.

**Answer:**

``` javascript
function subsetSumRecursive(numbers, target, index = 0) {
  if (target === 0) {
    return true;
  }

  if (index === numbers.length || target < 0) {
    return false;
  }

  const skip = subsetSumRecursive(numbers, target, index + 1);
  const take = subsetSumRecursive(numbers, target - numbers[index], index + 1);

  return take || skip;
}

console.log(subsetSumRecursive([3, 4, 5, 2], 9)); // true
console.log(subsetSumRecursive([3, 4, 5, 2], 8)); // true
console.log(subsetSumRecursive([3, 4, 5, 2], 20)); // false
```

**Expected output:**

``` text
true
true
false
```

## 19. Subset sum using memoization

**Question:** Optimize subset sum by remembering whether a given index
and remaining target can produce a solution.

**Answer:**

``` javascript
function subsetSumMemo(numbers, target) {
  const memo = new Map();

  function solve(index, remaining) {
    if (remaining === 0) {
      return true;
    }

    if (index === numbers.length || remaining < 0) {
      return false;
    }

    const key = `${index},${remaining}`;
    if (memo.has(key)) {
      return memo.get(key);
    }

    const answer = solve(index + 1, remaining) ||
      solve(index + 1, remaining - numbers[index]);

    memo.set(key, answer);
    return answer;
  }

  return solve(0, target);
}

console.log(subsetSumMemo([3, 4, 5, 2], 9)); // true
console.log(subsetSumMemo([3, 4, 5, 2], 20)); // false
```

**Expected output:**

``` text
true
false
```

## 20. Count unique paths in a grid using tabulation

**Question:** A robot starts in the top left cell of an `m` by `n` grid
and can move only right or down. Count the paths to the bottom right
cell.

**Answer:**

``` javascript
function uniquePaths(m, n) {
  if (m <= 0 || n <= 0) {
    return 0;
  }

  const dp = Array.from({ length: m }, () => new Array(n).fill(1));

  for (let row = 1; row < m; row++) {
    for (let col = 1; col < n; col++) {
      dp[row][col] = dp[row - 1][col] + dp[row][col - 1];
    }
  }

  return dp[m - 1][n - 1];
}

console.log(uniquePaths(3, 3)); // 6
console.log(uniquePaths(3, 7)); // 28
```

**Expected output:**

``` text
6
28
```

## Quick revision questions

1.  What is the base case in a recursive function, and what happens if
    it is incorrect?
2.  Why does plain recursive Fibonacci repeat work?
3.  What information does a memoization key need to identify a
    subproblem?
4.  How does tabulation differ from memoization in the order of
    computation?
5.  Why does House Robber consider both taking and skipping a house?
6.  In subset sum, why must the index advance after taking an element?
7.  What does each cell in the unique paths DP table represent?
8.  When is space optimization possible without changing the answer?

## Complexity overview

  -----------------------------------------------------------------------
  Problem           Approach          Time              Auxiliary space
  ----------------- ----------------- ----------------- -----------------
  Sum from 1 to n   Recursion         O(n)              O(n) call stack

  Factorial         Recursion         O(n)              O(n) call stack

  Fibonacci         Plain recursion   O(2\^n) upper     O(n) call stack
                                      bound             

  Fibonacci         Memoization       O(n)              O(n)

  Fibonacci         Tabulation        O(n)              O(n)

  Fibonacci         Space optimized   O(n)              O(1)

  Climbing stairs   Memoization       O(n)              O(n)

  Frog jump         Memoization       O(n)              O(n)

  House Robber      Tabulation        O(n)              O(n)

  Subset sum        Memoization       O(n × target)     O(n × target)
                                      states in the     
                                      usual positive    
                                      integer case      

  Unique paths      Tabulation        O(m × n)          O(m × n)
  -----------------------------------------------------------------------

**Important:** Recursive solutions may exceed JavaScript's call stack
limit for large inputs. For large constraints, prefer an iterative
solution when appropriate. The complexity table gives asymptotic bounds
and does not include the memory occupied by the input itself.
