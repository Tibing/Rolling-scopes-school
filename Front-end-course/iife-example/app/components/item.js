'use strict';

const {
	ComponentConstants
} = require('../constants');

function Item(text) {
    const li = document.createElement('li');
    li.classList.add(ComponentConstants.DEFAULT_ITEM_CLASS);
    li.innerText = text;

    return li;
};

module.exports = Item;