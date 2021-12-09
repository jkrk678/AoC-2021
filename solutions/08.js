const pInput = require('../processInput');
const input = pInput.process(8);

// Part 1
let digits = 0;
for (const entry of input) {
    const outputValues = entry.split(' | ')[1].split(' ');
    for (const val of outputValues) {
        if (val.length === 2 || val.length === 3 || val.length === 4 || val.length === 7) digits++;
    }
}
console.log(digits);

// Part 2
const totalOutputValues = [];
const solveIt = str => {
    const signalPatterns = str.split(' | ')[0];

    // Spaghetti code to get segments
    let one = '';
    let four = '';
    const nums = signalPatterns.split(' ');
    for (const num of nums) {
        if (num.length === 2) one = num;
        if (num.length === 4) four = num;
    }

    const countChars = (char, str) => {
        const count = str.split('').filter(letter => letter === char).length;
        return count;
    }

    const segments = {};
    const wires = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    for (let i = 0; i < wires.length; i++) {
        const count = countChars(wires[i], signalPatterns);
        if (count === 4) segments.bottomLeft = wires[i];
        if (count === 6) segments.topLeft = wires[i];
        if (count === 7) {
            if (four.includes(wires[i]) && !one.includes(wires[i]) && wires[i] !== segments.topLeft) {
                segments.center = wires[i];
            } else {
                segments.bottom = wires[i];
            }
        }
        if (count === 8) {
            if (one.includes(wires[i])) {
                segments.topRight = wires[i];
            } else {
                segments.top = wires[i];
            }
        }
        if (count === 9) segments.bottomRight = wires[i];
    }

    // Figure out the number output
    const numberOutput = str.split(' | ')[1].split(' ');
    let numberStr = '';
    const getNumber = (str, arr) => {
        for (const letter of arr) {
            if (!str.includes(letter)) return false;
        }
        return true;
    }

    const t = segments.top;
    const tr = segments.topRight;
    const br = segments.bottomRight;
    const b = segments.bottom;
    const bl = segments.bottomLeft;
    const tl = segments.topLeft;
    const c = segments.center;

    for (const number of numberOutput) {
        if (getNumber(number, [t, tr, br, b, bl, tl, c])) {
            numberStr += '8';
        } else if (getNumber(number, [t, tr, br, b, tl, c])) {
            numberStr += '9';
        } else if (getNumber(number, [t, br, b, bl, tl, c])) {
            numberStr += '6';
        } else if (getNumber(number, [t, tr, br, b, bl, tl])) {
            numberStr += '0';
        } else if (getNumber(number, [t, tr, b, bl, c])) {
            numberStr += '2';
        } else if (getNumber(number, [t, tr, br, b, c])) {
            numberStr += '3';
        } else if (getNumber(number, [t, br, b, tl, c])) {
            numberStr += '5';
        } else if (getNumber(number, [tr, br, tl, c])) {
            numberStr += '4';
        } else if (getNumber(number, [t, tr, br])) {
            numberStr += '7';
        } else {
            numberStr += '1';
        }
    }

    let theNumber = +numberStr;
    totalOutputValues.push(theNumber);
}

for (const line of input) {
    solveIt(line);
}

const solution = totalOutputValues.reduce((prev, curr) => prev + curr);
console.log(solution);