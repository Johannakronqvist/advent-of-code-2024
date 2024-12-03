let fs = require("fs");

const rawData = fs.readFileSync("input.txt", "utf-8");

const mulPattern = /mul\([0-9]{1,3},[0-9]{1,3}\)/g;

let uncorruptedInstructions = rawData.match(mulPattern);

let mulTotal = 0;
let numPattern = /mul\((\d{1,3}),\s*(\d{1,3})\)/;

uncorruptedInstructions.forEach((mul) => {
  let getNumbers = mul.match(numPattern);

  let num1 = parseInt(getNumbers[1]);
  let num2 = parseInt(getNumbers[2]);
  let mulSum = num1 * num2;

  mulTotal += mulSum;
});

console.log(mulTotal);
