/**
 * 2743. Count Substrings Without Repeating Character
 *
 * Returns how many substrings of `s` have no repeated letter.
 *
 * Slide a window of distinct letters; each right end adds the window's
 * length.
 *
 * @see https://leetcode.com/problems/count-substrings-without-repeating-character/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countSubstringsWithoutRepeatingCharacter("abab"); // 7
 */
export const countSubstringsWithoutRepeatingCharacter = (s: string): number => {
	const lastSeen = Array.from({ length: 26 }, () => -1);
	let start = 0;
	let count = 0;
	for (let i = 0; i < s.length; i++) {
		const letter = s.charCodeAt(i) - 97;
		start = Math.max(start, (lastSeen[letter] ?? -1) + 1);
		lastSeen[letter] = i;
		count += i - start + 1;
	}
	return count;
};
