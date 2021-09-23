/*
A bracket is considered to be any one of the following characters: (, ), {, }, [, or ].

Two brackets are considered to be a matched pair if the an opening bracket (i.e., (, [, or {) occurs to the left of a closing bracket (i.e., ), ], or }) of the exact same type. There are three types of matched pairs of brackets: [], {}, and ().

A matching pair of brackets is not balanced if the set of brackets it encloses are not matched. For example, {[(])} is not balanced because the contents in between { and } are not balanced. The pair of square brackets encloses a single, unbalanced opening bracket, (, and the pair of parentheses encloses a single, unbalanced closing square bracket, ].

Some examples of balanced brackets are []{}(), [({})]{}() and ({(){}[]})[].

By this logic, we say a sequence of brackets is considered to be balanced if the following conditions are met:

It contains no unmatched brackets.
The subset of brackets enclosed within the confines of a matched pair of brackets is also a matched pair of brackets.
Given  strings of brackets, determine whether each sequence of brackets is balanced. If a string is balanced, print YES on a new line; otherwise, print NO on a new line.

Function Description
Complete the isBalanced function in the editor below.

isBalanced has the following parameter(s):
- string expression: a string of brackets

Returns
- string: either YES or NO

Input Format

The first line contains a single integer, , the number of strings.
Each line  of the  subsequent lines consists of a single string, , denoting a sequence of brackets.
*/
// FIRST TRY

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'isBalanced' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING expression as parameter.
 */

function isBalanced(expression) {
    // variables
    const stack = [];
    const openers = ['(', '{', '['];
    const closers = [')', '}', ']'];
    // methods
    const lastInStack = () => stack[stack.length-1]
    const isOpener = (character) => openers.includes(character);
    const isCloser = (character) => closers.includes(character);
    // check
    [...expression].forEach(character => {
        if(isOpener(character)){
            stack.push(character)
        }
        else if(isCloser(character)) {
            if(closers.indexOf(character) === openers.indexOf(lastInStack())) {
                console.log('Entre aca')
                stack.pop();
            } else {
                return 'NO'
            }
        }
    })
    if(stack.length || isCloser(expression[0])) {
        return 'NO'
    } return 'YES'
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const expression = readLine();

        const res = isBalanced(expression);

        ws.write(res + '\n');
    }

    ws.end();
}
