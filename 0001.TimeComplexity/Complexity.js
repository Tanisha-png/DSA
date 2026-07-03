// --------------------------------------------
// 📌 Convention in Space Complexity:
// --------------------------------------------
// In many analyses, the input (e.g., the array numbers) is considered part of the problem and not counted in the auxiliary space complexity. If we only consider the extra space used by the algorithm (auxiliary space), the space complexity is O(1).
// If the input space is included (e.g., if the array is created within the algorithm), the total space complexity is O(n).

// --------------------------------------------
// 📌 1. Simple Function with Constant Time Complexity
// --------------------------------------------

console.log("Hello");                // O(1) - Single print operation

// --------------------------------------------
// 📌 2. Single Print Statement
// --------------------------------------------
function printHello() {
    console.log("Hello Printing");      // O(1) - Single print operation
}

console.log("Hello");   // O(1)
printHello();           // O(1)
// Total: O(1) + O(1) = O(1)


// --------------------------------------------
// 📌 3. Loop Calling Function - Linear Time Complexity
// --------------------------------------------

for (let i = 0; i < 10; i++) {           // O(n) - Loop runs n times (n=10)
    printHello();                        // O(1) - Function call
}
// Total: O(n) * O(1) = O(n)


// --------------------------------------------
// 📌 4. Loop with Multiple Operations - Linear Time Complexity
// --------------------------------------------

for (let i = 0; i < 10; i++) {           // O(n) - Loop runs n times (n=10)
    printHello();                        // O(1) - Function call
    let x = 20;                          // O(1) - Assignment
    console.log("Value of x is :", x);   // O(1) - Print operation
    // Inner loop: O(1) + O(1) + O(1) = O(3)
}
// Total: O(n) * O(3) = O(3n) = O(n)


// --------------------------------------------
// 📌 5. Function with Loop - Linear Time Complexity
// --------------------------------------------

function useLoopsForPrinting() {
    for (let i = 0; i < 6; i++) {        // O(n) - Loop runs n times (n=6)
        console.log("I am inside the function"); // O(1) - Print operation
    }
    // Total: O(n) * O(1) = O(n)
}


// --------------------------------------------
// 📌 6. Nested Loop Structure - Quadratic Time Complexity
// --------------------------------------------

for (let i = 0; i < 10; i++) {            // O(n) - Outer loop runs n times (n=10)
    useLoopsForPrinting();                // O(n) - Function with loop
    let x = 20;                           // O(1) - Assignment
    console.log("Value of x is :", x);    // O(1) - Print operation
    // Inner: O(n) + O(1) + O(1) = O(n + 2)
}
// Total: O(n) * O(n + 2) = O(n^2 + 2n) = O(n^2)


// --------------------------------------------
// 📌 7. Sum of Array Elements - Linear Time and Space Complexity
// --------------------------------------------

let sum = 0;                             // O(1) - Variable initialization
let myList = [12, 22, 11, 2, 34, 67, 89, 36]; // O(1) - Array creation, but O(n) space
for (let i = 0; i < myList.length; i++) { // O(n) - Loop runs n times (n=length of array)
    sum += myList[i];                     // O(1) - Addition and assignment
}
console.log(sum);                        // O(1) - Print operation
// Time: O(1) + O(1) + O(n) * O(1) + O(1) = O(n + 3) = O(n)
// Space: O(n) for the array, O(1) for variables = O(n)


// --------------------------------------------
// 📌 8. Nested Loops for Counting - Quadratic Time Complexity
// --------------------------------------------

let count = 0;                           // O(1) - Variable initialization
for (let i = 0; i < 10; i++) {           // O(n) - Outer loop runs n times (n=10)
    for (let j = 0; j < 10; j++) {       // O(n) - Inner loop runs n times (n=10)
        process.stdout.write(count + " "); // O(1) - Print operation (without newline)
        count++;                         // O(1) - Increment
    }
    console.log();                       // O(1) - New line
}
// Time: O(1) + O(n) * (O(n) * (O(1) + O(1)) + O(1))
//     = O(1) + O(n) * (O(n) * O(2) + O(1))
//     = O(1) + O(n) * (O(n) + O(1))
//     = O(1) + O(n^2 + n) = O(n^2)
// Space: O(1) - Only uses a few variables


// --------------------------------------------
// 📌 9. Finding Maximum in Array - Linear Time Complexity
// --------------------------------------------
function findMax(numbers) {
    let maxNum = numbers[0];             // O(1) - Assignment
    for (let num of numbers) {           // O(n) - Loop runs n times (n=length of array)
        if (num > maxNum) {              // O(1) - Comparison
            maxNum = num;                // O(1) - Assignment
        }
    }
    console.log(maxNum);                 // O(1) - Print operation
}
let numbers = [12, 23, 45, 67, 78, 79, 20]; // O(1) - Array creation, but O(n) space
findMax(numbers);                        // O(1) - Function call
// Time: O(1) + O(n) * (O(1) + O(1)) + O(1) + O(1) = O(n + 4) = O(n)
// Space: O(n) for the array, O(1) for variables = O(n)