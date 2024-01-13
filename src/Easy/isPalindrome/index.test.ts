import { test, expect } from 'bun:test';
import { isPalindrome } from '..';

test('isPalindrome: Given a number, it returns the number is a palindrome (same backward).', () => {
    expect(isPalindrome(121)).toBe(true);
    expect(isPalindrome(-121)).toBe(false);
    expect(isPalindrome(10)).toBe(false);
});
