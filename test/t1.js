let bI = require('../dist/bigint');

// let num1 = new bI.BigInt('504153625965821445899632548000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005125874693251452158896325412589652365226574125552669854125669852314582148547965231552463258965741253996587452145236589657441253265896352333365215245555896574555632663215898778541256985485');
// let num2 = new bI.BigInt('152365214589963258896547125332658965874521452236589895648899856325412154788598521455589632511145785963254111852395475632115698547253622229999998547856923316589412536254859658745231526985478512532658957458125325612547778569852142562258745886963254125874589996325412555233221245899557452114523666578845212365478889652114523365289574125632554125577');

let num1 = new bI.BigInt('-1000000');
let num2 = new bI.BigInt('00000');

console.log('No. of digits: ' + num1.totalNoOfDigits());


console.time('add');
console.log('num1 + num2: ' + num1.add(num2).toString());
console.timeEnd('add');

console.time('subtract');
console.log('num1 - num2: ' + num1.subtract(num2).toString());
console.timeEnd('subtract');

console.time('reverseSubtract');
console.log('num2 - num1: ' + num2.subtract(num1).toString());
console.timeEnd('reverseSubtract');

console.time('multiplication');
console.log('num1 * num2: ' + num1.multiply(num2).toString());
console.timeEnd('multiplication');


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