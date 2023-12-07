import { test, expect } from 'bun:test';
import romanToInt from '.';

test('RomanToInt: Given a string containing roman numerals, it returns the base 10 numerical equivalent.', () => {
    expect(romanToInt('III')).toBe(3);
    expect(romanToInt('LVIII')).toBe(58);
    expect(romanToInt('MCMXCIV')).toBe(1994);
});
