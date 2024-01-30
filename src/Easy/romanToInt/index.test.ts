import { test, expect, describe } from 'bun:test';
import { romanToInt } from '../..';

describe('Roman to Integer', () => {
    test(`Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.
    
    ...
    
    Given a roman numeral, convert it to an integer.`, () => {
        expect(romanToInt('III')).toBe(3);
        expect(romanToInt('LVIII')).toBe(58);
        expect(romanToInt('MCMXCIV')).toBe(1994);
    });
});
