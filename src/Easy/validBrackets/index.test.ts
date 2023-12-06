import { test, expect } from 'bun:test';
import validBrackets from '.';

test('ValidBrackets: Given a string consisting of brackets, it will return whether all bracket pairs are complete and valid.', () => {
    expect(validBrackets('()')).toBe(true);
    expect(validBrackets('()[]{}')).toBe(true);
    expect(validBrackets('(]')).toBe(false);
});
