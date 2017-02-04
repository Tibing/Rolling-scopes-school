'use strict';

/**************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 **************************************************************************************************/


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    var r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
    this.width = width;
    this.height = height;
    Rectangle.prototype.getArea = function() {
        return this.width * this.height;
    };
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
    return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    var r = fromJSON(Rectangle.prototype, '{"width":10, "height":20}');
 *
 */
function fromJSON(proto, json) {
    let obj = JSON.parse(json);
    obj.__proto__ = proto;
    return obj;
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy and implement the functionality
 * to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple, clear and readable as possible.
 *
 * @example
 *
 *  var builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()  => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()  => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()        =>    'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {
    result: '',
    reserve: [],
    combinatorArr: [],
    countElement: 0,
    countId: 0,
    countPseudoElement: 0,

    element: function(value) {
        try {
            this.countElement++;
            if (this.countElement > 1) {
                throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
            }
           
        } catch (e) {
            throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
        }
        if (this.result) {
            this.reserve.push(this.result);
        }
        this.result = '';
        this.result += value;
        return this;
    },

    id: function(value) {
        try {
            this.countId++;
            if (this.countId > 1) {
                throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
            }
        } catch (e) {
            throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
        }
        this.result += '#' + value;
        return this;
    },

    class: function(value) {
        this.result += '.' + value;
        return this;
    },

    attr: function(value) {
        this.result += '[' + value + ']';
        return this;
    },

    pseudoClass: function(value) {
        
        this.result += ':' + value;
        return this;
    },

    pseudoElement: function(value) {
        this.countPseudoElement++;
        try {
            if (this.countPseudoElement > 1) {
                throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
            }
        } catch (e) {
            throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
        }
        this.result += '::' + value;
        return this;
    },

    counter : 0,
    combine: function(selector1, combinator, selector2) {
        this.counter++;
        this.reserve.push(this.result);
        this.combinatorArr.push(combinator);
        console.log(this.reserve + "_____________"+this.combinatorArr);
        this.result = '';
        let helper = this.reserve.filter(x => x !== '');
        if (this.counter === helper.length-1) {
            let length = helper.length;
            for (let i = 0; i < length; i++) {
                this.result += helper.shift();
                if (this.combinatorArr.length) {
                    this.result += ' ' + this.combinatorArr.pop() + ' ';
                }
            }
        }
        return this;
    },

    stringify: function(value) {
        let ret = this.result;
        this.result = '';
        this.reserve = [];
        this.countId = 0;
        this.countElement = 0;
        this.countPseudoElement = 0;
        this.counter = 0;
        return ret;
    }
};


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
