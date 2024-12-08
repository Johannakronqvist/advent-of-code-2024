let fs = require("fs");

const rawData = fs.readFileSync("input.txt", "utf-8");

const mulPattern = /mul\([0-9]{1,3},[0-9]{1,3}\)/g;
const combinedPattern = /(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g;

let uncorruptedInstructions = rawData.match(combinedPattern);

console.log(uncorruptedInstructions);

let mulTotal = 0;
let numPattern = /mul\((\d{1,3}),\s*(\d{1,3})\)/;

let isEnabled = true;

uncorruptedInstructions.forEach((mul) => {
  if (mul.match(/don\'t\(\)/g)) isEnabled = false;
  if (mul.match(/do\(\)/g)) isEnabled = true;
  if (mul.match(numPattern) && isEnabled) {
    let getNumbers = mul.match(numPattern);

    let num1 = parseInt(getNumbers[1]);
    let num2 = parseInt(getNumbers[2]);
    let mulSum = num1 * num2;

    mulTotal += mulSum;
  }
});

console.log(mulTotal);
