const pInput = require('../processInput');
const input = pInput.process(5);

const diagram = {};
const dangerZones = [];

const processPoint = (x, y) => `${x},${y}` in diagram ? dangerZones.push(`${x},${y}`) : diagram[`${x},${y}`] = 1;

const processVerticalLine = (x1, y1, y2) => {
    if (y1 < y2) {
        while (y1 <= y2) {
            processPoint(x1, y1);
            y1++;
        }
    } else {
        while (y1 >= y2) {
            processPoint(x1, y1);
            y1--;
        }
    }
}

const processHorizontalLine = (x1, y1, x2) => {
    if (x1 < x2) {
        while (x1 <= x2) {
            processPoint(x1, y1);
            x1++;
        }
    } else {
        while (x1 >= x2) {
            processPoint(x1, y1);
            x1--;
        }
    }
}

const processDiagonalLine = (x1, y1, x2, y2) => {
    if (x1 < x2) {
        while (x1 <= x2) {
            processPoint(x1, y1);
            x1++;
            y1 = y1 < y2 ? y1 + 1 : y1 - 1;
        }
    } else {
        while (x1 >= x2) {
            processPoint(x1, y1);
            x1--;
            y1 = y1 < y2 ? y1 + 1 : y1 - 1;
        }
    }
}

for (const line of input) {
    let regexArr = line.match(/^(\d+),(\d+) -> (\d+),(\d+)$/);
    let [x1, y1, x2, y2] = regexArr.slice(1).map(num => +num);

    // Part 1
    if (x1 === x2) {
        processVerticalLine(x1, y1, y2);
    } else if (y1 === y2) {
        processHorizontalLine(x1, y1, x2);
    // Part 2
    } else {
        processDiagonalLine(x1, y1, x2, y2);
    }
}

console.log([...new Set(dangerZones)].length);