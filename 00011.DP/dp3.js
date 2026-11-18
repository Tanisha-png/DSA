// The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is,

//     F(0) = 0, F(1) = 1
// F(n) = F(n - 1) + F(n - 2), for n > 1.
// Given n, calculate F(n).

// Example 1:

// Input: n = 2
// Output: 1
// Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.

// Example 2:
// Input: n = 3
// Output: 2
// Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.

// Example 3:
// Input: n = 4
// Output: 3
// Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.

// i: a number
// o: number

function fibonacci(n) {
    // base case 1
    if (n < 0) {
        throw new Error("n is a non-negative");
    };
    // base case 2
    if (n <= 1) {
        return n;
    }
    // recursive case
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// console.log(fibonacci(6))

// The Tribonacci sequence Tn is defined as follows:

// T0 = 0, T1 = 1, T2 = 1, and Tn + 3 = Tn + Tn + 1 + Tn + 2 for n >= 0.

// Given n, return the value of Tn.

//! Example 1:
// Input: n = 4
// Output: 4
// Explanation:
// T_3 = 0 + 1 + 1 = 2
// T_4 = 1 + 1 + 2 = 4

//! Example 2:
// Input: n = 25
// Output: 1389537

function tribonacci(n) {
    // base cases
    if (n === 1 || n === 2) {
        return 1
    }
    if (n === 0) {
        return 0;
    }
    // recursive case
    return tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3);
}

// console.log(tribonacci(9))

//! You are climbing a staircase. It takes n steps to reach the top.

//! Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top ?



//! Example 1:

// Input: n = 2
// Output: 2
// Explanation: There are two ways to climb to the top.
// 1. 1 step + 1 step
// 2. 2 steps

//! Example 2:

// Input: n = 3
// Output: 3
// Explanation: There are three ways to climb to the top.
// 1. 1 step + 1 step + 1 step
// 2. 1 step + 2 steps
// 3. 2 steps + 1 step

function climbStairs(n) {
    // create a new array with all elements minus one
    const memo = new Array(n+1).fill(-1);

    // calling the function
    function count(i) {
        // base case: check if i is less than or equal to one
        // if the number is less than one or zero, stairs has to be positive (cannot be negative)
        if (i <= 1) {
            return 1;
        }
        // if memo at the current index is not equal to negative one, there's a positive value. we already stored the result. let's use the result
        if (memo[i] !== -1) {
            return memo[i];
        }
        // means how many ways are there: count both ways taking one step vs taking two steps. adding them and then returning them. 
        memo[i] = count(i - 1) + count(i -2);
        return memo[i]
    }
    return count(n)
};

// console.log(climbStairs(4))

//! You are given an integer array cost where cost[i] is the cost of ith step on a staircase.

//! Once you pay the cost, you can either climb one or two steps.

//! You can either start from the step with index 0, or the step with index 1.

//! Return the minimum cost to reach the top of the staircase, which is the position just past the last step(index cost.length).



// Example 1:

// Input: cost = [10, 15, 20]
// Output: 15
// Explanation: You will start at index 1.
//     - Pay 15 and climb two steps to reach the top.
// The total cost is 15.

// Example 2:

// Input: cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
// Output: 6
// Explanation: You will start at index 0.
//     - Pay 1 and climb two steps to reach index 2.
//         - Pay 1 and climb two steps to reach index 4.
//             - Pay 1 and climb two steps to reach index 6.
//                 - Pay 1 and climb one step to reach index 7.
//                     - Pay 1 and climb two steps to reach index 9.
//                         - Pay 1 and climb one step to reach the top.
// The total cost is 6.

function minimumCost(cost) {
    // create a variable and assign it to the length of the array
    const n = cost.length;
    // create an array with all the elements minus one
    const memo = new Array(n+1).fill(-1);
    // call the function
    function solve(i) {
        // base case: check if i is less than or equal to one return zero
        if (i <= 1) {
            return 0;
        }
        // if memo at the current index is not equaled to negative one, 
        // there's a positive value which is already stored
        // let's get the result
        if (memo[i] !== -1) {
            return memo[i];
        }
        memo[i] = Math.min(solve(i - 1) + cost[i - 1], solve(i - 2) + cost[i - 2]);
        return memo[i];
    }
    return solve(n);
}

// console.log(minimumCost([10, 15, 20]))
