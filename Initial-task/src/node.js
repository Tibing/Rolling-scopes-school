class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!this.left) {
			this.left = node;
			node.parent = this;
		} else if (!this.right) {
			this.right = node;
			node.parent = this;
		} 
	}

	removeChild(node) {
		if (this.left === node) {
			node.parent = null;
			this.left = null;
		} else if (this.right === node) {
			node.parent = null;
			this.right = null;
		} else {
			throw new Error("Error, there's no this node child");
		}
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent) {
			// сохраним данные родителя
			let p = this.parent;
			let pright = p.right;
			let pleft = p.left;
			let pparent = p.parent;

			if (pparent) {
				if ( pparent.left === this.parent) {
					pparent.left = this;
				}else if (pparent.right === this.parent) {
					pparent.right = this;
				}
			}
			if (this.left) {
				this.left.parent = p;
			}
			if (this.right) {
				this.right.parent = p;
			}
			this.parent.parent = this;
			this.parent.left = this.left;
			this.parent.right = this.right;

			//проверим с каким поддеревом обмен
			if (pright === this) {
				// если есть поддерево такого же уровня - меняем ссылку на предка
				if (pleft) {
					pleft.parent = this;
				}
				this.left = pleft;
				this.right = p;
				this.parent = pparent;
			} else if (pleft === this) {
				if (pright) {
					pright.parent = this;
				}
				this.left = p;
				this.right = pright;
				this.parent = pparent;
			}

		}
	}
}

module.exports = Node;
