import { BigIntNumber } from "./bigint_number";

export class BigInt {
    constructor(num1: string) {
        // Set the fields
        this._numStr = num1;
        this._resultStr = '0';
        
        // Init BigIntNumber
        this._number = new BigIntNumber(this._numStr);
        this._result = new BigIntNumber(this._resultStr);
    }

    
    // arthimetic ops 
    public add(num2: BigInt): string {
        let carry = 0;

        // Perform the addition
        if (this.length() >= num2.length()) {
            this.result.numArray = this.num.numArraySlice();
            for (let num1Index = this.length() - 1, num2Index = num2.length() - 1; num1Index >= 0; num1Index--, num2Index--) {
                let sum = (
                            num2Index >= 0 ? 
                            this.num.getIthDigit(num1Index) + num2.num.getIthDigit(num2Index) : 
                            this.num.getIthDigit(num1Index)
                        ) + carry;
                this.result.setIthDigit(num1Index, (sum >= 10 && num1Index != 0 ? sum - 10 : sum));
                carry = sum >= 10 ? 1 : 0;
            }
        } else {
            this.result.numArray = num2.num.numArraySlice();
            for (let num1Index = this.length() - 1, num2Index = num2.length() - 1; num2Index >= 0; num1Index--, num2Index--) {
                let sum = (
                            num1Index >= 0 ? 
                            this.num.getIthDigit(num1Index) + num2.num.getIthDigit(num2Index) : 
                            num2.num.getIthDigit(num2Index)
                        ) + carry;
                this.result.setIthDigit(num2Index, (sum >= 10 && num2Index != 0 ? sum - 10 : sum));
                carry = sum >= 10 ? 1 : 0;
            }
        }

        this.resultStr = this.numArray2NumStr(this.result);

        return this.resultStr;
    }

    /**
     * subtract
     */
    public subtract(num2: BigInt) {

        let borrow = 0;
        
        // Init BigIntNumber to avoid used numArray
        this.num.initAgain();
        num2.num.initAgain();


        // Check which number is larger
        if (this.greaterThanEqual(num2)) {

            // Make a shallow copy of num1
            this.result.numArray = this.num.numArraySlice();

            // Compute the diff
            for (let num1Index = this.num.totalNoOfDigits() - 1, num2Index = num2.num.totalNoOfDigits() - 1; num1Index >= 0; num1Index--, num2Index--) {
                let diff;
                if (num2Index >= 0) {
                    if (this.num.getIthDigit(num1Index) >= num2.num.getIthDigit(num2Index)) {
                        diff = this.num.getIthDigit(num1Index) - num2.num.getIthDigit(num2Index);
                    } else {
                        
                        // We need this in case there are a bunch of zeros between iNum1Index and num1Index
                        let iNum1Index;
                        
                        // Find the borrow
                        for (iNum1Index = num1Index - 1; iNum1Index >= 0; iNum1Index--) {
                            if (this.num.getIthDigit(iNum1Index) > 0) {
                                // Update the ith num1Index
                                this.num.setIthDigit(iNum1Index, this.num.getIthDigit(iNum1Index) - 1);
                                // Update borrow
                                borrow = this.num.getIthDigit(num1Index) + 10;
                                break;
                            }
                        }

                        // Go through num1 once more to set the zeros between num1Index to iNumIndex to 9
                        for (let i = num1Index - 1; i > iNum1Index; i--) {
                            this.num.setIthDigit(i, 9);
                        }

                        // Compute the difference
                        diff = borrow - num2.num.getIthDigit(num2Index);

                    }

                } else {
                    diff = this.num.getIthDigit(num1Index);
                }
                
                // Set the ith difference
                this.result.setIthDigit(num1Index, diff);
            }

            // Set the sign bit
            this.result.signedNumber = false;


        } else {
            // Make a shallow copy of num2
            this.result.numArray = num2.num.numArraySlice();

            // Compute the diff
            for (let num1Index = this.num.totalNoOfDigits() - 1, num2Index = num2.num.totalNoOfDigits() - 1; num2Index >= 0; num1Index--, num2Index--) {
                let diff;
                if (num1Index >= 0) {
                    if (num2.num.getIthDigit(num2Index) >= this.num.getIthDigit(num1Index)) {
                        diff = num2.num.getIthDigit(num2Index) - this.num.getIthDigit(num1Index);
                    } else {
                        
                        // We need this in case there are a bunch of zeros between iNum1Index and num1Index
                        let iNum2Index;
                        
                        // Find the borrow
                        for (iNum2Index = num2Index - 1; iNum2Index >= 0; iNum2Index--) {
                            if (num2.num.getIthDigit(iNum2Index) > 0) {
                                // Update the ith num1Index
                                num2.num.setIthDigit(iNum2Index, num2.num.getIthDigit(iNum2Index) - 1);
                                // Update borrow
                                borrow = num2.num.getIthDigit(num2Index) + 10;
                                break;
                            }
                        }

                        // Go through num1 once more to set the zeros between num1Index to iNumIndex to 9
                        for (let i = num2Index - 1; i > iNum2Index; i--) {
                            num2.num.setIthDigit(i, 9);
                        }

                        // Compute the difference
                        diff = borrow - this.num.getIthDigit(num1Index);

                    }

                } else {
                    diff = num2.num.getIthDigit(num2Index);
                }
                
                // Set the ith difference
                this.result.setIthDigit(num2Index, diff);
            }

            // Set the sign bit
            this.result.signedNumber = true;
        }

        this.resultStr = this.numArray2NumStr(this.result);

        return this.resultStr;
    }

    
    public multiply(num2: BigInt) {
        
    }

    // Comparison ops
    public lessThan(num2: BigInt) {
        if (this.length() < num2.length()) {
            return true;
        } else if (this.length() > num2.length()) {
            return false;
        } else {
            // This works by comparing the ith of num1 and num2
            // for e.g if num1 = 2235 and num2 = 2535
            // then we'll check num1[0] < num2[0], which is false(i.e 2 < 2)
            // then we check num1[1] < num2[1], which is true, its here where we'll break the loop
            for (let i = 0; i < this.length(); i++) {
                if (this.num.getIthDigit(i) < num2.num.getIthDigit(i)) {
                    return true;
                }
            }
            return false;
        }
    }

    public lessThanEqual(num2: BigInt) {
        if (this.length() < num2.length()) {
            return true;
        } else if ((this.length() > num2.length())) {
            return false;
        } else {
            if (this.numStr == num2.numStr) {
                return true;
            } else {
                // This works by comparing the ith of num1 and num2
                // for e.g if num1 = 2235 and num2 = 2535
                // then we'll check num1[0] < num2[0], which is false(i.e 2 < 2)
                // then we check num1[1] < num2[1], which is true, its here where we'll break the loop
                for (let i = 0; i < this.length(); i++) {
                    if (
                        this.num.getIthDigit(i) < num2.num.getIthDigit(i) &&
                        this.num.getIthDigit(i) !== num2.num.getIthDigit(i)
                    ) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return false;
            }
        }
    }

    public greaterThan(num2: BigInt) {
        if (this.length() > num2.length()) {
            return true;
        } else if (this.length() < num2.length()) {
            return false;
        } else {
            // This works by comparing the ith of num1 and num2
            // for e.g if num1 = 2235 and num2 = 2535
            // then we'll check num1[0] < num2[0], which is false(i.e 2 < 2)
            // then we check num1[1] < num2[1], which is true, its here where we'll break the loop
            for (let i = 0; i < this.length(); i++) {
                if (this.num.getIthDigit(i) > num2.num.getIthDigit(i)) {
                    return true;
                }
            }
            return false;
        }
    }

    public greaterThanEqual(num2: BigInt) {
        if (this.length() > num2.length()) {
            return true;
        } else if ((this.length() < num2.length())) {
            return false;
        } else {
            if (this.numStr == num2.numStr) {
                return true;
            } else {
                // This works by comparing the ith of num1 and num2
                // for e.g if num1 = 2235 and num2 = 2535
                // then we'll check num1[0] < num2[0], which is false(i.e 2 < 2)
                // then we check num1[1] < num2[1], which is true, its here where we'll break the loop
                for (let i = 0; i < this.length(); i++) {
                    if (
                        this.num.getIthDigit(i) > num2.num.getIthDigit(i) && 
                        this.num.getIthDigit(i) !== num2.num.getIthDigit(i)
                    ) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        }
    }


    public equal(num2: BigInt) {
        if (this.numStr == num2.numStr) {
            return true;
        } else {
            return false;
        }
    }

    public length() {
        return this._numStr.length;
    }

    // conversions methods
    private numArray2NumStr(num: BigIntNumber) {

        // Convert the numArray to a string and replace the commas with empty string
        let numStr = num.numArray.toString().replace(/,+/g, '');

        // trim the zeros from the start
        numStr = this.trim(numStr, '0');

        // Put in the minus sign if the result is negative
        numStr = this.result.signedNumber ? '-' + numStr : numStr;

        return numStr;
    }

    // Used to trim prefixed 0's in the result
    private trim(s: string, mask: string) {
        while (~mask.indexOf(s[0])) {
            s = s.slice(1);
        }
        while (~mask.indexOf(s[s.length - 1])) {
            s = s.slice(0, -1);
        }
        return s;
    }

    // getters and setters
    // ----- num -------//
    set numStr(num: string) {
        this._numStr = num;
    }

    get numStr(): string {
        return this._numStr;
    }

    // ----- result -------//
    set resultStr(result: string) {
        this._resultStr = result;
    }

    get resultStr(): string {
        return this._resultStr;
    }

    // ----- numArray -------//
    set num(numArray: BigIntNumber) {
        this._number = numArray;
    }

    get num(): BigIntNumber {
        return this._number;
    }

    // ----- resultArray -------//
    set result(resultArray: BigIntNumber) {
        this._result = resultArray;
    }

    get result(): BigIntNumber {
        return this._result;
    }

    private _numStr: string;
    private _resultStr: string;

    private _number: BigIntNumber;
    private _result: BigIntNumber;
}