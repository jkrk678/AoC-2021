const di = require('../downloadInput');
const prIn = require('../processInput');
di.downloadInput(2);
const input = prIn.processInput(2);

// Part 1
let h = 0;
let d = 0;
input.forEach(command => {
    const dir = command.split(' ')[0];
    const dis = +command.split(' ')[1];
    if (dir === 'forward') h += dis;
    if (dir === 'up') d -= dis;
    if (dir === 'down') d += dis;
});
console.log(h * d);

// Part 2
let a = 0;
let hp = 0;
let dp = 0;
input.forEach(command => {
    const dir = command.split(' ')[0];
    const dis = +command.split(' ')[1];
    if (dir === 'forward') {
        hp += dis;
        dp += a * dis;
    };
    if (dir === 'up') a -= dis;
    if (dir === 'down') a += dis;
});
console.log(hp * dp);