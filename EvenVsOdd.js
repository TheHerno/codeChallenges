const convertToArray = number => {
    return number
        .toString()
        .split('')
        .filter(n => n !== '-');
};

// if even===true checks if all numbers are even, else it checks if all are odd
const isEvenOrOdd = (array, even) => { 
    return !array.some(n => (even ? Number(n) % 2 !== 0 : Number(n) % 2 === 0));
};

// First Part:
// Write this function such that it returns true if each
// digit in a number is even, and returns false if any number
// is odd. Use the simple unit tests below as a guide.
const allDigitsEven = number => {
    const array = convertToArray(number);
    return isEvenOrOdd(array, true);
};

// Second Part:
// Write this function such that it returns true if each
// digit in a number is odd, and returns false if any number
// is even. Use the simple unit tests below as a guide.
const allDigitsOdd = number => {
    const array = convertToArray(number);
    return isEvenOrOdd(array, false);
};


//Tests...
const verify = (tester, sample, expected) => {
  const result = tester(sample);
  if ( result === expected) {
    console.log(`ok - "${sample}"`);
  } else {
    console.log(`not ok - "${sample}" should be ${expected}, not ${result}`);
  }
}

const test = () => {
  // even
  verify(allDigitsEven, 1, false);
  verify(allDigitsEven, 2, true);
  verify(allDigitsEven, 25, false);
  verify(allDigitsEven, 2046, true);
  verify(allDigitsEven, 3468, false);
  verify(allDigitsEven, -27, false);
  verify(allDigitsEven, -3468, false);
  verify(allDigitsEven, -2, true);

  // odd
  verify(allDigitsOdd, 25, false);
  verify(allDigitsOdd, -27, false);
  verify(allDigitsOdd, 2046, false);
  verify(allDigitsOdd, 3468, false);
  verify(allDigitsOdd, 135, true);
}

console.clear();
test();
console.log("Done!");
