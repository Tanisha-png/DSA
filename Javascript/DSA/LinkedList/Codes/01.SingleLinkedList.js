// Single Linked List -- SLL 

// Node has two elements -- data + pointer (next)
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// Single Linked List Class 
class SingleLinkedList {
    constructor() {
        this.head = null;
        this.size = 0; //optional 
    }
    // Insert -- At Beginning 
    insertAtbegin(data) {
        // Created an object of the Node class 
        // we will it newNode 
        const newNode = new Node(data)

        newNode.next = this.head;
        this.head = newNode;

    }

    // insert at end 
    insertAtEnd(data) {
        const newNode = new Node(data);

        // 
        if (this.isEmpty()) {
            this.head = newNode;

            this.size++
        }

        let temp = this.head;

        while (temp.next != null) {
            // this moves the pointer to the next node 
            temp = temp.next;
        }

        temp.next = newNode;
        this.size++

    }

    insertAtIndex(index, data) {

        if (index < 0 || index > this.size) {
            console.log("Invalid Index")
            return false;
        }

        if (index == 0) {
            this.insertAtbegin(data)
            return true;
        }

        if (index == this.size) {
            this.insertAtEnd(data);
            return true;
        }


        const NewNode = new Node(data);

        let temp = this.head;
        let prev = null;
        let count = 0;

        while (count < index) {

            prev = temp;
            temp = temp.next;
            count++;
        }
        prev.next = newNode;
        newNode.next = temp;
        this.size++;
        return true;

    }

}




