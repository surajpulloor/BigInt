export class BigIntNumber {
    constructor(num: string) {
        // this._signedNumber = num[0] == '-' ? true : false;
        // this._numArray = num.split('').map((val) => +val);

        // // Remove the negative sign from the number
        // if (this._signedNumber) {
        //     this._numArray.shift();
        // }

        this._numStr = num;
        this._signedNumber = this.numStr[0] == '-' ? true : false;
        // This is actually a language requirement(TODO: find a better solution such a design pattern or something)
        this._numArray = [];
        this.initAgain();
    }

    /**
     * initAgain
     */
    public initAgain() {
        // Form numArray
        this._numArray = this.numStr.split('').map((val) => val === '-' ? 0 : +val);

        // Remove the negative sign from the number
        if (this._signedNumber) {
            this._numArray.shift();
        }
    }

    // Getters and Setters
    
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



    // Helper Methods
    
    /**
     * numArraySlice
     */
    public numArraySlice() {
        return this._numArray.slice();
    }

    /**
     * ithDigit
     */
    public getIthDigit(i: number): number {
        return this._numArray[i];
    }

    public setIthDigit(i: number, digit: number): number {
        return this._numArray[i] = digit;
    }

    /**
     * totalNoOfDigits
     */
    public totalNoOfDigits() {
        return this._numArray.length;
    }

    private _numStr: string;
    private _signedNumber: boolean;
    private _numArray: Array<number>;
}