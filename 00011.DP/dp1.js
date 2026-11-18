// Sum from 1 to n using recursion
// Question: Write a recursive function that returns the sum of all integers from 1 to n.Assume n is a nonnegative integer.

// i: integer
// o: sum of all integers

// function sum(n) {
//     // base case
//     if (n === 0) return 0;

//     // recursive case
//     return n + sum(n - 1);
// }

// console.log(sum(4));

// 2. Factorial using recursion
// Question: Write a recursive function to calculate n!.Define 0! as 1.

// function factorial(n) {
//     // base case 1
//     if (n < 0) {
//         throw new Error("n must be nonnegative");
//     }

//     // base case 2
//     if (n === 0 || n === 1) {
//         return 1;
//     }

//     // recusive case
//     return n * factorial(n - 1);
// }

// console.log(factorial(5));

// 3. Print numbers from n down to 1
// Question: Use recursion to print n, n - 1, ... 1.

// function descending(n) {
//     // base case 
//     if (n < 1) return;
//     // recursive case
//     console.log(n);
//     descending(n -1);
// }

// console.log(descending(10))

// 4. Print numbers from 1 to n
// Question: Use recursion to print 1, 2, ... n without using a loop.

// function ascending(n) {
//     // base case
//     if (n < 1) return;
//     // recursive case
//     ascending(n - 1);
//     console.log(n);
// }

// console.log(ascending(5))

// 5. Reverse a string using recursion
// Question: Write a recursive function that returns a reversed string.

// function reverseString(string) {
//     // base case
//     if (string.length <= 1) return string;
//     // recursive case
//     return reverseString(string.slice(1)) + string[0];
// }

// console.log(reverseString("codesmith"))

// 6. Find the nth Fibonacci number using plain recursion
// Question: Use F(0) = 0, F(1) = 1, and F(n) = F(n - 1) + F(n - 2).

// function fibonacci(n) {
//     // base case 1
//     if (n < 0) {
//         throw new Error("n is a nonnegative integer")
//     }

//     // Base case 2
//     if (n <= 1) return n;
//     // recursive case
//     return fibonacci(n - 1) + fibonacci(n - 2);
// }

// console.log(fibonacci(6))

//? 8. Fibonacci using memoization
//? Question: Improve recursive Fibonacci by storing results that have already been calculated.

// function fibonacci(n, memo = {}) {
//     // Base case 1
//     if (n < 0) {
//         throw new Error("n is a nonnegative integer");
//     }
//     // Base Case 2
//     if (n <= 1) {
//         return n;
//     }
//     // Base case 3
//     if (memo[n] !== undefined) {
//         return memo[n];
//     }

//     // recursive case
//     memo[n] = fibonacci(n -1, memo) + fibonacci(n - 2, memo);
//     return memo[n]
// }

// console.log(fibonacci(10));

//? 11. Climbing stairs using recursion
//? Question: A person can climb either one or two stairs at a time. Return the number of different ways to reach stair n.

// i: number
// o: number of ways to reach stair n

// function climbStairs(n) {
//     // base case 1
//     if (n < 0) {
//         return 0;
//     }

//     // base case 2
//     if (n === 0) {
//         return 1;
//     }

//     // recursive case
//     return climbStairs(n - 1) + climbStairs(n - 2);
// }

// console.log(climbStairs(4));

//? 12. Climbing stairs using memoization
//? Question: Optimize the climbing stairs solution by remembering the answer for each stair number.

// function climbStairs(n, memo = {}) {
//     // base case 1
//     if (n < 0) {
//         return 0;
//     };
//     // base case 2
//     if (n === 0) {
//         return 1;
//     };
//     // base case 3
//     if (memo[n] !== undefined) {
//         return memo[n]
//     };
//     // recursive case
//     memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
//     return memo[n];
// }

// console.log(climbStairs(5));


//! Q1. Write a recursive Fibonacci function.

function fibonacci(n) {
    // base case 1
    if (n < 0) throw new Error("n must be a non-negative");
    // base case 2
    if (n <= 1) return n

    // recursive case
    return fibonacci(n - 1) + fibonacci(n -2);
}

// console.log(fibonacci(6));

//! Q2. Improve Fibonacci using memoization.

function fibonacci(n, memo={}) {
    // base case 1
    if (n < 0) throw new Error("n must be a non-negative");
    // base case 2
    if (n <= 1) return n;

    // base case 3
    if (memo[n] !== undefined) return memo[n]
    // recusive case
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}

// console.log(fibonacci(6));

//!A person can climb one or two steps. How many ways are there to reach step n?

function climbStairs(n) {
    // base case 1
    if (n < 0) return 0;
    // base case 2
    if (n === 0) return 1;

    // recursive case
    return climbStairs(n - 1) + climbStairs(n - 2);
}

// console.log(climbStairs(4));

//! Q6. House Robber: maximize money without robbing adjacent houses.

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

// console.log(rob([2,7,9,3,1]));
// console.log(rob([]))

//!Q7. Determine whether some positive integers add up to a target.

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

// console.log(subsetSum([3,4,5], 9))
// console.log(subsetSum([3,4,5], 2))

//! Q9. Maximize item value without exceeding capacity. Each item can be used once.

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
    return dp[capacity]
}

// console.log(knapsack([1,3,4], [15,20,30], 4));

//! Q10. Find the minimum number of coins needed to make an amount.

function minCoins(coins, amount) {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let current = 1; current <= amount; current++) {
        for (const coin of coins) {
            if (coin <= current) {
                dp[current] = Math.min(dp[current], dp[current - coin] + 1);
            }
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}

// console.log(minCoins([1,2,5], 11))
// console.log(minCoins([2], 3))



