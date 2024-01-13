import { test, expect } from 'bun:test';
import { atoi } from '..';

test("Atoi: Similar to C/C++'s atoi function (no integer clamping). Given a string, it returns its numerical value ignoring filler.", () => {
    expect(atoi('42')).toBe(42);
    expect(atoi('   -42')).toBe(-42);
    expect(atoi('4193 with words')).toBe(4193);
});
