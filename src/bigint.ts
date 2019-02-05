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
    public add(num2: BigInt) {
        let carry = 0;

        // Create a clone of num1
        let result = this.clone();

        // Check if num1 and num2 are positive or negative then add
        if (
            (this.signedNumber && num2.signedNumber) ||
            (!this.signedNumber && !num2.signedNumber)
        ) {
            // Check is num1 has more digits than num2
            if (this.totalNoOfDigits() >= num2.totalNoOfDigits()) {
                
                // Add num1 + num2
                for (let num1Index = this.totalNoOfDigits() - 1, num2Index = num2.totalNoOfDigits() - 1; num1Index >= 0; num1Index--, num2Index--) {
                    let sum = (
                        num2Index >= 0 ?
                            this.getIthDigit(num1Index) + num2.getIthDigit(num2Index) :
                            this.getIthDigit(num1Index)
                    ) + carry;
                    result.setIthDigit(num1Index, (sum >= 10 && num1Index != 0 ? sum - 10 : sum));
                    carry = sum >= 10 ? 1 : 0;
                }
            } else {
                // Need to change the clone here
                result = num2.clone();

                // Add num2 + num1
                for (let num1Index = this.totalNoOfDigits() - 1, num2Index = num2.totalNoOfDigits() - 1; num2Index >= 0; num1Index--, num2Index--) {
                    let sum = (
                        num1Index >= 0 ?
                            this.getIthDigit(num1Index) + num2.getIthDigit(num2Index) :
                            num2.getIthDigit(num2Index)
                    ) + carry;
                    result.setIthDigit(num2Index, (sum >= 10 && num2Index != 0 ? sum - 10 : sum));
                    carry = sum >= 10 ? 1 : 0;
                }
            }

            // if num1 is signed and num2 is signed then the result will be a negative number
            if (this.signedNumber && num2.signedNumber) { // both are negative
                result.signedNumber = true;
            } else { // both are positive
                result.signedNumber = false;
            }


        } else if (this.signedNumber && !num2.signedNumber) { // either num1 is negative or num2 then call subtract

            // Create to temp BigInt objects
            // We don't want to interfere with num1 and num2 objects
            // We need to remove - before creating tempNum1 object
            let tempNum1 = this.abs();
            let tempNum2 = num2.clone();
            
            // Compute the difference
            result = tempNum2.subtract(tempNum1);

        } else if (!this.signedNumber && num2.signedNumber) {

            // Create to temp BigInt objects
            // We don't want to interfere with num1 and num2 objects
            let tempNum1 = this.clone();

            // We need to remove - before creating tempNum2 object
            let tempNum2 = num2.abs();

            // Compute the difference
            result = tempNum1.subtract(tempNum2);

        }

        // Update numStr of the result
        result.numStr = result.toString();

        return result;
    }


    public subtract(num2: BigInt) {

        let borrow = 0;

        // Create a clone's of num1 & num2
        // We do this because we will change num1/num2 while subtracting
        let num1Clone = this.clone();
        let num2Clone = num2.clone();
        
        // Clone num1 by default
        let result = this.clone();

        if ((!num1Clone.signedNumber && !num2Clone.signedNumber) || // num1 and num2 are positive or num1 and num2 are negative
            ((num1Clone.signedNumber && num2Clone.signedNumber))
        ) {
            // Create two clone bigint objects and make the numbers positive
            let tempNum1 = this.abs();
            let tempNum2 = num2.abs();

            if (tempNum1.greaterThanEqual(tempNum2)) {

                // Compute the diff
                for (let num1Index = num1Clone.totalNoOfDigits() - 1, num2Index = num2Clone.totalNoOfDigits() - 1; num1Index >= 0; num1Index--, num2Index--) {
                    let diff;
                    if (num2Index >= 0) {
                        if (num1Clone.getIthDigit(num1Index) >= num2Clone.getIthDigit(num2Index)) {
                            diff = num1Clone.getIthDigit(num1Index) - num2Clone.getIthDigit(num2Index);
                        } else {

                            // We need this in case there are a bunch of zeros between iNum1Index and num1Index
                            let iNum1Index;

                            // Find the borrow
                            for (iNum1Index = num1Index - 1; iNum1Index >= 0; iNum1Index--) {
                                if (num1Clone.getIthDigit(iNum1Index) > 0) {
                                    // Update the ith num1Index
                                    num1Clone.setIthDigit(iNum1Index, num1Clone.getIthDigit(iNum1Index) - 1);
                                    // Update borrow
                                    borrow = num1Clone.getIthDigit(num1Index) + 10;
                                    break;
                                }
                            }

                            // Go through num1 once more to set the zeros between num1Index to iNumIndex to 9
                            for (let i = num1Index - 1; i > iNum1Index; i--) {
                                num1Clone.setIthDigit(i, 9);
                            }

                            // Compute the difference
                            diff = borrow - num2Clone.getIthDigit(num2Index);

                        }

                    } else {
                        diff = num1Clone.getIthDigit(num1Index);
                    }

                    // Set the ith difference
                    result.setIthDigit(num1Index, diff);
                }


            } else {
                // Make a shallow copy of num2
                result = num2Clone.clone();

                // Compute the diff
                for (let num1Index = num1Clone.totalNoOfDigits() - 1, num2Index = num2Clone.totalNoOfDigits() - 1; num2Index >= 0; num1Index--, num2Index--) {
                    let diff;
                    if (num1Index >= 0) {
                        if (num2Clone.getIthDigit(num2Index) >= num1Clone.getIthDigit(num1Index)) {
                            diff = num2Clone.getIthDigit(num2Index) - num1Clone.getIthDigit(num1Index);
                        } else {

                            // We need this in case there are a bunch of zeros between iNum1Index and num1Index
                            let iNum2Index;

                            // Find the borrow
                            for (iNum2Index = num2Index - 1; iNum2Index >= 0; iNum2Index--) {
                                if (num2Clone.getIthDigit(iNum2Index) > 0) {
                                    // Update the ith num1Index
                                    num2Clone.setIthDigit(iNum2Index, num2Clone.getIthDigit(iNum2Index) - 1);
                                    // Update borrow
                                    borrow = num2Clone.getIthDigit(num2Index) + 10;
                                    break;
                                }
                            }

                            // Go through num1 once more to set the zeros between num1Index to iNumIndex to 9
                            for (let i = num2Index - 1; i > iNum2Index; i--) {
                                num2Clone.setIthDigit(i, 9);
                            }

                            // Compute the difference
                            diff = borrow - num1Clone.getIthDigit(num1Index);

                        }

                    } else {
                        diff = num2Clone.getIthDigit(num2Index);
                    }

                    // Set the ith difference
                    result.setIthDigit(num2Index, diff);
                }

            }

            // Set the sign bit
            if (num1Clone.signedNumber && num2Clone.signedNumber) { // both are neagtive
                result.signedNumber = tempNum1.greaterThan(tempNum2);
            } else { // both are positive
                result.signedNumber = tempNum1.lessThan(tempNum2);
            }


        } else if (!num1Clone.signedNumber && num2Clone.signedNumber) { // num2 is neagtive

            // Change the signed bit to positive
            num2Clone.signedNumber = false;

            // Compute addition
            result = this.add(num2Clone);

            // Change the signed bit to negative
            num2Clone.signedNumber = true;


        } else if (num1Clone.signedNumber && !num2Clone.signedNumber) { // num1 is neagtive


            // Change the signed bit to negative
            num2Clone.signedNumber = true;

            // Compute addition
            result = this.add(num2Clone);

            // Change the signed bit to negative
            num2Clone.signedNumber = false;


        }

        // Update numStr of the result
        result.numStr = result.toString();

        return result;
    }

    // TODO: Use a fast algorithm to slow to use add()
    public multiply(num2: BigInt) {
        

        // Call the karatsuba function to compute the product
        let result = this.karatsuba(num2);

        // Set the sign bit
        result.signedNumber = !(this.signedNumber && num2.signedNumber || !this.signedNumber && !num2.signedNumber);
       

        return result;

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
                    } else if (this.getIthDigit(i) === num2.getIthDigit(i)) {
                        continue;
                    } else {
                        return false;
                    }
                }
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
                    } else if (this.getIthDigit(i) === num2.getIthDigit(i)) {
                        continue;
                    } else {
                        return false;
                    }
                }

            }

        } else if (!this.signedNumber && num2.signedNumber) { // num1 is positive and num2 is negative
            return false;
        } else {
            return true;
        }

        return false;
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
                        if (this.getIthDigit(i) < num2.getIthDigit(i)) {
                            return true;
                        } else if (this.getIthDigit(i) === num2.getIthDigit(i)) {
                            continue;
                        } else {
                            return false;
                        }
                    }
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
                        if (this.getIthDigit(i) > num2.getIthDigit(i)) {
                            return true;
                        } else if (this.getIthDigit(i) === num2.getIthDigit(i)) {
                            continue;
                        } else {
                            return false;
                        }
                    }
                }
            }
        } else if (!this.signedNumber && num2.signedNumber) {
            return false;
        } else {
            return true;
        }

        return false;
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
                    } else if (this.getIthDigit(i) === num2.getIthDigit(i)) {
                        continue;
                    } else {
                        return false;
                    }
                }
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
                    } else if (this.getIthDigit(i) === num2.getIthDigit(i)) {
                        continue;
                    } else {
                        return false;
                    }
                }
            }
        } else if (!this.signedNumber && num2.signedNumber) {
            return true;
        } else {
            return false;
        }

        
        return false;
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
                        if (this.getIthDigit(i) > num2.getIthDigit(i)) {
                            return true;
                        } else if (this.getIthDigit(i) === num2.getIthDigit(i)) {
                            continue;
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
                        if (this.getIthDigit(i) < num2.getIthDigit(i)) {
                            return true;
                        } else if (this.getIthDigit(i) === num2.getIthDigit(i)) {
                            continue;
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

        
        return false;
        
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

        // Check if the result is zero. if it is then return a single zero, else return a trimmed numStr
        numStr = /^0+$/g.test(numStr) ? '0' : this.trim(numStr, '0');

        
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

    // Karatsuba Algorithm Implementation
    private karatsuba(num2: BigInt): BigInt {

        // Create positive clones of num1 and num2
        let num1Clone = this.abs();
        let num2Clone = num2.abs();

        // Pad zeros infront of num1 or num2
        if (num1Clone.totalNoOfDigits() > num2Clone.totalNoOfDigits()) {
            num2Clone = num2Clone.paddZerosAtStart(num1Clone.totalNoOfDigits() - num2Clone.totalNoOfDigits());
        } else if (num1Clone.totalNoOfDigits() < num2Clone.totalNoOfDigits()) {
            num1Clone = num1Clone.paddZerosAtStart(num2Clone.totalNoOfDigits() - num1Clone.totalNoOfDigits());
        }

        // total no. of digits
        let n = num1Clone.length();

        // Base condition - breaks recursion
        if (n === 1) {
            let product = num1Clone.getIthDigit(0) * num2Clone.getIthDigit(0);
            return new BigInt(product.toString());
        }

        // variables for storing split numbers
        let a: BigInt, b: BigInt, c: BigInt, d: BigInt;

        // check is no. of digits is odd
        if (n % 2 !== 0) {
            
            // Pad num1 and num2 with a zero at the beginning
            num1Clone = num1Clone.paddZerosAtStart(1);
            num2Clone = num2Clone.paddZerosAtStart(1);

            // Because of the padded zero the no. of digits will increase by one
            n = n + 1;

        }

        // split num1
        a = num1Clone.slice(0, n / 2);
        b = num1Clone.slice(n / 2, n);

        // split num2
        c = num2Clone.slice(0, n / 2);
        d = num2Clone.slice(n / 2, n);

        // Compute ac, bd, ad+bc
        let ac = a.karatsuba(c);
        let bd = b.karatsuba(d);
        // compute (a+b)(c+d) = ac + ad + bc + bd
        let aPlusB = a.add(b); // (a+b)
        let cPlusD = c.add(d); // (c+d)
        let adPlusBd = aPlusB.karatsuba(cPlusD);

        // // ac - bd
        // let acMinusBd = ac.greaterThanEqual(bd) ? ac.subtract(bd) : bd.subtract(ac);

        // Use Gauss Trick subtract ac and bd from adPlusBd to ad + bd
        adPlusBd = adPlusBd.subtract(ac).subtract(bd);

        // Pad 'n' zeros at the end of ac
        ac = ac.paddZerosAtEnd(n);

        // Pad 'n/2' zeros at the end adPlusBd. Handles odd number of digits
        adPlusBd = adPlusBd.paddZerosAtEnd(Math.floor(n / 2));

        // Return num1 * num2 = (a + b) * (c + d) = ac + ad + bc + bd
        return ac.add(adPlusBd.add(bd));
    }

    // Gives a slice of the number from start to end
    private slice(start: number, end: number) {
        return new BigInt(this.numStr.slice(start, end));
    }


    // Padds zero's at the start of the number
    private paddZerosAtStart(n: number) {
        return new BigInt(this.formNZeros(n) + this.numStr);
    }

    // Padds zero's at the end of the number
    private paddZerosAtEnd(n: number) {
        return new BigInt(this.numStr + this.formNZeros(n));
    }

    // Used to form 'n' zeros which is used in paddZerosAtStart(), paddZerosAtEnd()
    private formNZeros(n: number) {
        // Form a 'n' zeros string
        let zerosStr = '';

        for (let i = 1; i <= n; i++) {
            zerosStr += '0';
        }

        return zerosStr;
    }


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