/*
==========================================================
ITERATIVE VS RECURSIVE PROGRAMMING IN JAVASCRIPT
==========================================================
 
There are two common ways to solve programming problems:
 
1. Iterative Approach (Using Loops)
2. Recursive Approach (Using Functions Calling Themselves)
 
----------------------------------------------------------
1. ITERATIVE APPROACH
----------------------------------------------------------
 
Definition:
An iterative solution uses loops such as:
    for
    while
    do...while
 
The loop keeps repeating until its condition becomes false.
 
Characteristics:
    • Has a starting point
    • Has a stopping condition
    • Automatically updates the loop variable
    • Usually uses less memory than recursion
 
Real World Example:
Imagine climbing 10 stairs.
 
You move:
Step 1
Step 2
Step 3
...
Step 10
 
You are repeating the same action again and again.
That is iteration.
 
----------------------------------------------------------
2. RECURSIVE APPROACH
----------------------------------------------------------
 
Definition:
A recursive function is a function that calls itself until
a stopping condition (called the Base Condition) is reached.
 
Every recursive solution should have:
 
    1. Base Condition
       Prevents infinite recursion.
 
    2. Recursive Call
       Calls itself with a smaller or modified problem.
 
Example:
Think of Russian nesting dolls.
Each doll contains a smaller version of itself.
 
----------------------------------------------------------
LOOPS VS RECURSION
----------------------------------------------------------
 
Loops:
    • Uses for/while/do-while
    • Automatic increment/decrement
    • Better memory usage
    • Usually faster
 
Recursion:
    • Uses functions
    • Parameters control progress
    • Requires a Base Condition
    • Function calls itself repeatedly
    • Uses the call stack
 
==========================================================
EXAMPLE 1 : PRINT NUMBERS FROM 1 TO 10
==========================================================
*/

console.log("------- Using Loops ------");

// Loop knows:
// Start = 1
// End = 10
// Increment = i++
for (let i = 1; i <= 10; i++) {
    console.log(i);
}

console.log("------- Using Recursion ------");

/*
Flow:

PrintNumbers(1)
PrintNumbers(2)
PrintNumbers(3)
...
PrintNumbers(10)
PrintNumbers(11) -> Base Condition -> Stop
*/

function PrintNumbers(n) {
    // Base Condition
    if (n > 10) {
        return;
    }

    // console.log(n);

    // Recursive Call
    PrintNumbers(n + 1);
    console.log(n);
}

PrintNumbers(1);

/*
==========================================================
EXAMPLE 2 : PRINT NUMBERS FROM 10 TO 1
==========================================================
*/

console.log("----- Using Loops - Descending Order -----");

// Start from 10
// Keep decreasing until 1
for (let i = 10; i >= 1; i--) {
    console.log(i);
}

console.log("----- Using Recursion - Descending Order -----");

/*
Flow:

DescNumbers(10)
DescNumbers(9)
DescNumbers(8)
...
DescNumbers(1)
DescNumbers(0) -> Stop
*/

function DescNumbers(n) {
    // Base Condition
    if (n < 1) {
        return;
    }

    console.log(n);

    // Recursive Call
    DescNumbers(n - 1);
}

DescNumbers(10);

/*
==========================================================
EXAMPLE 3 : SUM OF FIRST 20 NATURAL NUMBERS
==========================================================
*/

console.log("----- Sum Using Loop -----");

let sum = 0;

for (let i = 1; i <= 20; i++) {
    sum += i;
}

console.log("Iterative Sum :", sum);

console.log("----- Sum Using Recursion -----");

/*
Calculation:

AddNumbers(1)
= 1 + AddNumbers(2)

= 1 + 2 + AddNumbers(3)

...

= 1 + 2 + 3 + ... + 20 + AddNumbers(21)

AddNumbers(21)
returns 0

Final Answer:
210
*/

function AddNumbers(n) {
    // Base Condition
    if (n > 20) {
        return 0;
    }

    return n + AddNumbers(n + 1);
}

console.log("Recursive Sum :", AddNumbers(1));

/*
==========================================================
EXAMPLE 4 : FACTORIAL
==========================================================

Definition:

5!
=
5 × 4 × 3 × 2 × 1
=
120

Recursive Formula:

factorial(n)
=
n × factorial(n-1)

Base Case:

factorial(0) = 1
factorial(1) = 1
*/

function FactorialRec(num) {
    if (num < 0) {
        return;
    }

    // Base Condition
    if (num === 0 || num === 1) {
        return 1;
    }

    // Recursive Call
    return num * FactorialRec(num - 1);
}

console.log("Factorial of 5 :", FactorialRec(5));

/*
Call Stack:

FactorialRec(5)
= 5 * FactorialRec(4)

= 5 * 4 * FactorialRec(3)

= 5 * 4 * 3 * FactorialRec(2)

= 5 * 4 * 3 * 2 * FactorialRec(1)

= 5 * 4 * 3 * 2 * 1

= 120
*/

/*
==========================================================
EXAMPLE 5 : FIBONACCI SERIES
==========================================================

Series:

0 1 1 2 3 5 8 13 21 ...

Rule:

fib(n)
=
fib(n-1) + fib(n-2)

Base Cases:

fib(0) = 0
fib(1) = 1
*/

function fibonacci(n) {
    // Base Condition
    if (n <= 1) {
        return n;
    }

    // Recursive Calls
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Printing first n Fibonacci numbers
let n = 10;

console.log("First 10 Fibonacci Numbers:");

for (let i = 0; i < n; i++) {
    console.log(fibonacci(i));
}

/*
Example:

fibonacci(5)

=
fibonacci(4) + fibonacci(3)

=
(fibonacci(3) + fibonacci(2))
+
(fibonacci(2) + fibonacci(1))

Eventually becomes:

5
*/

/*
==========================================================
EXAMPLE 6 : POWER OF A NUMBER
==========================================================

Formula:

base^exponent

Example:

2^3

=
2 × 2 × 2

=
8

Recursive Formula:

power(base, exponent)

=
base × power(base, exponent - 1)

Base Condition:

Anything raised to power 0 equals 1.
*/

function power(base, exponent) {
    // Base Condition
    if (exponent === 0) {
        return 1;
    }

    // Recursive Call
    return base * power(base, exponent - 1);
}

console.log("2^3 =", power(2, 3));

/*
Call Flow:

power(2, 3)

=
2 * power(2, 2)

=
2 * 2 * power(2, 1)

=
2 * 2 * 2 * power(2, 0)

=
2 * 2 * 2 * 1

=
8
*/
/*
==========================================================
WHEN SHOULD YOU USE LOOPS?
==========================================================

Use loops when:
    • You know how many times to repeat
    • Simple counting tasks
    • Better performance is needed
    • Lower memory usage is preferred

Examples:
    • Print numbers
    • Traverse arrays
    • Count occurrences

==========================================================
WHEN SHOULD YOU USE RECURSION?
==========================================================

Use recursion when:
    • A problem can be broken into smaller versions of itself
    • Tree traversal
    • Graph traversal
    • Divide and conquer algorithms
    • Backtracking problems

Examples:
    • Factorial
    • Fibonacci
    • Tower of Hanoi
    • DFS
    • Binary Tree Traversal
    • Merge Sort
    • Quick Sort

Iteration:
    Repeat using loops.

Recursion:
    Solve the problem by calling the same function repeatedly
    until a Base Condition is reached.
*/

















