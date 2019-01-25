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

## Cons
* Have to give numbers as strings
* Uses a slow multiplication algorithm(Repeated addition, need a better space and time efficient algorithm).
* Missing some key artimetic operations

## Operations Implemented
* Arthimetic Ops
  * add
  * multiply
* Comparsion Ops
  * lessThan
  * lessThanEqual
  * greaterThan
  * greaterThanEqual
  * equal

## TODO Operations
* subtract
* divide
* mod
