export class BigInt {
    constructor(num1: string) {
        // Set the fields
        this._num = num1;
        this.createNumArray();
    }

    private createNumArray() {
        this.numArray = this.num.split('').map((val) => +val);
    }

    
    // arthimetic ops 
    public add(num2: BigInt): string {
        let carry = 0;

        this.createNumArray();

        // Perform the addition
        if (this.length() >= num2.length()) {
            this.resultArray = this.numArray.slice();
            for (let num1Index = this.length() - 1, num2Index = num2.length() - 1; num1Index >= 0; num1Index--, num2Index--) {
                let sum = (num2Index >= 0 ? this.numArray[num1Index] + num2.numArray[num2Index] : this.numArray[num1Index]) + carry;
                this.resultArray[num1Index] = (sum >= 10 && num1Index != 0 ? sum - 10 : sum);
                carry = sum >= 10 ? 1 : 0;
            }
        } else {
            this.resultArray = num2.numArray.slice();
            for (let num1Index = this.length() - 1, num2Index = num2.length() - 1; num2Index >= 0; num1Index--, num2Index--) {
                let sum = (num1Index >= 0 ? this.numArray[num1Index] + num2.numArray[num2Index] : num2.numArray[num2Index]) + carry;
                this.resultArray[num2Index] = (sum >= 10 && num2Index != 0 ? sum - 10 : sum);
                carry = sum >= 10 ? 1 : 0;
            }
        }

        // Convert the computed result array to string
        return this.numArray2NumStr();
    }

    
    public multiply(num2: BigInt) {

        let smallestNumber = this.length() <= num2.length() ? this : num2;
        let largestNumber = this.length() >= num2.length() ? this : num2;
        let accumulator = new BigInt('0');

        let index = 1;

        // console.log('is this true? : ' + smallestNumber.greaterThan(new BigInt('1')));

        for (let i = 1; smallestNumber.greaterThanEqual(new BigInt(i.toString())); i++) {
            accumulator.num = accumulator.add(largestNumber);
        }

        // set the resultArrays
        this.resultArray = accumulator.resultArray;

        return this.numArray2NumStr();
        
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
                if (this.numArray[i] < num2.numArray[i]) {
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
            if (this.num == num2.num) {
                return true;
            } else {
                // This works by comparing the ith of num1 and num2
                // for e.g if num1 = 2235 and num2 = 2535
                // then we'll check num1[0] < num2[0], which is false(i.e 2 < 2)
                // then we check num1[1] < num2[1], which is true, its here where we'll break the loop
                for (let i = 0; i < this.length(); i++) {
                    if (this.numArray[i] < num2.numArray[i]) {
                        return true;
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
                if (this.numArray[i] > num2.numArray[i]) {
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
            if (this.num == num2.num) {
                return true;
            } else {
                // This works by comparing the ith of num1 and num2
                // for e.g if num1 = 2235 and num2 = 2535
                // then we'll check num1[0] < num2[0], which is false(i.e 2 < 2)
                // then we check num1[1] < num2[1], which is true, its here where we'll break the loop
                for (let i = 0; i < this.length(); i++) {
                    if (this.numArray[i] > num2.numArray[i]) {
                        return true;
                    }
                }
                return false;
            }
        }
    }


    public equal(num2: BigInt) {
        if (this.num == num2.num) {
            return true;
        } else {
            return false;
        }
    }

    public length() {
        return this._num.length;
    }

    // conversions methods
    private numArray2NumStr() {
        return (this.result = this.resultArray.toString().replace(/,+/g, ''));
    }

    // getters and setters
    // ----- num -------//
    set num(num: string) {
        this._num = num;
    }

    get num(): string {
        return this._num;
    }

    // ----- result -------//
    set result(result: string) {
        this._result = result;
    }

    get result(): string {
        return this._result;
    }

    // ----- numArray -------//
    set numArray(numArray: Array<number>) {
        this._numArray = numArray;
    }

    get numArray(): Array<number> {
        return this._numArray;
    }

    // ----- resultArray -------//
    set resultArray(resultArray: Array<number>) {
        this._resultArray = resultArray;
    }

    get resultArray(): Array<number> {
        return this._resultArray;
    }

    private _num: string;
    private _result: string = '';

    private _numArray: Array<number> = [];
    private _resultArray: Array<number> = [];
}