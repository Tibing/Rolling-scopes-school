'use strict';

const { ComponentConstants } = require('../constants');
const Item = require('./item');
const classes = ComponentConstants.DEFAULT_LIST_CLASSES;

function createItems(names) {
    const fragment = document.createDocumentFragment();

    names.forEach((itemName) => {
        const item = new Item(itemName);
        fragment.appendChild(item);
    });

    return fragment;
}

function ItemsList() {
    const list = document.createElement('ul');
    const items = createItems(ComponentConstants.ITEMS_NAMES);

    list.classList.add(...classes);
    list.appendChild(items);

    return list;
};

module.exports = ItemsList;