const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.heap = new MaxHeap();
		if (maxSize){
			this.maxSize = maxSize;
		} else {
			this.maxSize = 30;
		}
		this.count = 0;
	}

	push(data, priority) {
		this.heap.push(data, priority);
		this.count++;
		if (this.count > this.maxSize) {
			throw new Error("Error, there are the maxSize");
		}
	}

	shift() {
		if (this.isEmpty()) {
			throw new Error("Error, queue is empty");
		}
		let root = this.heap.pop();
		this.count--;
		return root;
	}

	size() {
		return this.count;
	}

	isEmpty() {
		return (this.count === 0);
	}
}

module.exports = PriorityQueue;
