let bI = require('../dist/bigint');

// let num1 = new bI.BigInt('504153625965821445899632548000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005');
// let num2 = new bI.BigInt('152365214589963258896547125332658965874521452236589895648899856325412154788598521455589632511145785963254111852395475632115698547253622229999998547856923316589');

// test variables
let num1 = new bI.BigInt('1000');
let num2 = new bI.BigInt('-1000000000');


// Test #1
test('Adding num1 + num2', () => {
    expect(num1.add(num2).toString()).toBe('-999999000');
});

// Test #2
test('Subtracting num1 - num2', () => {
    expect(num1.subtract(num2).toString()).toBe('1000001000');
});

// Test #3
test('Reverse Subtracting num2 - num1', () => {
    expect(num2.subtract(num1).toString()).toBe('-1000001000');
});

// Test #4
test('LessThan num1 < num2', () => {
    expect(num1.lessThan(num2)).toBe(false);
});

// Test #5
test('LessThanEqual num1 <= num2', () => {
    expect(num1.lessThanEqual(num2)).toBe(false);
});

// Test #6
test('GreaterThan num1 > num2', () => {
    expect(num1.greaterThan(num2)).toBe(true);
});

// Test #7
test('GreaterThanEqual num1 >= num2', () => {
    expect(num1.greaterThanEqual(num2)).toBe(true);
});

// Test #8
test('Equal num1 == num2', () => {
    expect(num1.equal(num2)).toBe(false);
});