import { test, expect } from 'bun:test';
import atoi from '.';

test("Atoi: Converts a string into a numeric value. Ignore any invalid characters. Similar to C/C++'s atoi function without the integer clamping", () => {
    expect(atoi('42')).toBe(42);
    expect(atoi('   -42')).toBe(-42);
    expect(atoi('4193 with words')).toBe(4193);
});
