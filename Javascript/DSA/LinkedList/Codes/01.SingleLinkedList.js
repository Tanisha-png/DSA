// =====================================
// Singly Linked List (SLL)
// =====================================

// Node Class
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// Singly Linked List Class
class SingleLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // =========================
    // Utility Functions
    // =========================

    isEmpty() {
        return this.head === null;
    }

    getSize() {
        return this.size;
    }

    // =========================
    // Insert Operations
    // =========================

    insertAtBegin(data) {
        const newNode = new Node(data);

        newNode.next = this.head;
        this.head = newNode;

        this.size++;

        console.log(`${data} inserted at beginning`);
    }

    insertAtEnd(data) {
        const newNode = new Node(data);

        if (this.isEmpty()) {
            this.head = newNode;
            this.size++;

            console.log(`${data} inserted at end`);
            return;
        }

        let temp = this.head;

        while (temp.next !== null) {
            temp = temp.next;
        }

        temp.next = newNode;

        this.size++;

        console.log(`${data} inserted at end`);
    }

    insertAtPosition(position, data) {
        if (position < 0 || position > this.size) {
            console.log("Invalid Position");
            return false;
        }

        if (position === 0) {
            this.insertAtBegin(data);
            return true;
        }

        if (position === this.size) {
            this.insertAtEnd(data);
            return true;
        }

        const newNode = new Node(data);

        let temp = this.head;
        let prev = null;
        let count = 0;

        while (count < position) {
            prev = temp;
            temp = temp.next;
            count++;
        }

        prev.next = newNode;
        newNode.next = temp;

        this.size++;

        console.log(
            `${data} inserted at position ${position}`
        );

        return true;
    }

    // =========================
    // Delete Operations
    // =========================

    deleteFirst() {
        if (this.isEmpty()) {
            console.log("List is empty");
            return null;
        }

        const deletedData = this.head.data;

        this.head = this.head.next;
        this.size--;

        console.log(
            `Deleted first node (${deletedData})`
        );

        return deletedData;
    }

    deleteLast() {
        if (this.isEmpty()) {
            console.log("List is empty");
            return null;
        }

        if (this.head.next === null) {
            const deletedData = this.head.data;

            this.head = null;
            this.size--;

            console.log(
                `Deleted last node (${deletedData})`
            );

            return deletedData;
        }

        let temp = this.head;
        let prev = null;

        while (temp.next !== null) {
            prev = temp;
            temp = temp.next;
        }

        prev.next = null;
        this.size--;

        console.log(
            `Deleted last node (${temp.data})`
        );

        return temp.data;
    }

    deleteAtPosition(position) {
        if (this.isEmpty()) {
            console.log("List is empty");
            return null;
        }

        if (
            position < 0 ||
            position >= this.size
        ) {
            console.log("Invalid Position");
            return null;
        }

        if (position === 0) {
            return this.deleteFirst();
        }

        let temp = this.head;
        let prev = null;
        let count = 0;

        while (count < position) {
            prev = temp;
            temp = temp.next;
            count++;
        }

        prev.next = temp.next;

        this.size--;

        console.log(
            `Deleted node (${temp.data}) at position ${position}`
        );

        return temp.data;
    }

    deleteByValue(value) {
        if (this.isEmpty()) {
            console.log("List is empty");
            return false;
        }

        if (this.head.data === value) {
            this.head = this.head.next;
            this.size--;

            console.log(`Deleted value ${value}`);
            return true;
        }

        let temp = this.head;
        let prev = null;

        while (
            temp !== null &&
            temp.data !== value
        ) {
            prev = temp;
            temp = temp.next;
        }

        if (temp === null) {
            console.log(
                `Value ${value} not found`
            );
            return false;
        }

        prev.next = temp.next;
        this.size--;

        console.log(`Deleted value ${value}`);

        return true;
    }

    // =========================
    // Search
    // =========================

    search(value) {
        if (this.isEmpty()) {
            console.log("List is empty");
            return -1;
        }

        let temp = this.head;
        let index = 0;

        while (temp !== null) {
            if (temp.data === value) {
                console.log(
                    `${value} found at index ${index}`
                );
                return index;
            }

            temp = temp.next;
            index++;
        }

        console.log(
            `${value} not found in list`
        );

        return -1;
    }

    // =========================
    // Traversal
    // =========================

    traverse() {
        if (this.isEmpty()) {
            console.log("List is empty");
            return;
        }

        let temp = this.head;

        console.log("Traversing List:");

        while (temp !== null) {
            console.log(temp.data);
            temp = temp.next;
        }
    }

    // =========================
    // Print List
    // =========================

    printList() {
        if (this.isEmpty()) {
            console.log("HEAD -> NULL");
            return;
        }

        let temp = this.head;
        let result = "HEAD -> ";

        while (temp !== null) {
            result += temp.data + " -> ";
            temp = temp.next;
        }

        result += "NULL";

        console.log(result);
    }

    // =========================
    // Print Size
    // =========================

    printSize() {
        console.log(
            `Current Size : ${this.size}`
        );
    }
}

// =====================================
// Driver Code
// =====================================

const list = new SingleLinkedList();

console.log("\n===== INSERT =====");

list.insertAtBegin(30);
list.insertAtBegin(20);
list.insertAtBegin(10);

list.insertAtEnd(40);
list.insertAtEnd(50);

list.insertAtPosition(2, 25);

list.printList();

console.log("\n===== SEARCH =====");

list.search(25);
list.search(100);

console.log("\n===== TRAVERSE =====");

list.traverse();

console.log("\n===== SIZE =====");

list.printSize();

console.log("\n===== DELETE FIRST =====");

list.deleteFirst();
list.printList();

console.log("\n===== DELETE LAST =====");

list.deleteLast();
list.printList();

console.log("\n===== DELETE POSITION =====");

list.deleteAtPosition(2);
list.printList();

console.log("\n===== DELETE VALUE =====");

list.deleteByValue(30);
list.printList();

console.log("\n===== FINAL SIZE =====");

list.printSize();