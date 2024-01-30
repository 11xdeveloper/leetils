import { test, expect, describe } from 'bun:test';
import { longestCommonPrefix } from '../..';

describe('Longest Common Prefix', () => {
    test(`Write a function to find the longest common prefix string amongst an array of strings.

    If there is no common prefix, return an empty string.`, () => {
        expect(longestCommonPrefix(['flower', 'flow', 'flight'])).toBe('fl');
        expect(longestCommonPrefix(['dog', 'racecar', 'car'])).toBe('');
    });
});
