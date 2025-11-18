/*
RECURSION THEORY

Recursion is a technique where a function solves a problem by calling itself. This continues until it reaches a base case which is the simplest possible form of the problem. Once the base case is reached the function returns values back up the call stack.

Base case
The stopping point of recursion. It prevents infinite calls.

Recursive step
The part where the function calls itself with a smaller input.

The call stack
Every recursive call gets placed on the call stack. When the base case returns these calls resolve one by one.

Applications of recursion
Tree traversal
Mathematical computations
Nested structure processing
Backtracking algorithms

Below are several JavaScript examples demonstrating recursion.
*/

// Example 1 Factorial
function factorial(n) {
    if (n === 0) {
        return 1;
    }
    return n * factorial(n - 1);
}
console.log(factorial(5));

// Example 2 Sum from one to n
function sumToN(n) {
    if (n === 1) {
        return 1;
    }
    return n + sumToN(n - 1);
}
console.log(sumToN(10));

// Example 3 Fibonacci
function fibonacci(n) {
    if (n === 0 || n === 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(6));

// Example 4 Countdown
function countDown(n) {
    if (n === 0) {
        console.log("End");
        return;
    }
    console.log(n);
    countDown(n - 1);
}
countDown(5);

// Example 5 Maximum in array
function maxRecursive(arr, index = 0) {
    if (index === arr.length - 1) {
        return arr[index];
    }
    const nextMax = maxRecursive(arr, index + 1);
    return arr[index] > nextMax ? arr[index] : nextMax;
}
console.log(maxRecursive([3, 7, 9, 2, 11, 4]));

// Example 6 Reverse string
function reverseString(str) {
    if (str.length === 0) {
        return "";
    }
    return reverseString(str.slice(1)) + str[0];
}
console.log(reverseString("recursion"));



// Example 1 Iterative Factorial
function factorialIterative(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    console.log(result);
}
factorialIterative(5);

// Example 2 Iterative Sum to N
function sumToNIterative(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    console.log(sum);
}
sumToNIterative(10);

// Example 3 Iterative Fibonacci
function fibonacciIterative(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    let a = 0, b = 1, temp;
    for (let i = 2; i <= n; i++) {
        temp = a + b;
        a = b;
        b = temp;
    }
    console.log(b);
}
fibonacciIterative(6);

// Example 4 Iterative Countdown
function countDownIterative(n) {
    for (let i = n; i > 0; i--) {
        console.log(i);
    }
    console.log("End");
}
countDownIterative(5);

// Example 5 Iterative Maximum in Array
function maxIterative(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    console.log(max);
}
maxIterative([3, 7, 9, 2, 11, 4]);

// Example 6 Iterative Reverse String
function reverseStringIterative(str) {
    let result = "";
    for (let i = str.length - 1; i >= 0; i--) {
        result += str[i];
    }
    console.log(result);
}
reverseStringIterative("recursion");

// Example Print 1 to 10
function printOneToTen(n = 1) {
    if (n > 10) return;
    console.log(n);
    printOneToTen(n + 1);
}
printOneToTen();

// Iterative Print 1 to 10
function printOneToTenIterative() {
    for (let i = 1; i <= 10; i++) {
        console.log(i);
    }
}
printOneToTenIterative();

// Example Print 10 to 1
function printTenToOne(n = 10) {
    if (n < 1) return;
    console.log(n);
    printTenToOne(n - 1);
}
printTenToOne();

// Iterative Print 10 to 1
function printTenToOneIterative() {
    for (let i = 10; i >= 1; i--) {
        console.log(i);
    }
}
printTenToOneIterative();
