const fs = require("fs");

// Read the file
const rawData = fs.readFileSync("input.txt", "utf8");

// Initialize an object to store the parsed data
const keys = [];
const lines = [];

// Process the data
// Process the data
rawData.split("\n").forEach((line) => {
  if (line.trim()) {
    const [key, values] = line.split(":");
    keys.push(parseInt(key.trim())); // Parse the key as an integer
    lines.push(values.trim().split(" ").map(Number)); // Parse the line into an array of numbers
  }
});

let totalSum = 0;
let addedToTotal = 0;
let key;
//iterate over dataInput object
for (let i = 0; i < keys.length; i++) {
  key = parseInt(keys[i]);
  let line = lines[i];
  bridgeRepair(line);
  addedToTotal = 0;
}

function bridgeRepair(nums) {
  if (nums.length === 1) {
    if (nums[0] === key && addedToTotal === 0) {
      console.log("added to total", addedToTotal);
      totalSum += key;
      addedToTotal = 1;
      console.log(`TOTALSUM updated to ${totalSum} for key ${key}`);
    }
    return true;
  }
  if (nums[0] >= key && nums.every((num, index) => index === 0 || num !== 1)) {
    // Log the skipped path for debugging
    //console.log(`Skipping path: nums=${nums}, key=${key}`);
  } else {
    let addition = nums[0] + nums[1];
    bridgeRepair([addition, ...nums.slice(2)]);

    let multiplication = nums[0] * nums[1];
    bridgeRepair([multiplication, ...nums.slice(2)]);
  }
}
