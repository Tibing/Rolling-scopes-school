'use strict';

/**
 * Returns the bank account number parsed from specified string.
 *
 * You work for a bank, which has recently purchased an ingenious machine to assist in reading letters and faxes sent in by branch offices.
 * The machine scans the paper documents, and produces a string with a bank account that looks like this:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Each string contains an account number written using pipes and underscores.
 * Each account number should have 9 digits, all of which should be in the range 0-9.
 *
 * Your task is to write a function that can take bank account string and parse it into actual account numbers.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */
function parseBankAccount(bankAccount) {
    let mas = bankAccount.split('\n'),
        nums = [[],[],[],[],[],[],[],[],[]],
        n = [],
        result = '';
    mas.pop();

    for (let i = 0; i < 9; i++) {
        mas.forEach((x,j) => {
            nums[i].push(x.slice(0, 3));
            mas[j] = mas[j].slice(3, x.length);
        });
    };
    function createMasOfPossibleValues() {
        n = n.filter(y => {
            let canBe = false;
            Array.from(arguments).forEach(x => {
                if (x === y) {
                    canBe = true;
                }
            });
            return canBe
        });
    }
    nums.forEach((x, i) => {
        if (x[0].indexOf('_') === -1) {
            n.push(1, 4);
        } else {
            n.push(0, 2, 3, 5, 6, 7, 8, 9);
        }

        if (x[1][0] === '|' && x[1][2] === '|') {
            createMasOfPossibleValues(8, 9, 0, 4);
        } else if (x[1][0] === '|') {
            createMasOfPossibleValues(5, 6);
        } else if (x[1][2] === '|') {
            createMasOfPossibleValues(1, 2, 3, 7);
        }
        if (x[1].indexOf('_') === -1) {
            createMasOfPossibleValues(1, 0, 7);
        } else {
            createMasOfPossibleValues(2, 3, 4, 5, 6, 8, 9);
        }

        if (x[2][0] === '|' && x[2][2] === '|') {
            createMasOfPossibleValues(6, 8, 0);
        } else if (x[2][0] === '|') {
            createMasOfPossibleValues(2);
        } else if (x[2][2] === '|') {
            createMasOfPossibleValues(1, 3, 4, 5, 7, 9);
        }
        if (x[2].indexOf('_') === -1) {
            createMasOfPossibleValues(1, 4, 7);
        }
        result += n[0];
        n = [];
    });

    return Number(result);
}


/**
 * Returns the string, but with line breaks inserted at just the right places to make sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>  'The String global object',
 *                                                                                                'is a constructor for',
 *                                                                                                'strings, or a sequence of',
 *                                                                                                'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>  'The String',
 *                                                                                                'global',
 *                                                                                                'object is a',
 *                                                                                                'constructor',
 *                                                                                                'for strings,',
 *                                                                                                'or a',
 *                                                                                                'sequence of',
 *                                                                                                'characters.'
 */
function* wrapText(text, columns) {
    let arr = text.split(' '),
        sum = 0,
        k = 0,
        result = [];

    for (let i = 0; i < arr.length; i++) {
        if (sum + arr[i].length < columns) {
            if (i !== 0) {
                sum +=1;
            }
            sum += arr[i].length;
            if (i === arr.length -1) {
                result.push(i+1);
            }
        } else {
            sum = arr[i].length;
            result.push(i);
            if (i === arr.length - 1) {
                result.push(i+1);
            }
        }
    }
    for (let i = 0; i < result.length; i++) {
        let substr = '',
            firstChar = true;

        while (k < result[i]) {
            if (!firstChar) {
                substr += ' ';
            }
            firstChar = false;
            substr += arr[k];
            k++;
        }
        result[i] = substr;
        yield result[i];
    }
}


/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
const PokerRank = {
    StraightFlush: 8,
    FourOfKind: 7,
    FullHouse: 6,
    Flush: 5,
    Straight: 4,
    ThreeOfKind: 3,
    TwoPairs: 2,
    OnePair: 1,
    HighCard: 0
}

function getPokerHandRank(hand) {
    let arrOfValues = [],
        arrOfSuits = [],
        counterOfSameRank = [],
        sequentialRank = true,
        equalSuit = true,
        checkA = true,
        counter = 1,
        sortValueMas;
    // fill arrOfValues mas
    hand.forEach(x => {
        let pushValue;
        if (x[0] === '1' && x[1] === '0'){
            pushValue = 10;
        } else if (x[0] === 'J') {
            pushValue = 11;
        } else if (x[0] === 'Q') {
            pushValue = 12;
        } else if (x[0] === 'K') {
            pushValue = 13;
        } else if (x[0] === 'A') {
            pushValue = 14;
        } else {
            pushValue = x[0];
        }
        arrOfValues.push(pushValue);
        arrOfSuits.push(x.charCodeAt(x.length-1));
    });
    // sgood sort
    sortValueMas = arrOfValues.sort((a, b) => a - b);
    for (let i = 0; i < sortValueMas.length - 2; i++) {
        if (sortValueMas[i+1] - sortValueMas[i] !== 1) {
            checkA = false;
        } 
    }
    if (checkA && sortValueMas[0] == 2 && sortValueMas[sortValueMas.length-1] == 14) {
        sortValueMas.pop();
        sortValueMas.unshift(1);
    }
    // fill counterOfSameRank mas, check equalSuit and sequentialRank
    for (let i = 0; i < arrOfSuits.length - 1; i++) {
        if (arrOfSuits[i] !== arrOfSuits[i+1]) {
            equalSuit = false;
        }
        if (sortValueMas[i+1] - sortValueMas[i] !== 1) {
            sequentialRank = false;
        } 
        if (sortValueMas[i] === sortValueMas[i+1]) {
            counter++;
        } else {
            if (counter !== 0 && counter !== 1){
                counterOfSameRank.push(counter);
            }
            counter = 1;
        }
    }
    if (counter && counter !== 1) {
        counterOfSameRank.push(counter);
    }
    // return block
    if (equalSuit && sequentialRank) {
        return PokerRank.StraightFlush;
    } 
    if (counterOfSameRank[0] === 4) {
        return PokerRank.FourOfKind;
    } 
    if (counterOfSameRank.length === 2 &&
        ((counterOfSameRank[0] === 2 && counterOfSameRank[1] === 3) ||
        (counterOfSameRank[0] === 3 && counterOfSameRank[1] === 2))) {
        return PokerRank.FullHouse;
    } 
    if (equalSuit) {
        return PokerRank.Flush;
    } 
    if (sequentialRank) {
        return PokerRank.Straight;
    }
    if (counterOfSameRank[0] === 3) {
        return PokerRank.ThreeOfKind;
    } 
    if (counterOfSameRank.length === 2 && counterOfSameRank[0] === 2 && counterOfSameRank[1] === 2)  {
        return PokerRank.TwoPairs;
    } 
    if (counterOfSameRank[0] === 2 || counterOfSameRank[1] === 2)  {
        return PokerRank.OnePair;
    }

    return PokerRank.HighCard;
}


/**
 * Returns the rectangles sequence of specified figure.
 * The figure is ASCII multiline string comprised of minus signs -, plus signs +, vertical bars | and whitespaces.
 * The task is to break the figure in the rectangles it is made of.
 *
 * NOTE: The order of rectanles does not matter.
 * 
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 * 
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+              '+------------+\n'+
 *    '|            |\n'+              '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+       =>     '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+              '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'               '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */
function* getFigureRectangles(figure) {
    let arr = figure.split('\n'),
        leftTopIndex = [],
        rightBottomIndex = [],
        rectanglePoints = [];
    arr.pop();

    if (arr.every(x => x.split('').every(y => y === '+'))) {
        let counter = (arr.length / 2) * (arr[0].length / 2) + 1;
        while (counter) {
            yield getRectangleString(2, 2);
            counter--;
        }
    }
    for (let i = 0; i < arr.length; i++) {
        // find and push all leftTopCorners
        for (let j = 0; j < arr[i].length; j++) {
            if ((arr[i][j] === '+') && (i < arr.length - 1) && (j < arr[i].length - 1) && (arr[i][j + 1] === '-') && (arr[i + 1][j] === '|')) {
                leftTopIndex.push({ 'i': i, 'j': j });
            }
        }
        // find and push all rightTopCorners
        for (let j = 0; j < arr[i].length; j++) {
            if ((arr[i][j] === '+') && (i > 0) && (j > 0) && (arr[i][j - 1] === '-') && (arr[i - 1][j] === '|')) {
                rightBottomIndex.push({ 'i': i, 'j': j });
            }
        }
    }
    // add all suitable points of topLeft and bottomRight corners to the rightBottomIndex array
    for (let i = 0; i < leftTopIndex.length; i++) {
        for (let j = 0; j < rightBottomIndex.length; j++) {
            let bottomRightI = rightBottomIndex[j].i,
                bottomRightJ = rightBottomIndex[j].j,
                topLeftI = leftTopIndex[i].i,
                topLeftJ = leftTopIndex[i].j;
                
            if (arr[bottomRightI][topLeftJ] === '+' && bottomRightI != topLeftI && bottomRightJ !== topLeftJ && topLeftJ < bottomRightJ) {
                rectanglePoints.push([leftTopIndex[i], rightBottomIndex[j]]);
                leftTopIndex.splice(i, 1);
                rightBottomIndex.splice(j, 1);
                i--;
                j--;
                break;
            }
        }
    }
    for (let i = 0; i < rectanglePoints.length; i++) {
        let width = rectanglePoints[i][1].j - rectanglePoints[i][0].j,
            height = rectanglePoints[i][1].i - rectanglePoints[i][0].i;

        yield getRectangleString(width+1, height+1);

    }
}

function getRectangleString(width, height) {
    let result = '';
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (i === 0 ) {
                result += (j === 0) ? '+' : (j === width - 1) ? '+' : '-';
            } else if (i === height - 1) {
                result += (j === 0) ? '+' : (j === width - 1) ? '+' : '-';
            } else {
                result += (j === 0 || j === width - 1) ? '|' : ' ';
            }
        }
        result += '\n';
    }
    return result;
}

module.exports = {
    parseBankAccount : parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};
