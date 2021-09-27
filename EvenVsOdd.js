const isEvenOrOdd = (number, even) => {
    let n = number; // para no reasignar parámetro
    let allEvenOrOdd = true;
    while ((n >= 1 || n <= -1) && allEvenOrOdd) {
        if (Math.floor(Math.abs(n)) % 2 !== (even ? 0 : 1)) {
            allEvenOrOdd = false;
        }
        n = n / 10;
    }
    return allEvenOrOdd;
};

const allDigitsEven = number => {
    return isEvenOrOdd(number, true);
};
const allDigitsOdd = number => {
    return isEvenOrOdd(number, false);
};

//Tests...
const verify = (tester, sample, expected) => {
    const result = tester(sample);
    if (result === expected) {
        console.log(`ok - "${sample}"`);
    } else {
        console.log(
            `not ok - "${sample}" should be ${expected}, not ${result}`
        );
    }
};

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
};

console.clear();
test();
console.log('Done!');
