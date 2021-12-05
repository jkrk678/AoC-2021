const { process } = require('../processInput');
const input = process(4);

// Part 1
const structureData = () => {
    let nums;
    let card = [];
    const cards = [];

    for (const line of input) {
        if (line.includes(',')) {
            nums = line.split(',').map(num => +num);
        } else {
            if (line !== '') {
                row = line.split(' ').filter(i => i !== '').map(num => +num);
                card.push(row);
            }
            if (card.length === 5) {
                cards.push(card);
                card = [];
            }
        }
    }

    return [nums, cards];
};

const [bingoNumbers, bingoCards] = structureData();

const callNextNumber = i => bingoNumbers[i];

const markMatchedNumber = (arr, num) => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === num) {
                arr[i][j] = '.';
                break;
            }
        }
    }
};

const checkForBingo = arr => {
    let bingo = false;
    const lines = [arr[0], arr[1], arr[2], arr[3], arr[4], [arr[0][0], arr[1][0], arr[2][0], arr[3][0], arr[4][0]], [arr[0][1], arr[1][1], arr[2][1], arr[3][1], arr[4][1]], [arr[0][2], arr[1][2], arr[2][2], arr[3][2], arr[4][2]], [arr[0][3], arr[1][3], arr[2][3], arr[3][3], arr[4][3]], [arr[0][4], arr[1][4], arr[2][4], arr[3][4], arr[4][4]]]
    for (const line of lines) {
        if (line.join('') === '.....') {
            bingo = true;
            break;
        } else {
            bingo = false;
        }
    }
    return bingo;
};

const sumNumbers = arr => {
    let nums = arr.flat();
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    return nums.filter(num => typeof num === 'number').reduce(reducer);
};

const playBingo = oneCard => {
    let bingo = false;
    let numberIndex = 0;
    let turns = 0;
    while (bingo === false) {
        turns++;
        let number = callNextNumber(numberIndex);
        numberIndex++;
        markMatchedNumber(oneCard, number);
        bingo = checkForBingo(oneCard);
    }
    const sum = sumNumbers(oneCard);
    return [turns, sum * bingoNumbers[numberIndex - 1]];
}

const solve = () => {
    let turns = bingoNumbers.length;
    let score = 0;

    for (const card of bingoCards) {
        const cardResult = playBingo(card);
        if (cardResult[0] < turns) {
            turns = cardResult[0];
            score = cardResult[1];
        }
    }
    return score;
}

const solution = solve();
console.log(solution);

// Part 2
const bingoCards2 = structureData()[1];
const solve2 = () => {
    let turns = 0;
    let score = 0;

    for (const card of bingoCards2) {
        const cardResult = playBingo(card);
        if (cardResult[0] > turns) {
            turns = cardResult[0];
            score = cardResult[1];
        }
    }
    return score;
}

const solution2 = solve2();
console.log(solution2);