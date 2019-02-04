let bI = require('../dist/bigint');

// let num1 = new bI.BigInt('504153625965821445899632548000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005');
// let num2 = new bI.BigInt('152365214589963258896547125332658965874521452236589895648899856325412154788598521455589632511145785963254111852395475632115698547253622229999998547856923316589');

let num1 = new bI.BigInt('1000');
let num2 = new bI.BigInt('-100000');


console.time('add');
console.log('num1 + num2: ' + num1.add(num2).toString());
console.timeEnd('add');

console.time('subtract');
console.log('num1 - num2: ' + num1.subtract(num2).toString());
console.timeEnd('subtract');

console.time('reverseSubtract');
console.log('num2 - num1: ' + num2.subtract(num1).toString());
console.timeEnd('reverseSubtract');


console.time('greaterThan');
console.log('num1 > num2: ' + num1.greaterThan(num2));
console.timeEnd('greaterThan');


console.time('greaterThanEqual');
console.log('num1 >= num2: ' + num1.greaterThanEqual(num2));
console.timeEnd('greaterThanEqual');


console.time('lessThan');
console.log('num1 < num2: ' + num1.lessThan(num2));
console.timeEnd('lessThan');


console.time('lessThanEqual');
console.log('num1 <= num2: ' + num1.lessThanEqual(num2));
console.timeEnd('lessThanEqual');


console.time('equal');
console.log('num1 == num2: ' + num1.equal(num2));
console.timeEnd('equal');




// console.log('num1 * num2: ' + num1.multiply(num2));
// console.log('num1 > num2: ' + num1.greaterThan(num2));
// console.log('num1 >= num2: ' + num1.greaterThanEqual(num2));
// console.log('num1 < num2: ' + num1.lessThan(num2));
// console.log('num1 <= num2: ' + num1.lessThanEqual(num2));
// console.log('num1 == num2: ' + num1.equal(num2));