import { test, expect, describe } from 'bun:test';
import { isPalindrome } from '../..';

describe('Palindrome Number', () => {
    test('Given an integer x, return true if x is a palindrome, and false otherwise.', () => {
        expect(isPalindrome(121)).toBe(true);
        expect(isPalindrome(-121)).toBe(false);
        expect(isPalindrome(10)).toBe(false);
    });
});
