'use strict';

/**
 * Returns the array of 32 compass points and heading.
 * See details here:
 * https://en.wikipedia.org/wiki/Points_of_the_compass#32_cardinal_points
 *
 * @return {array}
 *
 * Example of return :
 *  [
 *     { abbreviation : 'N',     azimuth : 0.00 ,
 *     { abbreviation : 'NbE',   azimuth : 11.25 },
 *     { abbreviation : 'NNE',   azimuth : 22.50 },
 *       ...
 *     { abbreviation : 'NbW',   azimuth : 348.75 }
 *  ]
 */
function createCompassPoints() {
    throw new Error('Not implemented');
    var sides = ['N','E','S','W'];  // use array of cardinal directions only!
}


/**
 * Expand the braces of the specified string.
 * See https://en.wikipedia.org/wiki/Bash_(Unix_shell)#Brace_expansion
 *
 * In the input string, balanced pairs of braces containing comma-separated substrings
 * represent alternations that specify multiple alternatives which are to appear at that position in the output.
 *
 * @param {string} str
 * @return {Iterable.<string>}
 *
 * NOTE: The order of output string does not matter.
 *
 * Example:
 *   '~/{Downloads,Pictures}/*.{jpg,gif,png}'  => '~/Downloads/*.jpg',
 *                                                '~/Downloads/*.gif'
 *                                                '~/Downloads/*.png',
 *                                                '~/Pictures/*.jpg',
 *                                                '~/Pictures/*.gif',
 *                                                '~/Pictures/*.png'
 *
 *   'It{{em,alic}iz,erat}e{d,}, please.'  => 'Itemized, please.',
 *                                            'Itemize, please.',
 *                                            'Italicized, please.',
 *                                            'Italicize, please.',
 *                                            'Iterated, please.',
 *                                            'Iterate, please.'
 *
 *   'thumbnail.{png,jp{e,}g}'  => 'thumbnail.png'
 *                                 'thumbnail.jpeg'
 *                                 'thumbnail.jpg'
 *
 *   'nothing to do' => 'nothing to do'
 */
function* expandBraces(str) {
    throw new Error('Not implemented');
}


/**
 * Returns the ZigZag matrix
 *
 * The fundamental idea in the JPEG compression algorithm is to sort coefficient of given image by zigzag path and encode it.
 * In this task you are asked to implement a simple method to create a zigzag square matrix.
 * See details at https://en.wikipedia.org/wiki/JPEG#Entropy_coding
 * and zigzag path here: https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/JPEG_ZigZag.svg/220px-JPEG_ZigZag.svg.png
 *
 * @param {number} n - matrix dimension
 * @return {array}  n x n array of zigzag path
 *
 * @example
 *   1  => [[0]]
 *
 *   2  => [[ 0, 1 ],
 *          [ 2, 3 ]]
 *
 *         [[ 0, 1, 5 ],
 *   3  =>  [ 2, 4, 6 ],
 *          [ 3, 7, 8 ]]
 *
 *         [[ 0, 1, 5, 6 ],
 *   4 =>   [ 2, 4, 7,12 ],
 *          [ 3, 8,11,13 ],
 *          [ 9,10,14,15 ]]
 *
 */
function getZigZagMatrix(n) {
    let i = 0, 
        j = 0,
        move = 'right',
        arr = [];

    for (let i = 0; i < n; i++) {
        arr.push(Array(n));
    }
    arr[i][j] = 0;
    for (let k = 1; k < n * n; k++) {
        switch (move) {
            case 'right':
                j++;
                if (i === 0) {
                    move = 'downLeft';
                } else {
                    move = 'upRight';
                }
                break;
            case 'down':
                i++;
                if (j === 0) {
                    move = 'upRight';
                } else {
                    move = 'downLeft';
                }
                break;
            case 'upRight':
                i--;
                j++;
                if (j == n-1) {
                    move = 'down';
                } else if (i == 0) {
                    move = 'right';
                }
                break;
            case 'downLeft':
                i++;
                j--;
                if (i === n-1) {
                    move = 'right';
                } else if (j === 0) {
                    move = 'down';
                }
                break;
        }
        arr[i][j] = k;
    }
    return arr;
}


/**
 * Returns true if specified subset of dominoes can be placed in a row accroding to the game rules.
 * Dominoes details see at: https://en.wikipedia.org/wiki/Dominoes
 *
 * Each domino tile presented as an array [x,y] of tile value.
 * For example, the subset [1, 1], [2, 2], [1, 2] can be arranged in a row (as [1, 1] followed by [1, 2] followed by [2, 2]),
 * while the subset [1, 1], [0, 3], [1, 4] can not be arranged in one row.
 * NOTE that as in usual dominoes playing any pair [i, j] can also be treated as [j, i].
 *
 * @params {array} dominoes
 * @return {bool}
 *
 * @example
 *
 * [[0,1],  [1,1]] => true
 * [[1,1], [2,2], [1,5], [5,6], [6,3]] => false
 * [[1,3], [2,3], [1,4], [2,4], [1,5], [2,5]]  => true
 * [[0,0], [0,1], [1,1], [0,2], [1,2], [2,2], [0,3], [1,3], [2,3], [3,3]] => false
 *
 */
function canDominoesMakeRow(dominoes) {
    let matrix = [],
        ij = [];
    const N =7;

    for (let i = 0; i < N; i++) {
        matrix.push(Array(N).fill(0));
    }
    dominoes.forEach(x => {
        matrix[x[0]][x[1]] = 1;
    });
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (matrix[i][j] === 1) {
                ij.push(i, j);
                matrix[i][j] = 0;
                break;
            }
        }
        if (ij.length !== 0) {
            break;
        }
    }
    let check = 'j';
    while (1) {
        let colArrI = matrix.map(arr => {
            return arr[ij[0]];
        });
        let colArrJ = matrix.map(arr => {
            return arr[ij[1]];
        });
        const coli = matrix[ij[0]].findIndex(x => x === 1),
            colj = matrix[ij[1]].findIndex(x => x === 1),
            rowi = colArrI.findIndex(x => x === 1),
            rowj = colArrJ.findIndex(x => x === 1);

        if (check === 'j') {
            if (rowj !== -1) {
                matrix[rowj][ij[1]] = 0;
                ij[0] = rowj;
                check = 'i';
            } else if (colj !== -1) {
                matrix[ij[1]][colj] = 0;
                ij[0] = ij[1];
                ij[1] = colj;
                check = 'j';
            } else {
                break;
            }
        } else {
            if (coli !== -1) {
                    matrix[ij[0]][coli] = 0;
                    ij[1] = coli;
                    check = 'j'
            } else if (rowi !== -1) {
                matrix[rowi][ij[0]] = 0;
                ij[0] = rowi;
                ij[1] = ij[0];
                check = 'j'
            } else {
                break;
            }
        }
    }
    return matrix.every(arr => arr.every(x => x !== 1));
}


/**
 * Returns the string expression of the specified ordered list of integers.
 *
 * A format for expressing an ordered list of integers is to use a comma separated list of either:
 *   - individual integers
 *   - or a range of integers denoted by the starting integer separated from the end integer in the range by a dash, '-'.
 *     (The range includes all integers in the interval including both endpoints)
 *     The range syntax is to be used only for, and for every range that expands to more than two values.
 *
 * @params {array} nums
 * @return {bool}
 *
 * @example
 *
 * [ 0, 1, 2, 3, 4, 5 ]   => '0-5'
 * [ 1, 4, 5 ]            => '1,4,5'
 * [ 0, 1, 2, 5, 7, 8, 9] => '0-2,5,7-9'
 * [ 1, 2, 4, 5]          => '1,2,4,5'
 */
function extractRanges(nums) {
    let result = '',
        helper = [], // consists of small arrays
        small = []; // consists of grouped numbers

    // create helper array
    nums.forEach((num, i) => {
        if (!(small.length) || small[small.length - 1] + 1 === num) {
            small.push(num);
            if (i === nums.length - 1) {
                helper.push(small);
            }
        } else {
            helper.push(small);
            small = [];
            small.push(num);
        }
    });
    // create result string
    helper.forEach((small, j) => {
        if (small.length > 2) {
            result += small[0] + '-';
            result += small[small.length - 1];
        } else {
            small.forEach((x, i) => {
                result += x;
                if (i !== small.length - 1) {
                    result += ',';
                }
            });
        }
        if (j !== helper.length - 1) {
                result += ',';
        }
    });
    
    return result;
}

module.exports = {
    createCompassPoints : createCompassPoints,
    expandBraces : expandBraces,
    getZigZagMatrix : getZigZagMatrix,
    canDominoesMakeRow : canDominoesMakeRow,
    extractRanges : extractRanges
};
