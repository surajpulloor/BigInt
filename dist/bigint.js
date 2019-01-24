"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BigInt = /** @class */ (function () {
    function BigInt(num1) {
        this._result = '';
        this._numArray = [];
        this._resultArray = [];
        // Set the fields
        this._num = num1;
        this.createNumArray();
    }
    BigInt.prototype.createNumArray = function () {
        this.numArray = this.num.split('').map(function (val) { return +val; });
    };
    // arthimetic ops 
    BigInt.prototype.add = function (num2) {
        var carry = 0;
        this.createNumArray();
        // Perform the addition
        if (this.length() >= num2.length()) {
            this.resultArray = this.numArray.slice();
            for (var num1Index = this.length() - 1, num2Index = num2.length() - 1; num1Index >= 0; num1Index--, num2Index--) {
                var sum = (num2Index >= 0 ? this.numArray[num1Index] + num2.numArray[num2Index] : this.numArray[num1Index]) + carry;
                this.resultArray[num1Index] = (sum >= 10 && num1Index != 0 ? sum - 10 : sum);
                carry = sum >= 10 ? 1 : 0;
            }
        }
        else {
            this.resultArray = num2.numArray.slice();
            for (var num1Index = this.length() - 1, num2Index = num2.length() - 1; num2Index >= 0; num1Index--, num2Index--) {
                var sum = (num1Index >= 0 ? this.numArray[num1Index] + num2.numArray[num2Index] : num2.numArray[num2Index]) + carry;
                this.resultArray[num2Index] = (sum >= 10 && num2Index != 0 ? sum - 10 : sum);
                carry = sum >= 10 ? 1 : 0;
            }
        }
        // Convert the computed result array to string
        return this.numArray2NumStr();
    };
    BigInt.prototype.multiply = function (num2) {
        var smallestNumber = this.length() <= num2.length() ? this : num2;
        var largestNumber = this.length() >= num2.length() ? this : num2;
        var accumulator = new BigInt('0');
        var index = 1;
        // console.log('is this true? : ' + smallestNumber.greaterThan(new BigInt('1')));
        for (var i = 1; smallestNumber.greaterThanEqual(new BigInt(i.toString())); i++) {
            accumulator.num = accumulator.add(largestNumber);
        }
        // set the resultArrays
        this.resultArray = accumulator.resultArray;
        return this.numArray2NumStr();
    };
    // Comparison ops
    BigInt.prototype.lessThan = function (num2) {
        if (this.length() < num2.length()) {
            return true;
        }
        else if (this.length() > num2.length()) {
            return false;
        }
        else {
            // This works by comparing the ith of num1 and num2
            // for e.g if num1 = 2235 and num2 = 2535
            // then we'll check num1[0] < num2[0], which is false(i.e 2 < 2)
            // then we check num1[1] < num2[1], which is true, its here where we'll break the loop
            for (var i = 0; i < this.length(); i++) {
                if (this.numArray[i] < num2.numArray[i]) {
                    return true;
                }
            }
            return false;
        }
    };
    BigInt.prototype.lessThanEqual = function (num2) {
        if (this.length() < num2.length()) {
            return true;
        }
        else if ((this.length() > num2.length())) {
            return false;
        }
        else {
            if (this.num == num2.num) {
                return true;
            }
            else {
                // This works by comparing the ith of num1 and num2
                // for e.g if num1 = 2235 and num2 = 2535
                // then we'll check num1[0] < num2[0], which is false(i.e 2 < 2)
                // then we check num1[1] < num2[1], which is true, its here where we'll break the loop
                for (var i = 0; i < this.length(); i++) {
                    if (this.numArray[i] < num2.numArray[i]) {
                        return true;
                    }
                }
                return false;
            }
        }
    };
    BigInt.prototype.greaterThan = function (num2) {
        if (this.length() > num2.length()) {
            return true;
        }
        else if (this.length() < num2.length()) {
            return false;
        }
        else {
            // This works by comparing the ith of num1 and num2
            // for e.g if num1 = 2235 and num2 = 2535
            // then we'll check num1[0] < num2[0], which is false(i.e 2 < 2)
            // then we check num1[1] < num2[1], which is true, its here where we'll break the loop
            for (var i = 0; i < this.length(); i++) {
                if (this.numArray[i] > num2.numArray[i]) {
                    return true;
                }
            }
            return false;
        }
    };
    BigInt.prototype.greaterThanEqual = function (num2) {
        if (this.length() > num2.length()) {
            return true;
        }
        else if ((this.length() < num2.length())) {
            return false;
        }
        else {
            if (this.num == num2.num) {
                return true;
            }
            else {
                // This works by comparing the ith of num1 and num2
                // for e.g if num1 = 2235 and num2 = 2535
                // then we'll check num1[0] < num2[0], which is false(i.e 2 < 2)
                // then we check num1[1] < num2[1], which is true, its here where we'll break the loop
                for (var i = 0; i < this.length(); i++) {
                    if (this.numArray[i] > num2.numArray[i]) {
                        return true;
                    }
                }
                return false;
            }
        }
    };
    BigInt.prototype.equal = function (num2) {
        if (this.num == num2.num) {
            return true;
        }
        else {
            return false;
        }
    };
    BigInt.prototype.length = function () {
        return this._num.length;
    };
    // conversions methods
    BigInt.prototype.numArray2NumStr = function () {
        return (this.result = this.resultArray.toString().replace(/,+/g, ''));
    };
    Object.defineProperty(BigInt.prototype, "num", {
        get: function () {
            return this._num;
        },
        // getters and setters
        // ----- num -------//
        set: function (num) {
            this._num = num;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BigInt.prototype, "result", {
        get: function () {
            return this._result;
        },
        // ----- result -------//
        set: function (result) {
            this._result = result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BigInt.prototype, "numArray", {
        get: function () {
            return this._numArray;
        },
        // ----- numArray -------//
        set: function (numArray) {
            this._numArray = numArray;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BigInt.prototype, "resultArray", {
        get: function () {
            return this._resultArray;
        },
        // ----- resultArray -------//
        set: function (resultArray) {
            this._resultArray = resultArray;
        },
        enumerable: true,
        configurable: true
    });
    return BigInt;
}());
exports.BigInt = BigInt;
