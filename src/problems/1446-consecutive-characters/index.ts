/**
 * 1446. Consecutive Characters
 *
 * Returns the length of the longest run of one repeated character in `s`.
 *
 * Tracks the current run while scanning.
 *
 * @see https://leetcode.com/problems/consecutive-characters/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * consecutiveCharacters("abbcccddddeeeeedcba"); // 5
 */
export const consecutiveCharacters = (s: string): number => {
	let [run, longest] = [0, 0];
	for (let i = 0; i < s.length; i++) {
		run = i > 0 && s[i] === s[i - 1] ? run + 1 : 1;
		longest = Math.max(longest, run);
	}
	return longest;
};
