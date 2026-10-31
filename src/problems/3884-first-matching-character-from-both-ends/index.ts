/**
 * 3884. First Matching Character From Both Ends
 *
 * The smallest i with `s[i]` equal to `s[n - 1 - i]`, or -1.
 *
 * @see https://leetcode.com/problems/first-matching-character-from-both-ends/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * firstMatchingCharacterFromBothEnds("abcacbd"); // 1
 */
export const firstMatchingCharacterFromBothEnds = (s: string): number => {
	for (let i = 0; i < s.length; i++) if (s[i] === s[s.length - 1 - i]) return i;
	return -1;
};
