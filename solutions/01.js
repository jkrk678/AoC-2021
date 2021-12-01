const fs = require('fs');
const input = fs.readFileSync('../inputs/01.txt', 'utf-8').split('\n');

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