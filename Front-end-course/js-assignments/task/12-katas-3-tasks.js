'use strict';

/**
 * Returns true if word occurrs in the specified word snaking puzzle.
 * Each words can be constructed using "snake" path inside a grid with top, left, right and bottom directions.
 * Each char can be used only once ("snake" should not cross itself).
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {bool}
 *
 * @example
 *   var puzzle = [ 
 *      'ANGULAR',
 *      'REDNCAE',
 *      'RFIDTCL',
 *      'AGNEGSA',
 *      'YTIRTSP',
 *   ]; 
 *   'ANGULAR'   => true   (first row)
 *   'REACT'     => true   (starting from the top-right R adn follow the ↓ ← ← ↓ )
 *   'UNDEFINED' => true
 *   'RED'       => true
 *   'STRING'    => true
 *   'CLASS'     => true
 *   'ARRAY'     => true   (first column)
 *   'FUNCTION'  => false
 *   'NULL'      => false 
 */
function findStringInSnakingPuzzle(puzzle, searchStr) {
    let copySearchStr = searchStr,
        snakeIndex = [];

    function check(i, j) {
        //right direction
        if (j < puzzle[i].length - 1 && puzzle[i][j + 1] && puzzle[i][j + 1] === copySearchStr[1]) {
            if (!isSnakeCrossItself(i, j+1)) {
                return [i, j + 1];
            }
        }
        //left direction
        if (j > 0 && puzzle[i][j - 1] && puzzle[i][j - 1] === copySearchStr[1]) {
            if (!isSnakeCrossItself(i, j-1)) {
                return [i, j - 1];
            }
            
        }
        // bottom direction
        if (i < puzzle.length - 1 && puzzle[i+1][j] && puzzle[i+1][j] === copySearchStr[1]) {
            if (!isSnakeCrossItself(i+1, j)) {
                return [i + 1, j];
            }
        }
        //top direction
        if (i > 0 && puzzle[i - 1][j] && puzzle[i - 1][j] === copySearchStr[1]) {
            if (!isSnakeCrossItself(i - 1, j)) {
                return [i - 1, j];
            }
                
        }
    }

    for (let i = 0; i < puzzle.length; i++) {
        for (let j = 0; j < puzzle[i].length; j++) {
            if (puzzle[i][j] === copySearchStr[0]) {
                let newIJ = [i, j];
                    while (copySearchStr.length !== 1 && newIJ) {
                        snakeIndex.push(newIJ);
                        newIJ = check(newIJ[0], newIJ[1]);
                        if (newIJ) {
                            
                            copySearchStr = copySearchStr.split('').splice(1, copySearchStr.length - 1).join('');
                        }
                    }
                    if (copySearchStr.length === 1) {
                        return true;
                    }
                copySearchStr = searchStr;
                snakeIndex = [];
            }
        }
    }
    
    function isSnakeCrossItself(i, j) {
        return snakeIndex.some(ind => (ind[0] === i && ind[1] === j)) ? true : false;
    }

    return false;
}


/**
 * Returns all permutations of the specified string.
 * Assume all chars in the specified string are different.
 * The order of permutations does not matter.
 * 
 * @param {string} chars
 * @return {Iterable.<string>} all posible strings constructed with the chars from the specfied string
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */
function* getPermutations(chars) {
    let result = [];

    function permute(arr, memoryArr) {
        let element,
            thisMemotyArr = [];
        if (memoryArr) {
            thisMemotyArr = memoryArr;
        }
        for (let i = 0; i < arr.length; i++) {
            element = arr.splice(i, 1);
            if (!(arr.length)) {
                result.push(thisMemotyArr.concat(element));
            }
            permute(arr.slice(), thisMemotyArr.concat(element));
            arr.splice(i, 0, element);
        }
        return result;
    }

    result = permute(chars.split('')).map(arr => {
        let str = '';
        arr.forEach(element => str+=element);
        return str;
    });
    while (result.length) {
        yield result.pop();
    }
}


/**
 * Returns the most profit from stock quotes.
 * Stock quotes are stores in an array in order of date.
 * The stock profit is the difference in prices in buying and selling stock.
 * Each day, you can either buy one unit of stock, sell any number of stock units you have already bought, or do nothing. 
 * Therefore, the most profit is the maximum difference of all pairs in a sequence of stock prices.
 * 
 * @param {array} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (buy at 1,2,3,4,5 and then sell all at 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (nothing to buy)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (buy at 1,6,5 and sell all at 10)
 */
  
function getMostProfitFromStockQuotes(quotes) {
    let result = 0;

    function getProfit(arr) {
        let max = Math.max.apply(Math, arr);
        let index = arr.findIndex(x => x === max);
         let sum = 0;
         for (let i = 0; i < index; i++) {
            sum += arr[i];
         }
         result += max * index - sum;
         arr.splice(0, index + 1);
         if (arr.length) {
            getProfit(arr);
         }
         return result;
    }
    return getProfit(quotes);
}


/**
 * Class representing the url shorting helper.
 * Feel free to implement any algorithm, but do not store link in the key\value stores.
 * The short link can be at least 1.5 times shorter than the original url.
 * 
 * @class
 *
 * @example
 *    
 *     var urlShortener = new UrlShortener();
 *     var shortLink = urlShortener.encode('https://en.wikipedia.org/wiki/URL_shortening');
 *     var original  = urlShortener.decode(shortLink); // => 'https://en.wikipedia.org/wiki/URL_shortening'
 * 
 */
function UrlShortener() {
    this.urlAllowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"+
                           "abcdefghijklmnopqrstuvwxyz"+
                           "0123456789-_.~!*'();:@&=+$,/?#[]";
}

UrlShortener.prototype = {
    urlEncode: Symbol().toString(),
    
    [this.urlEncode]: '',

    encode: function(url) {
        this[this.urlEncode] = url;
        return this.urlEncode
    },
    
    decode: function(code) {
        if (code === this.urlEncode) {
            return this[this.urlEncode];
        }
    } 
}


module.exports = {
    findStringInSnakingPuzzle: findStringInSnakingPuzzle,
    getPermutations: getPermutations,
    getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
    UrlShortener: UrlShortener
};
