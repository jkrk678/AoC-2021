const prIn = require('../processInput');
const input = prIn.processInput(1);

// Part 1
const answer1 = input.filter((measurement, i) => +measurement < +input[i + 1]).length;
console.log(answer1);

// Part 2
let answer2 = 0;
input.forEach((num, i) => {
    if (typeof input[i+3] !== 'undefined'
        && +num + +input[i+1] + +input[i+2] < +input[i+1] + +input[i+2] + +input[i+3]) answer2++;
});
console.log(answer2);