import { BigIntNumber } from "./bigint_number";

export class BigInt {
    constructor(num: string) {
        // Set the fields
        this._numStr = num;
        this._signedNumber = this.numStr[0] == '-' ? true : false;

        // Form numArray
        this._numArray = this.numStr.split('').map((val) => val === '-' ? 0 : +val);

        // Remove the negative sign from the number
        if (this._signedNumber) {
            this._numArray.shift();
        }
    }

    // ************* PUBLIC ARTHIMETIC METHODS GO HERE ************* //
    
    // arthimetic ops 
    public add(num2: BigInt): string {
        let carry = 0;

        // Check if num1 and num2 are positive or negative then add
        if (
            (this.num.signedNumber && num2.num.signedNumber) ||
            (!this.num.signedNumber && !num2.num.signedNumber)
        ) {
            // Check is num1 has more digits than num2
            if (this.num.totalNoOfDigits() >= num2.num.totalNoOfDigits()) {
                this.result.numArray = this.num.numArraySlice();
                for (let num1Index = this.num.totalNoOfDigits() - 1, num2Index = num2.num.totalNoOfDigits() - 1; num1Index >= 0; num1Index--, num2Index--) {
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
                for (let num1Index = this.num.totalNoOfDigits() - 1, num2Index = num2.num.totalNoOfDigits() - 1; num2Index >= 0; num1Index--, num2Index--) {
                    let sum = (
                        num1Index >= 0 ?
                            this.num.getIthDigit(num1Index) + num2.num.getIthDigit(num2Index) :
                            num2.num.getIthDigit(num2Index)
                    ) + carry;
                    this.result.setIthDigit(num2Index, (sum >= 10 && num2Index != 0 ? sum - 10 : sum));
                    carry = sum >= 10 ? 1 : 0;
                }
            }

            // if num1 is signed and num2 is signed then the result will be a negative number
            if (this.num.signedNumber && num2.num.signedNumber) { // both are negative
                this.result.signedNumber = true;
            } else { // both are positive
                this.result.signedNumber = false;
            }


        } else if (this.num.signedNumber && !num2.num.signedNumber) { // either num1 is negative or num2 then call subtract

            // Create to temp BigInt objects
            // We don't want to interfere with num1 and num2 objects
            // We need to remove - before creating tempNum1 object
            let tempNum1 = new BigInt(this.numStr.replace(/\-+/g, ''));
            let tempNum2 = new BigInt(num2.numStr);
            
            // Compute the difference
            let diffResult = tempNum2.subtract(tempNum1);
            
            // The result is a string therefore need to create a BigIntNumber object
            this.result = new BigIntNumber(diffResult);

        } else if (!this.num.signedNumber && num2.num.signedNumber) {

            // Create to temp BigInt objects
            // We don't want to interfere with num1 and num2 objects
            let tempNum1 = new BigInt(this.numStr);

            // We need to remove - before creating tempNum2 object
            let tempNum2 = new BigInt(num2.numStr.replace(/\-+/g, ''));

            // Compute the difference
            let diffResult = tempNum1.subtract(tempNum2);

            // The result is a string therefore need to create a BigIntNumber object
            this.result = new BigIntNumber(diffResult);

        }

        this.resultStr = this.numArray2NumStr(this.result);

        return this.resultStr;
    }


    public subtract(num2: BigInt) {

        let borrow = 0;

        // Create a clone's of num1 & num2
        // We do this because we will change num1/num2 while subtracting
        let num1Clone = this.clone();
        let num2Clone = this.clone();
        

        if ((!num1Clone.signedNumber && !num2Clone.signedNumber) || // num1 and num2 are positive or num1 and num2 are negative
            ((num1Clone.signedNumber && num2Clone.signedNumber))
        ) {
            // Create two clone bigint objects and make the numbers positive
            let tempNum1 = new BigInt(this.numStr.replace(/\-+/g, ''));
            let tempNum2 = new BigInt(num2.numStr.replace(/\-+/g, ''));

            if (tempNum1.greaterThanEqual(tempNum2)) {
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

            }

            // Set the sign bit
            if (this.num.signedNumber && num2.num.signedNumber) { // both are neagtive
                this.result.signedNumber = tempNum1.greaterThan(tempNum2);
            } else { // both are positive
                this.result.signedNumber = tempNum1.lessThan(tempNum2);
            }


        } else if (!this.num.signedNumber && num2.num.signedNumber) { // num2 is neagtive

            // Change the signed bit to positive
            num2.num.signedNumber = false;

            // Compute addition
            this.result = new BigIntNumber(this.add(num2));

            // Change the signed bit to negative
            num2.num.signedNumber = true;


        } else if (this.num.signedNumber && !num2.num.signedNumber) { // num1 is neagtive


            // Change the signed bit to negative
            num2.num.signedNumber = true;

            // Compute addition
            this.result = new BigIntNumber(this.add(num2));

            // Change the signed bit to negative
            num2.num.signedNumber = false;


        }

        this.resultStr = this.numArray2NumStr(this.result);

        return this.resultStr;
    }

    // TODO: Use a fast algorithm to slow to use add()
    public multiply(num2: BigInt) {
        
    }

    // ************* PUBLIC COMPARISON METHODS GO HERE ************* //


    public lessThan(num2: BigInt) {
        if (!this.signedNumber && !num2.signedNumber) { // both number are positive

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
                    if (this.getIthDigit(i) < num2.getIthDigit(i)) {
                        return true;
                    }
                }
                return false;
            }

        } else if (this.signedNumber && num2.signedNumber) { // if both numbers are negative

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
                    if (this.getIthDigit(i) > num2.getIthDigit(i)) {
                        return true;
                    }
                }
                return false;

            }

        } else if (!this.signedNumber && num2.signedNumber) { // num1 is positive and num2 is negative
            return false;
        } else {
            return true;
        }
    }

    public lessThanEqual(num2: BigInt) {
        if (!this.signedNumber && !num2.signedNumber) {
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
                            this.getIthDigit(i) < num2.getIthDigit(i) &&
                            this.getIthDigit(i) !== num2.getIthDigit(i)
                        ) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    return false;
                }
            }
        } else if (this.signedNumber && num2.signedNumber) {
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
                            this.getIthDigit(i) > num2.getIthDigit(i) &&
                            this.getIthDigit(i) !== num2.getIthDigit(i)
                        ) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    return false;
                }
            }
        } else if (!this.signedNumber && num2.signedNumber) {
            return false;
        } else {
            return true;
        }
    }

    public greaterThan(num2: BigInt) {
        if (!this.signedNumber && !num2.signedNumber) {
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
                    if (this.getIthDigit(i) > num2.getIthDigit(i)) {
                        return true;
                    }
                }
                return false;
            }
        } else if (this.signedNumber && num2.signedNumber) {
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
                    if (this.getIthDigit(i) < num2.getIthDigit(i)) {
                        return true;
                    }
                }
                return false;
            }
        } else if (!this.signedNumber && num2.signedNumber) {
            return true;
        } else {
            return false;
        }
    }

    public greaterThanEqual(num2: BigInt) {

        if (!this.signedNumber && !num2.signedNumber) {

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
                            this.getIthDigit(i) > num2.getIthDigit(i) && 
                            this.getIthDigit(i) !== num2.getIthDigit(i)
                        ) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            }

        } else if (this.signedNumber && num2.signedNumber) {

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
                            this.getIthDigit(i) < num2.getIthDigit(i) && 
                            this.getIthDigit(i) !== num2.getIthDigit(i)
                        ) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            }

        } else if (!this.signedNumber && num2.signedNumber) {
            return true;
        } else {
            return false;
        }
        
    }

    
    public equal(num2: BigInt) {
        if (this.numStr == num2.numStr) {
            return true;
        } else {
            return false;
        }
    }


    // ************* PUBLIC HELPER METHODS GO HERE ************* //

    // Converts a BigInt number to String
    public toString() {

        // Convert the numArray to a string and replace the commas with empty string
        let numStr = this.numArray.toString().replace(/,+/g, '');

        // Trim zeros from the beginning
        numStr = this.trim(numStr, '0');

        // Put in the minus sign if the result is negative
        numStr = this.signedNumber ? '-' + numStr : numStr;

        return numStr;
    }

    // Clone's a BigInt object
    public clone() {
        return new BigInt(this.numStr);
    }

    public abs() {
        return new BigInt(this.numStr.replace(/\-+/g, ''));
    }

    // Gives the length of a number (totalNoOfDigits) + ('-' if number is neagtive) 
    public length() {
        return this.numStr.length;
    }

    // Gets the total number of digits in a number excluding the sign of the number
    public totalNoOfDigits() {
        return this._numArray.length;
    }



    // ************* PRIVATE HELPER METHODS GO HERE ************* //


    // Gets the ith digit of BigInt
    private getIthDigit(i: number): number {
        return this._numArray[i];
    }

    // Gets the ith digit of BigInt
    private setIthDigit(i: number, digit: number): number {
        return this._numArray[i] = digit;
    }

    // Used for trimming zeros of the start of a number
    private trim(str: string, mask: string) {
        while (~mask.indexOf(str[0])) {
            str = str.slice(1);
        }

        return str;
    }

    // ************* PUBLIC GETTERS & SETTERS GO HERE ************* //
    
    public get signedNumber() : boolean {
        return this._signedNumber
    }

    
    public set signedNumber(v : boolean) {
        this._signedNumber = v;
    }
    
    public get numArray() : Array<number> {
        return this._numArray
    }

    
    public set numArray(v : Array<number>) {
        this._numArray = v;
    }

    public get numStr(): string {
        return this._numStr;
    }
    
    public set numStr(value: string) {
        this._numStr = value;
    }


    // ************* MEMBERS GO HERE ************* //

    private _numStr: string;
    private _signedNumber: boolean;
    private _numArray: Array<number>;
}