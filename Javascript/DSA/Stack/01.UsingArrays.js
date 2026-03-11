// Stack Implementation using Arrays
// ---------------------------------
// A stack is a linear data structure that supports two main operations:
// - push: add an element to the top
// - pop: remove and return the top element
// Additional helper operations: peek (view top), isEmpty, size.

// Create an empty stack (array)
let stack = [];

// ---------- PUSH operation ----------
// Adds an element to the top (end) of the stack.
// Time complexity: O(1) amortized (array push is usually constant time).
stack.push(10);      // stack: [10]
stack.push(30);      // stack: [10, 30]
stack.push(100);     // stack: [10, 30, 100]
stack.push(130);     // stack: [10, 30, 100, 130]
stack.push(23);      // stack: [10, 30, 100, 130, 23]

console.log("Stack after pushes:", stack);

// ---------- PEEK operation ----------
// Returns the top element without removing it.
// The top is the last element of the array.
function peek(stack) {
    if (stack.length === 0) {
        return null; // or throw an error
    }
    return stack[stack.length - 1];
}

console.log("Top element (peek):", peek(stack)); // 23

// ---------- POP operation ----------
// Removes and returns the top element.
// Time complexity: O(1) (array pop is constant time).
let popped = stack.pop();
console.log("Popped element:", popped);          // 23
console.log("Stack after pop:", stack);          // [10, 30, 100, 130]

// ---------- isEmpty operation ----------
// Checks if the stack has no elements.
function isEmpty(stack) {
    return stack.length === 0;
}

console.log("Is stack empty?", isEmpty(stack));  // false

// ---------- SIZE operation ----------
// Returns the number of elements in the stack.
function size(stack) {
    return stack.length;
}

console.log("Stack size:", size(stack));         // 4

// ---------- Additional example: popping all elements ----------
console.log("\nPopping all elements:");
while (!isEmpty(stack)) {
    console.log("Popped:", stack.pop());
}
console.log("Stack after popping all:", stack);   // []
console.log("Is stack empty now?", isEmpty(stack)); // true