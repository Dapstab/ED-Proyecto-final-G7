class QElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(element, priority) {
    let qElement = new QElement(element, priority);
    let contain = false;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > qElement.priority) {
        this.items.splice(i, 0, qElement);
        contain = true;
        break;
      }
    }

    if (!contain) {
      this.items.push(qElement);
    }
  }

  isEmpty() {
    return this.items.length <= 0;
  }

  dequeue() {
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }

  front() {
    if (this.isEmpty()) return "No elements in Queue";
    return this.items[0];
  }

  rear() {
    if (this.isEmpty()) return "No elements in Queue";
    return this.items[this.items.length - 1];
  }
}

export const PQ = new PriorityQueue();

// PQ.enqueue("Paula", 1);
// PQ.enqueue("Valentina", 3);
// PQ.enqueue("Juana", 2);
// PQ.enqueue("asdas", 0.2);

// console.log(PQ);
// console.log(`Front: ${PQ.front().element}`);
// console.log(`Dequeue: ${PQ.dequeue().element} \n`);

// console.log(PQ);
