'use strict';

const ItemsList = require('./items_list');
const { ComponentConstants: { DEFAULT_CONTAINER_CLASSES } } = require('../constants')

function Container() {
    const container = document.createElement('div');
    const itemsList = new ItemsList();

    container.classList.add(...DEFAULT_CONTAINER_CLASSES);
    container.appendChild(itemsList);

    return container;
};

module.exports = Container;