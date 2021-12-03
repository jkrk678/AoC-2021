const pInput = require('../processInput');
const input = pInput.process(3);

// Part 1
let gammaRateBinary = '';
let epsilonRateBinary = '';
const processBits = num => {
    const binaryArr = input.filter(binaryNum => binaryNum.charAt(num) === '1');
    const gammaBit = binaryArr.length >= input.length / 2 ? '1' : '0';
    const epsilonBit = gammaBit === '1' ? '0' : '1';
    gammaRateBinary += gammaBit;
    epsilonRateBinary += epsilonBit;
}

const binaryNumLengthArr = [...Array(input[0].length).keys()];
for (const i of binaryNumLengthArr) {
    processBits(i);
}

const gammaRate = parseInt(gammaRateBinary, 2);
const epsilonRate = parseInt(epsilonRateBinary, 2);
const powerConsumption = gammaRate * epsilonRate;
console.log(powerConsumption);

// Part 2
const getBitCriteria = (arr, num, majority) => {
    const binaryArr = arr.filter(binaryNum => binaryNum.charAt(num) === '1');
    const maj = binaryArr.length >= arr.length / 2 ? '1' : '0';
    const min = maj === '1' ? '0' : '1';
    const criteria = majority === true ? maj : min;
    return criteria;
}

const getBinary = (arr, majority) => {
    let currentArr = arr;
    let filteredArr;
    let i = 0;
    let solution;

    const processArr = () => {
        let criteria = getBitCriteria(currentArr, i, majority);
        filteredArr = currentArr.filter(binaryNum => binaryNum.charAt(i) === criteria);
        if (filteredArr.length === 1) {
            solution = filteredArr[0];
            return;
        } else {
            currentArr = filteredArr;
            filteredArr = [];
            i++;
            processArr();
        }
    }
    processArr();
    return solution;
}

const oxygenBinary = getBinary(input, true);
const co2Binary = getBinary(input, false);
const oxygenGeneratorRating = parseInt(oxygenBinary, 2);
const co2GeneratorRating = parseInt(co2Binary, 2);
const lifeSupportRating = oxygenGeneratorRating * co2GeneratorRating;
console.log(lifeSupportRating);