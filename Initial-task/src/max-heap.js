const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		//кол-во созданных веток(мах = 2) для каждого эл. из parentNode
		this.parentBranches = [];
		//счётчик эл. в куче
		this.count = 0;
	}

	push(data, priority) {
		var node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if (this.count) {	
			var root = this.detachRoot();
			if (this.count) {
				this.restoreRootFromLastInsertedNode(root);
				this.shiftNodeDown(this.root);
			} 
			return root.data;
		}
	}

	detachRoot() {
		this.count--;
		//убедимся, что в parentNodes присутствует this.root(если есть, то он всегда в 0 позиции)
		let isEqual = true;
		for (var v in this.root) {
			if (this.parentNodes[0][v] !== this.root[v]) {
				isEqual = false;
			}
		}
		var root = this.root;
		if (this.root.left) {
			this.root.left.parent = null
		}
		if (this.root.right) {
			this.root.right.parent = null
		}
		this.root = null;
		if (isEqual) {
			this.parentBranches.shift();
			return this.parentNodes.shift();
		} else {
			return root;
		}
	}

	restoreRootFromLastInsertedNode(detached) {
		let lastNode = this.parentNodes[this.parentNodes.length-1];
		let lastNodeparent = lastNode.parent;
		if (detached.left === lastNode) {
			detached.left = null;
		}
		if (detached.right === lastNode) {
			detached.right = null;
		}

		//если в parentNodes нет lastNodeparent 
		//добавляем в начало parentNodes lastNodeparent
		if (this.parentNodes.indexOf(lastNodeparent) === -1 && lastNodeparent) {
			this.parentNodes.unshift(lastNodeparent);
		}

		if (this.count !== 1) {
			if (lastNodeparent) {
				lastNodeparent.removeChild(lastNode);
			}
			this.root = lastNode;
			this.root.parent = detached.parent;
			this.root.left = detached.left;
			this.root.right = detached.right;
			if (detached.left) {
				detached.left.parent = this.root;
			}
			if (detached.right) {
				detached.right.parent = this.root;
			}
		} else {
			this.root = lastNode;
			this.root.parent = null;
			this.root.left = null;
			this.root.right = null;
		}

		if (!this.root.left) {
			this.parentNodes.unshift(this.root);
			this.parentBranches.unshift(0);
		} else if (!this.root.right) {
			this.parentNodes.unshift(this.root);
			this.parentBranches.unshift(1);
		}
		//удаляем последний вставленный эл., т. к. он уже находится в начале кучи
		this.parentNodes.pop();
		this.parentBranches.pop();
	}

	size() {
		return this.count;
	}

	isEmpty() {
		return (this.count === 0);
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.parentBranches = [];
		this.count = 0;
	}

	insertNode(node) {
		if (!this.count) {
			this.root = node;
			this.parentNodes.push(node);
			this.parentBranches.push(0);			
		} else {
			this.parentNodes[0].appendChild(node);
			this.parentBranches[0]++;
			this.parentNodes.push(node);
			this.parentBranches.push(0);
			if (this.parentBranches[0] === 2) {
				this.parentNodes.shift();
				this.parentBranches.shift();
			}	
		}
		this.count++;
	}

	shiftNodeUp(node) {
		if (node.parent && node.priority > node.parent.priority) {
			if (node.parent === this.root) {
				//если нужно, меняем корень
				this.root = node;
			}
			this.replaceNode(node.parent, node);
			node.swapWithParent();
			this.shiftNodeUp(node);
		} 
	}

	shiftNodeDown(node) {
		if (node.left && node.priority < node.left.priority) {
			if (node === this.root) {
				//если нужно, меняем корень
				this.root = node.left;
			}
			this.replaceNode(node, node.left);
			node.left.swapWithParent();
			this.shiftNodeDown(node);
		} else if (node.right && node.priority < node.right.priority) {
			if (node === this.root) {						
				this.root = node.right;
			}
			this.replaceNode(node, node.right);
			node.right.swapWithParent();
			this.shiftNodeDown(node);
		} 
		if ((!node.left || node.left.priority < node.priority)  && 
			(!node.right || node.right.priority < node.priority) &&
			this.root.right && this.root.right.priority > this.root.priority) {
				//если node находится в нужном месте и this.root.priority не самый большой в куче,
				//запустим местод ещё раз, чтобы проверить правое поддерево
				this.shiftNodeDown(this.root);
		}
	}

	replaceNode(node, childNode) {
		//parentNodesHasNode проверяет есть ли в parentNodes узел node 
		//parentNodesHasNewNode проверяет есть ли в parentNodes узел childNode
		let parentNodesHasNode = true;
		let parentNodesHasNewNode = true;
		for (var i = 0; i < this.parentNodes.length; i++) {
			//сравнение объектов
			for (const property in node) {
				if (this.parentNodes[i][property] !== node[property]) {
					parentNodesHasNode = false;
				}
				if (this.parentNodes[i][property] !== childNode[property]) {
					parentNodesHasNewNode = false;
				}
			}
			//если parentNodesHasNode=true, меняем на i-ый узел на childNode
			//если parentNodesHasNewNode=true, меняем на i-ый узел на node
			if (parentNodesHasNode) { 
				this.parentNodes[i] = childNode;
			}
			if (parentNodesHasNewNode) { 
				this.parentNodes[i] = node;
			}
			parentNodesHasNode = true;
			parentNodesHasNewNode = true;
		}
	}
}

module.exports = MaxHeap;
