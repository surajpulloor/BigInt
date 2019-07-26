const bi = require('../dist/bigint');

// Group 1
describe('num1 === num2', () => {

    // test variables
    let num1 = new bi('2413641');
    let num2 = new bi('2413641');

    // tests
    // Test #1
    it('Adding num1 + num2', () => {
        expect(num1.add(num2).toString()).toBe('4827282');
    });

    // Test #2
    it('Subtracting num1 - num2', () => {
        expect(num1.subtract(num2).toString()).toBe('0');
    });

    // Test #3
    it('Reverse Subtracting num2 - num1', () => {
        expect(num2.subtract(num1).toString()).toBe('0');
    });

    // Test #4
    it('Multiplying num1 * num2', () => {
        expect(num1.multiply(num2).toString()).toBe('5825662876881');
    });

    // Test #5
    it('LessThan num1 < num2', () => {
        expect(num1.lessThan(num2)).toBe(false);
    });

    // Test #6
    it('LessThanEqual num1 <= num2', () => {
        expect(num1.lessThanEqual(num2)).toBe(true);
    });

    // Test #7
    it('GreaterThan num1 > num2', () => {
        expect(num1.greaterThan(num2)).toBe(false);
    });

    // Test #8
    it('GreaterThanEqual num1 >= num2', () => {
        expect(num1.greaterThanEqual(num2)).toBe(true);
    });

    // Test #9
    it('Equal num1 == num2', () => {
        expect(num1.equal(num2)).toBe(true);
    });
});

// Group 2
describe('num1 < 0 && num2 < 0', () => {
    
    let num1 = new bi('-2552359');
    let num2 = new bi('-2538458');

    // Test #1
    it('Adding num1 + num2', () => {
        expect(num1.add(num2).toString()).toBe('-5090817');
    });

    // it #2
    it('Subtracting num1 - num2', () => {
        expect(num1.subtract(num2).toString()).toBe('-13901');
    });

    // it #3
    it('Reverse Subtracting num2 - num1', () => {
        expect(num2.subtract(num1).toString()).toBe('13901');
    });

    // it #4
    it('Multiplying num1 * num2', () => {
        expect(num1.multiply(num2).toString()).toBe('6479056122422');
    });

    // it #5
    it('LessThan num1 < num2', () => {
        expect(num1.lessThan(num2)).toBe(true);
    });

    // it #6
    it('LessThanEqual num1 <= num2', () => {
        expect(num1.lessThanEqual(num2)).toBe(true);
    });

    // it #7
    it('GreaterThan num1 > num2', () => {
        expect(num1.greaterThan(num2)).toBe(false);
    });

    // it #8
    it('GreaterThanEqual num1 >= num2', () => {
        expect(num1.greaterThanEqual(num2)).toBe(false);
    });

    // it #9
    it('Equal num1 == num2', () => {
        expect(num1.equal(num2)).toBe(false);
    });
});

// Group 3
describe('num1 < 0 && num2 > 0', () => {
    
    // test variables
    let num1 = new bi('-2552359');
    let num2 = new bi('2538458');


    // Test #1
    it('Adding num1 + num2', () => {
        expect(num1.add(num2).toString()).toBe('-13901');
    });

    // it #2
    it('Subtracting num1 - num2', () => {
        expect(num1.subtract(num2).toString()).toBe('-5090817');
    });

    // it #3
    it('Reverse Subtracting num2 - num1', () => {
        expect(num2.subtract(num1).toString()).toBe('5090817');
    });

    // it #4
    it('Multiplying num1 * num2', () => {
        expect(num1.multiply(num2).toString()).toBe('-6479056122422');
    });

    // it #5
    it('LessThan num1 < num2', () => {
        expect(num1.lessThan(num2)).toBe(true);
    });

    // it #6
    it('LessThanEqual num1 <= num2', () => {
        expect(num1.lessThanEqual(num2)).toBe(true);
    });

    // it #7
    it('GreaterThan num1 > num2', () => {
        expect(num1.greaterThan(num2)).toBe(false);
    });

    // it #8
    it('GreaterThanEqual num1 >= num2', () => {
        expect(num1.greaterThanEqual(num2)).toBe(false);
    });

    // it #9
    it('Equal num1 == num2', () => {
        expect(num1.equal(num2)).toBe(false);
    });
});

// Group 4
describe('num1 > 0 && num2 < 0', () => {
    // test variables
    let num1 = new bi('2552359');
    let num2 = new bi('-2538458');


    // Test #1
    it('Adding num1 + num2', () => {
        expect(num1.add(num2).toString()).toBe('13901');
    });

    // it #2
    it('Subtracting num1 - num2', () => {
        expect(num1.subtract(num2).toString()).toBe('5090817');
    });

    // it #3
    it('Reverse Subtracting num2 - num1', () => {
        expect(num2.subtract(num1).toString()).toBe('-5090817');
    });

    // it #4
    it('Multiplying num1 * num2', () => {
        expect(num1.multiply(num2).toString()).toBe('-6479056122422');
    });

    // it #5
    it('LessThan num1 < num2', () => {
        expect(num1.lessThan(num2)).toBe(false);
    });

    // it #6
    it('LessThanEqual num1 <= num2', () => {
        expect(num1.lessThanEqual(num2)).toBe(false);
    });

    // it #7
    it('GreaterThan num1 > num2', () => {
        expect(num1.greaterThan(num2)).toBe(true);
    });

    // it #8
    it('GreaterThanEqual num1 >= num2', () => {
        expect(num1.greaterThanEqual(num2)).toBe(true);
    });

    // it #9
    it('Equal num1 == num2', () => {
        expect(num1.equal(num2)).toBe(false);
    });
});

// Group 5
describe('num1 > 0 && num2 > 0', () => {
    
    // test variables
    let num1 = new bi('2552359');
    let num2 = new bi('2538458');


    // Test #1
    it('Adding num1 + num2', () => {
        expect(num1.add(num2).toString()).toBe('5090817');
    });

    // it #2
    it('Subtracting num1 - num2', () => {
        expect(num1.subtract(num2).toString()).toBe('13901');
    });

    // it #3
    it('Reverse Subtracting num2 - num1', () => {
        expect(num2.subtract(num1).toString()).toBe('-13901');
    });

    // it #4
    it('Multiplying num1 * num2', () => {
        expect(num1.multiply(num2).toString()).toBe('6479056122422');
    });


    // it #5
    it('LessThan num1 < num2', () => {
        expect(num1.lessThan(num2)).toBe(false);
    });

    // it #6
    it('LessThanEqual num1 <= num2', () => {
        expect(num1.lessThanEqual(num2)).toBe(false);
    });

    // it #7
    it('GreaterThan num1 > num2', () => {
        expect(num1.greaterThan(num2)).toBe(true);
    });

    // it #8
    it('GreaterThanEqual num1 >= num2', () => {
        expect(num1.greaterThanEqual(num2)).toBe(true);
    });

    // it #9
    it('Equal num1 == num2', () => {
        expect(num1.equal(num2)).toBe(false);
    });
});