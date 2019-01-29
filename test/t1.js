let bI = require('../dist/bigint');

let num1 = new bI.BigInt('504153625');
let num2 = new bI.BigInt('8000000');

console.log('num1 + num2: ' + num1.add(num2));
console.log('num1 * num2: ' + num1.multiply(num2));
console.log('num1 > num2: ' + num1.greaterThan(num2));
console.log('num1 >= num2: ' + num1.greaterThanEqual(num2));
console.log('num1 < num2: ' + num1.lessThan(num2));
console.log('num1 <= num2: ' + num1.lessThanEqual(num2));
console.log('num1 == num2: ' + num1.equal(num2));