const fs = require("fs");

const rawData = fs.readFileSync("input.txt", "utf-8");

const reports = rawData.trim().split(/\r?\n/).map((line) => {
    return line.split('')
});

let xmasCounter = 0; 

function findXmas(data) {
    data.forEach((list, index) => {
        for(let i = 0; i < list.length; i++) {
            if(list[i] === "X") {
                checkForXmas(data, index, i)
            }
        }
    });
}

function checkForXmas(data, arr, pos) {
   leftToright(data, arr, pos)
   rightToLeft(data, arr, pos)
   diagonal(data, arr, pos)
   diagonalBackW(data, arr, pos)
   diagonalUpwards(data, arr, pos)
   diagonalUpwardsBackw(data, arr, pos)
   upToDown(data, arr, pos)
   downToUp(data, arr, pos)
}

function leftToright(data, array, position) {
    if (position + 3 < data[array].length) {
        const M = data[array][position + 1];
        const A = data[array][position + 2];
        const S = data[array][position + 3];
        if (M === 'M' && A === 'A' && S === 'S') {
            xmasCounter += 1;
            console.log(`Left to Right XMAS found at (${array},${position})`);
        }
    }
}

function rightToLeft(data, array, position) {
    if (position - 3 >= 0) {
        const M = data[array][position - 1];
        const A = data[array][position - 2];
        const S = data[array][position - 3];
        if (M === 'M' && A === 'A' && S === 'S') {
            xmasCounter += 1;
            console.log(`Right to Left XMAS found at (${array},${position})`);
        }
    }
}

function upToDown(data, array, position) {
    if (array + 3 < data.length) {
        const M = data[array + 1][position];
        const A = data[array + 2][position];
        const S = data[array + 3][position];
        if (M === 'M' && A === 'A' && S === 'S') {
            xmasCounter += 1;
            console.log(`Up to Down XMAS found at (${array},${position})`);
        }
    }
}

function downToUp(data, array, position) {
    if (array - 3 >= 0) { 
        const M = data[array - 1][position];
        const A = data[array - 2][position];
        const S = data[array - 3][position];
        if (M === 'M' && A === 'A' && S === 'S') {
            xmasCounter += 1;
            console.log(`Down to Up XMAS found at (${array},${position})`);
        }
    }
}

function diagonal(data, array, position) {
    if (array + 3 < data.length && position + 3 < data[array].length) {
        const M = data[array + 1][position + 1];
        const A = data[array + 2][position + 2];
        const S = data[array + 3][position + 3];
        if (M === 'M' && A === 'A' && S === 'S') {
            xmasCounter += 1;
            console.log(`Diagonal Down-Right XMAS found at (${array},${position})`);
        }
    }
}

function diagonalBackW(data, array, position) {
    if (array + 3 < data.length && position - 3 >= 0) {
        const M = data[array + 1][position - 1];
        const A = data[array + 2][position - 2];
        const S = data[array + 3][position - 3];
        if (M === 'M' && A === 'A' && S === 'S') {
            xmasCounter += 1;
            console.log(`Diagonal Down-Left XMAS found at (${array},${position})`);
        }
    }
}

function diagonalUpwardsBackw(data, array, position) {
    if (array - 3 >= 0 && position - 3 >= 0) {
        const M = data[array - 1][position - 1];
        const A = data[array - 2][position - 2];
        const S = data[array - 3][position - 3];
        if (M === 'M' && A === 'A' && S === 'S') {
            xmasCounter += 1;
            console.log(`Diagonal Up-Left XMAS found at (${array},${position})`);
        }
    }
}

function diagonalUpwards(data, array, position) {
    if (array - 3 >= 0 && position + 3 < data[array].length) {
        const M = data[array - 1][position + 1];
        const A = data[array - 2][position + 2];
        const S = data[array - 3][position + 3];
        if (M === 'M' && A === 'A' && S === 'S') {
            xmasCounter += 1;
            console.log(`Diagonal Up-Right XMAS found at (${array},${position})`);
        }
    }
}

findXmas(reports);
console.log(`Total XMAS patterns found: ${xmasCounter}`);

