import { test, expect } from 'bun:test';
import romanToInt from '.';

test('RomanToInt: Converts the provided string of roman numericals into an integer.', () => {
    expect(romanToInt('III')).toBe(3);
    expect(romanToInt('LVIII')).toBe(58);
    expect(romanToInt('MCMXCIV')).toBe(1994);
});
