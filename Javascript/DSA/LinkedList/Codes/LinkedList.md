# Linked List Basics in JavaScript

## 1. What is a Linked List?
A Linked List is a linear data structure where elements are connected using links.

Unlike arrays:
1. Elements are not stored in continuous memory locations.
2. Each element points to the next element.
3. Size can grow dynamically.
4. Insertion and deletion are easier compared to arrays.

A Linked List is made up of small units called Nodes.
---

# 2. What is a Node?

A Node is the basic building block of a Linked List.

Each node contains:

1. Data
2. Pointer (Reference to next node)

Example:

```text
[10 | next] -> [20 | next] -> [30 | null]
```

Explanation:

1. First node stores value 10
2. Second node stores value 20
3. Third node stores value 30
4. Last node points to null because there is no next node

---

# 3. What is Data?

Data is the actual value stored inside a node.

Example:

```text
[50 | next]
```

Here:

1. 50 is the data
2. next stores the address/reference of another node

---

# 4. What is a Pointer?

A Pointer stores the reference to another node.

In JavaScript, we do not directly use memory addresses like C or C++.

Instead:

1. Objects store references to other objects.
2. That reference behaves like a pointer.

Example:

```javascript
node1.next = node2;
```

Meaning:

1. node1 is connected to node2
2. next stores reference of node2

---

# 5. Structure of a Node in JavaScript

```javascript
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
```

---

# 6. Line by Line Explanation of Node Class

```javascript
class Node {
```

Explanation:

1. Creates a class named Node
2. This class is used to create nodes

---

```javascript
constructor(data) {
```

Explanation:

1. Constructor runs automatically when object is created
2. Receives data value

---

```javascript
this.data = data;
```

Explanation:

1. Stores actual value inside node
2. Left side is node property
3. Right side is incoming value

---

```javascript
this.next = null;
```

Explanation:

1. next stores reference of next node
2. Initially no next node exists
3. So value is null

---

```javascript
}
```

Explanation:

1. Ends constructor
2. Ends class definition

---

# 7. Creating a Single Node

```javascript
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

let node1 = new Node(10);

console.log(node1);
```

Output:

```text
Node { data: 10, next: null }
```

---

# 8. What is a Linked List Class?

A Linked List class manages:

1. Head node
2. Insertions
3. Deletions
4. Traversing
5. Other operations

---

# 9. Creating a Linked List Class

```javascript
class LinkedList {
    constructor() {
        this.head = null;
    }
}
```

---

# 10. Line by Line Explanation of Linked List Class

```javascript
class LinkedList {
```

Explanation:

1. Creates LinkedList class
2. Used to manage all nodes

---

```javascript
constructor() {
```

Explanation:

1. Constructor runs automatically
2. Initializes linked list

---

```javascript
this.head = null;
```

Explanation:

1. head stores first node of linked list
2. Initially linked list is empty
3. Therefore head is null

---

# 11. Complete Basic Linked List Setup

```javascript
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }
}

let list = new LinkedList();

console.log(list);
```

Output:

```text
LinkedList { head: null }
```

---

# 12. Adding Node at Beginning

## Full Code

```javascript
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    addAtBeginning(data) {
        let newNode = new Node(data);

        newNode.next = this.head;

        this.head = newNode;
    }
}

let list = new LinkedList();

list.addAtBeginning(10);
list.addAtBeginning(20);
list.addAtBeginning(30);

console.log(list);
```

---

# 13. Line by Line Explanation of addAtBeginning()

```javascript
addAtBeginning(data) {
```

Explanation:

1. Creates function to insert node at beginning
2. Receives data value

---

```javascript
let newNode = new Node(data);
```

Explanation:

1. Creates new node
2. Stores given value

---

```javascript
newNode.next = this.head;
```

Explanation:

1. New node points to current first node
2. Existing list becomes connected after new node

Example:

Before:

```text
10 -> 20 -> null
```

After inserting 5:

```text
5 -> 10 -> 20 -> null
```

---

```javascript
this.head = newNode;
```

Explanation:

1. Head moves to new node
2. New node becomes first node

---

# 14. Adding Node at End

## Full Code

```javascript
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    addAtEnd(data) {
        let newNode = new Node(data);

        if (this.head === null) {
            this.head = newNode;
            return;
        }

        let current = this.head;

        while (current.next !== null) {
            current = current.next;
        }

        current.next = newNode;
    }
}

let list = new LinkedList();

list.addAtEnd(10);
list.addAtEnd(20);
list.addAtEnd(30);

console.log(list);
```

---

# 15. Line by Line Explanation of addAtEnd()

```javascript
addAtEnd(data) {
```

Explanation:

1. Function inserts node at end
2. Receives data value

---

```javascript
let newNode = new Node(data);
```

Explanation:

1. Creates new node
2. Stores value inside node

---

```javascript
if (this.head === null) {
```

Explanation:

1. Checks whether linked list is empty

---

```javascript
this.head = newNode;
```

Explanation:

1. If list is empty
2. New node becomes first node

---

```javascript
return;
```

Explanation:

1. Stops function execution
2. No further work required

---

```javascript
let current = this.head;
```

Explanation:

1. Creates temporary variable
2. Starts traversal from first node

---

```javascript
while (current.next !== null) {
```

Explanation:

1. Loop continues until last node
2. Last node has next as null

---

```javascript
current = current.next;
```

Explanation:

1. Moves to next node
2. Traverses linked list

---

```javascript
current.next = newNode;
```

Explanation:

1. Last node now points to new node
2. Node inserted at end

---

# 16. Adding Node in Middle

## Full Code

```javascript
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    addAtEnd(data) {
        let newNode = new Node(data);

        if (this.head === null) {
            this.head = newNode;
            return;
        }

        let current = this.head;

        while (current.next !== null) {
            current = current.next;
        }

        current.next = newNode;
    }

    addAtPosition(data, position) {
        let newNode = new Node(data);

        if (position === 0) {
            newNode.next = this.head;
            this.head = newNode;
            return;
        }

        let current = this.head;
        let previous = null;
        let index = 0;

        while (index < position) {
            previous = current;
            current = current.next;
            index++;
        }

        previous.next = newNode;
        newNode.next = current;
    }
}

let list = new LinkedList();

list.addAtEnd(10);
list.addAtEnd(20);
list.addAtEnd(40);

list.addAtPosition(30, 2);

console.log(list);
```

---

# 17. Line by Line Explanation of addAtPosition()

```javascript
addAtPosition(data, position) {
```

Explanation:

1. Function inserts node at specific position
2. Receives data and position

---

```javascript
let newNode = new Node(data);
```

Explanation:

1. Creates new node
2. Stores given value

---

```javascript
if (position === 0) {
```

Explanation:

1. Checks whether insertion is at beginning

---

```javascript
newNode.next = this.head;
```

Explanation:

1. New node points to current first node

---

```javascript
this.head = newNode;
```

Explanation:

1. New node becomes first node

---

```javascript
return;
```

Explanation:

1. Stops execution
2. No further traversal required

---

```javascript
let current = this.head;
```

Explanation:

1. Used for traversal
2. Starts from first node

---

```javascript
let previous = null;
```

Explanation:

1. Stores previous node
2. Helps reconnect nodes

---

```javascript
let index = 0;
```

Explanation:

1. Tracks current position

---

```javascript
while (index < position) {
```

Explanation:

1. Traverses until desired position

---

```javascript
previous = current;
```

Explanation:

1. Stores current node as previous node

---

```javascript
current = current.next;
```

Explanation:

1. Moves forward in linked list

---

```javascript
index++;
```

Explanation:

1. Increases index value

---

```javascript
previous.next = newNode;
```

Explanation:

1. Previous node connects to new node

---

```javascript
newNode.next = current;
```

Explanation:

1. New node connects to next node
2. Insertion completed

---

# 18. Visual Representation of Middle Insertion

Before:

```text
10 -> 20 -> 40 -> null
```

Insert 30 at position 2:

```text
10 -> 20 -> 30 -> 40 -> null
```

---

# 19. Traversing a Linked List

## Full Code

```javascript
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    addAtEnd(data) {
        let newNode = new Node(data);

        if (this.head === null) {
            this.head = newNode;
            return;
        }

        let current = this.head;

        while (current.next !== null) {
            current = current.next;
        }

        current.next = newNode;
    }

    display() {
        let current = this.head;

        while (current !== null) {
            console.log(current.data);
            current = current.next;
        }
    }
}

let list = new LinkedList();

list.addAtEnd(10);
list.addAtEnd(20);
list.addAtEnd(30);

list.display();
```

---

# 20. Line by Line Explanation of display()

```javascript
display() {
```

Explanation:

1. Function prints all nodes

---

```javascript
let current = this.head;
```

Explanation:

1. Starts traversal from head node

---

```javascript
while (current !== null) {
```

Explanation:

1. Continue until last node
2. Stops when current becomes null

---

```javascript
console.log(current.data);
```

Explanation:

1. Prints node data

---

```javascript
current = current.next;
```

Explanation:

1. Moves to next node
2. Traverses complete linked list

---

# 21. Final Revision Notes

## Important Terms

| Term           | Meaning                       |
| -------------- | ----------------------------- |
| Node           | Basic unit of linked list     |
| Data           | Actual value stored           |
| Pointer / next | Stores reference of next node |
| Head           | First node of linked list     |
| Null           | No next node exists           |
| Traversal      | Visiting all nodes            |

---

# 22. Advantages of Linked List
1. Dynamic size
2. Easy insertion
3. Easy deletion
4. Memory efficient for dynamic data
---
# 23. Disadvantages of Linked List
1. Extra memory needed for pointers
2. Sequential access only
3. Slower searching compared to arrays
4. Traversal required to access middle elements
---

