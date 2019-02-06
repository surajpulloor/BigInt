# BigInt
BigInteger Implementation In Typescript

## Purpose
* Javascript VM's have a very fine implementation of IEEE-64 bit double precision floating point spec, 
but still for very very very(number > 2^64) large numbers it gives back Infinity, which isn't a very useful number for computation.
* Even for number < 2^64, numbers with no. of digits greater than 21 are rendered in exponential notation.
* Provide a fast implemenation of a large integer numbers.

## What can this library do?
* Enables using integers > 2^64
* Can perform arthimetic and comparison operations on the numbers
* Perform computation on negative numbers

## Cons
* Have to give numbers as strings
* Uses a slow multiplication algorithm(Repeated addition, need a better space and time efficient algorithm).
* Missing some key artimetic operations

## Dependencies
* Typescript v3.2.4 or greater(install it globally)
* Node & Npm
* Jest Tesing Framework (for unit testing)
* Javascript Engine/Runtime which has atleast implemented the ES5 standard

## How to install dependencies/packages
* ``` npm install ```

## How to build & watch the src files
* The build and watch command's are written as npm scripts. Therefore you can build and watch with the following
* ```npm run build```
* ```npm run watch```

## How to run unit tests
* ```npm run test```

## How to use the library
* If using on node
  ```javascript
  let bigint = require('location of bigint.js'); // ES5
  // or
  import { BigInt } from 'location of bigint.js'; // ES6
  ```
* If using on a browser
  * Use either commonjs or amd


## Operations Implemented
* Arthimetic Ops
  * add
  * subtract
  * multiply (use's the karatsuba algorithm for fast multiplication)
* Comparsion Ops
  * lessThan
  * lessThanEqual
  * greaterThan
  * greaterThanEqual
  * equal

## TODO Operations
* divide
* mod
