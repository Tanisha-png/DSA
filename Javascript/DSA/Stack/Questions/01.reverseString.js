// Tanisha -- ahsinaT

// LIFO -- 

function reverseString(str) {
    const stack = [];
    // T a n i s h a -- pop -- 

    // Taking one char at a time and pushing it to stack
    for (let char of str) {
        stack.push(char);
    }
    console.log(stack.length);
    console.log(stack[stack.length - 1]);

    let reversedString = ""
    while (stack.length > 0) {
        reversedString += stack.pop();
    }
    return reversedString
}

console.log(reverseString("Tanisha"))



// 