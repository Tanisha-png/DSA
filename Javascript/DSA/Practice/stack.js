let stack = [];

stack.push(2)
stack.push(4)
stack.push(8)
stack.push(12)
stack.push(21)
// stack.pop()

// console.log(stack.pop());
console.log(stack);

console.log(stack[stack.length - 1]);

if (stack.length === 0) {
    console.log("Stack is empty")
} else {
    console.log("It is not empty")
};

console.log(stack.length);