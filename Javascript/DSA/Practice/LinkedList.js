// Create a function to delete first node in a linked list
function deletedFirst() {
    // Checking to see if the linked list is empty
    if (this.isEmpty()) {
        console.log("List is empty")
        return null;
    }

    // Delete the data stores the value of the node to be deleted
    const deletedData = this.head.data;

    // Updating head to point second node of the linked list as we are deleting first
    this.head = this.head.next;
    this.size--;

    console.log(`Deleted first node (${deletedData})`)

    // Returning deleted node
    return deletedData;
}

function deletedLast() {
    // check if the linked list is empty
    if (this.isEmpty()) {
        console.log("List is empty")
        return null;
    } 

    // check if the next node is strictly equaled to null
    if (this.head.next === null) {
        const deletedData = this.head.data

        this.head = null
        this.size--

        return deletedData;
    }

    // declare the variables temp and previous: cannot move head(create a temp variable)
    let temp = this.head
    let prev = null

    // use a while loop to check if temp.next is not equal to null
    while (temp.next !== null) {
        // reassign prev to temp
        prev = temp
        // reassign temp to temp.next
        temp = temp.next
    }

    prev.next = null
    this.size--

    return deletedData;
}

// Create a function to delete first node in a linked list
function deletedFirst() {
    // Checking to see if the linked list is empty
    if (this.isEmpty) {
        console.log("List is empty")
        return null;
    }

    // deletedData stores the value of the node to be deleted
    const deletedData = this.head.data

    // Updating head to point second node of the linked list as we are deleting first
    this.head = this.head.next

    

    // Returning deleted node
    return deletedData
}

function deletedLast() {
    // Checking if the linked list is empty
    if (this.isEmpty()) {
        console.log("list is empty")
        return null;
    }

    // For one single node
    if(this.head.next === null) {
        // deletedData stores the value of the node to be deleted
        const deletedData = this.head.data
        this.head = null

        return deletedData
    }

    // For more than one node
    let temp = this.head
    let prev = null

    // The while loop will stop once we reached to the end of the linked list
    while (temp.next !== null) {
        prev = temp
        temp = temp.next
    }
    prev.next = null

    return temp.data;
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
