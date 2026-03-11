// Node class represents each element in the stack
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;      // Points to the next node (below in the stack)
    }
}

class Stack {
    // The constructor doesn't need a parameter; it just initializes an empty stack
    constructor() {
        this.top = null;       // Top of the stack (last added node)
        this.length = 0;       // Track number of elements
    }

    // Push a new value onto the stack
    push(value) {
        const newNode = new Node(value);

        if (!this.top) {
            // Stack is empty, new node becomes the top
            this.top = newNode;
        } else {
            // Link new node to current top, then update top
            newNode.next = this.top;
            this.top = newNode;
        }
        this.length++;
    }

    // Remove and return the top element
    pop() {
        if (!this.top) {
            return null;       // Stack underflow
        }

        const removedElement = this.top;
        this.top = this.top.next;  // Move top down
        this.length--;

        return removedElement.value;
    }

    // Return top value without removing it
    peek() {
        return this.top ? this.top.value : null;
    }

    // Return current size
    size() {
        return this.length;
    }

    // Check if stack is empty
    isEmpty() {
        return this.length === 0;
    }
}

// Example usage
const stack = new Stack();

stack.push(10);
stack.push(100);
stack.push(210);

console.log(stack.peek());    // 210
console.log(stack.pop());     // 210
console.log(stack.peek());    // 100