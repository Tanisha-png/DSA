// Sum from 1 to n using recursion
// Question: Write a recursive function that returns the sum of all integers from 1 to n.Assume n is a nonnegative integer.

// i: integer
// o: sum of all integers

function sum(n) {
    // base case
    if (n === 0) return 0;

    // recursive case
    return n + sum(n - 1);
}

// console.log(sum(4));

// 2. Factorial using recursion
// Question: Write a recursive function to calculate n!.Define 0! as 1.

function factorial(n) {
    // base case 1
    if (n < 0) {
        throw new Error("n must be nonnegative");
    }

    // base case 2
    if (n === 0 || n === 1) {
        return 1;
    }

    // recusive case
    return n * factorial(n - 1);
}

// console.log(factorial(5));

// 3. Print numbers from n down to 1
// Question: Use recursion to print n, n - 1, ... 1.

function descending(n) {
    // base case 
    if (n < 1) return;
    // recursive case
    console.log(n);
    descending(n -1);
}

// console.log(descending(10))

// 4. Print numbers from 1 to n
// Question: Use recursion to print 1, 2, ... n without using a loop.

function ascending(n) {
    // base case
    if (n < 1) return;
    // recursive case
    ascending(n - 1);
    console.log(n);
}

// console.log(ascending(5))

// 5. Reverse a string using recursion
// Question: Write a recursive function that returns a reversed string.

function reverseString(string) {
    // base case
    if (string.length <= 1) return string;
    // recursive case
    return reverseString(string.slice(1)) + string[0];
}

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







