import { test, expect } from 'bun:test';
import longestCommonPrefix from '.';

test('longestCommonPrefix: Given an array of strings, it finds the longest common substring that starts at index 0.', () => {
    expect(longestCommonPrefix(['flower', 'flow', 'flight'])).toBe('fl');
    expect(longestCommonPrefix(['dog', 'racecar', 'car'])).toBe('');
});
