function dollorFn(arg) {
	return new jQueryObject(arg);
}

function jQueryObject(selector){
   this.selector =  selector;
   this.nodeList = document.querySelectorAll(this.selector);
   return this;
}; 

jQueryObject.prototype.addClass = function(classes) {
	for (let i = 0; i < this.nodeList.length; i++) {
		if (typeof classes === 'function') {
			let thisClassList = this.nodeList[i].classList;
			for (var j = 0; j < thisClassList.length; j++) {
				let newClasses = classes(i, thisClassList[j]);
				if (newClasses) {
					newClasses.split(' ').forEach(c => this.nodeList[i].classList.add(c));
				}
			}
		} else {
			classes.split(' ').forEach(c => this.nodeList[i].classList.add(c));
		}
	}
	return this;
}

jQueryObject.prototype.attr = function(attrName, value) {
	for (let i = 0; i < this.nodeList.length; i++) {
		if (value) {
			this.nodeList[i].setAttribute(attrName, value);
		} else {
			return this.nodeList[i].getAttribute(attrName);
		}
	}
	return this; 
}

jQueryObject.prototype.children = function(selector) {
	let selectedArr = [];

	for (let i = 0; i < this.nodeList.length; i++) {
		let allChildren = this.nodeList[i].childNodes;
		for (let j = 0; j < allChildren.length; j++) {
			if (!selector || allChildren[j].matches(selector)) {
				selectedArr.push(allChildren[j]);
			}
		}
	}
	return selectedArr; 
}

jQueryObject.prototype.css = function(property) {
	for (let i = 0; i < this.nodeList.length; i++) {
		if (typeof property === 'object') {
			for (let p in property) {
				this.nodeList[i].style[p] = property[p];
			}
		} else {
			return window.getComputedStyle(this.nodeList[i]).getPropertyValue(property);
		}
	}
}

jQueryObject.prototype.each = function(func) {
	for (let i = 0; i < this.nodeList.length; i++) {
		if (func.call(this.nodeList[i], i, this.nodeList[i]) === false) {
			break;
		} 
	}
	return this;
}

jQueryObject.prototype.append = function(content) {
	let child = content;

	for (let i = 0; i < this.nodeList.length; i++) {
		if (typeof content === 'string') {
			let template = document.createElement('template');
			template.innerHTML = content;
			while (template.childNodes.length > 0) {
					this.nodeList[i].appendChild(template.childNodes[0]);
			}
		} else {
			this.nodeList[i].appendChild(child);
			child = child.cloneNode(true);
		}

	}
	return this;
}

jQueryObject.prototype.html = function(htmlString) {
	for (let i = 0; i < this.nodeList.length; i++) {
		if (htmlString) {
			this.nodeList[i].innerHTML = htmlString;
		} else {
			return this.nodeList[i].innerHTML;
		}
	}
	return this;
}

jQueryObject.prototype.data = function(key, value) {
	for (let i = 0; i < this.nodeList.length; i++) {
		if (value) {
			this.nodeList[i].dataset[key] = value;
		} else if (key) {
			if (typeof key === 'object') {
				for (let k in key) {
					this.nodeList[i].dataset[k] = key[k];
				}
			} else {
				if (this.nodeList[i].dataset[key]) {
					return this.nodeList[i].dataset[key];
				}
			}
		} else {
			return this.nodeList[i].dataset;
		}
	}
}

jQueryObject.prototype.on = function(event, selector, callback) {
	function hendler(e) {
		if (e.target.matches(selector)) {
			callback();
		}
	}

	for (let i = 0; i < this.nodeList.length; i++) {
		if (typeof selector === 'string') {
			this.nodeList[i].addEventListener(event, hendler);
		} else {
			this.nodeList[i].addEventListener(event, selector);
		}
	}
	return this;
}

jQueryObject.prototype.one = function(event, handler) {
	function oneTimeFn(e) {
		handler()
		e.target.removeEventListener(e.type, arguments.callee);
	}

	for (let i = 0; i < this.nodeList.length; i++) {
		this.nodeList[i].addEventListener(event, oneTimeFn);
	}
	return this;
}

window.$ = dollorFn;