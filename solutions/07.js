const pInput = require('../processInput');
const input = pInput.process(7);
const hPs = input[0].split(',').map(num => +num);
const range = [...Array(Math.max(...hPs)).keys()].map(d => d + Math.min(...hPs));

// Part 1
const getFuelCost = (num1, num2) => {
    const min = num1 <= num2 ? num1 : num2;
    const max = num1 >= num2 ? num1 : num2;
    return max - min;
}

const calculateFuel = (arr1, arr2) => {
    const fuels = [];
    let totalFuel = 0;
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            fuel = getFuelCost(arr1[i], arr2[j]);
            totalFuel += fuel;
        }
        fuels.push(totalFuel);
        totalFuel = 0;
    }
    return Math.min(...fuels);
}
const solution1 = calculateFuel(range, hPs);
console.log(solution1);

// Part 2
const getFuelCost2 = (num1, num2) => {
    const min = num1 <= num2 ? num1 : num2;
    const max = num1 >= num2 ? num1 : num2;
    const difference = max - min;
    if (difference === 0) {
        return difference;
    } else {
        const extra = (difference * (difference + 1) / 2);
        return extra;
    }
}

const calculateFuel2 = (arr1, arr2) => {
    const fuels = [];
    let totalFuel = 0;
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            fuel = getFuelCost2(arr1[i], arr2[j]);
            totalFuel += fuel;
        }
        fuels.push(totalFuel);
        totalFuel = 0;
    }
    return Math.min(...fuels);
}
const solution2 = calculateFuel2(range, hPs);
console.log(solution2);