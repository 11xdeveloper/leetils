import { test, expect } from 'bun:test';
import longestCommonPrefix from '.';

test('longestCommonPrefix: Provides the longest common prefix in a provided array of words.', () => {
    expect(longestCommonPrefix(['flower', 'flow', 'flight'])).toBe('fl');
    expect(longestCommonPrefix(['dog', 'racecar', 'car'])).toBe('');
});
