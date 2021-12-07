const pInput = require('../processInput');
const input = pInput.process(6);
let fishSchool = input[0].split(',').map(num => +num);

const countTheFish = (arr, numDays) => {
    const firstCount = fish => arr.filter(num => num === fish).length;
    let zeroes = firstCount(0);
    let ones   = firstCount(1);
    let twos   = firstCount(2);
    let threes = firstCount(3);
    let fours  = firstCount(4);
    let fives  = firstCount(5);
    let sixes  = firstCount(6);
    let sevens = firstCount(7);
    let eights = firstCount(8);

    days = 1;
    while (days <= numDays) {
        let superLanternFish = zeroes;
        zeroes = ones;
        ones   = twos;
        twos   = threes;
        threes = fours;
        fours  = fives;
        fives  = sixes;
        sixes  = sevens + superLanternFish;
        sevens = eights;
        eights = superLanternFish;
        days++;
    }

    return zeroes + ones + twos + threes + fours + fives + sixes + sevens + eights;
}

// Part 1
console.log(countTheFish(fishSchool, 80))

// Part 2
console.log(countTheFish(fishSchool, 256))