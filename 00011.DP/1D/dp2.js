/*Q1. Write a recursive Fibonacci function.*/
function fibonacci(n) {
    // base case 1
    if (n < 0) throw new Error("n must be a non-negative");
    // base case 2
    if (n <= 1) return n;

    // recursive case
    return fibonacci(n - 1) + fibonacci(n - 2)
}

// console.log(fibonacci(6))

// Q2. Improve Fibonacci using memoization.
function fibonacci(n, memo = {}) {
    // base case 1
    if (n < 0) throw new Error("n must be non-negative");
    // base case 2
    if (n <= 1) return n;
    // base case 3
    if (memo[n] !== undefined) return memo[n]

    // recursive case
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}

// console.log(fibonacci(6));

/**
 * Q5. A person can climb one or two steps. How many ways are there to reach step n?
 */
function climbStairs(n) {
    if (!Number.isInteger(n) || n < 0) {
        throw new Error("n must be a non-negative integer");
    }

    if (n <= 1) return 1;

    let oneStepBefore = 1;
    let twoStepsBefore = 1;

    for (let step = 2; step <= n; step++) {
        const current = oneStepBefore + twoStepsBefore;
        twoStepsBefore = oneStepBefore;
        oneStepBefore = current;
    }
    return oneStepBefore;
}

// console.log(climbStairs(4));

// 16. House Robber using memoization
// Question: Optimize House Robber by storing the best result from each index onward.
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

// console.log(houseRobberMemo([2, 7, 9, 3, 1]))





