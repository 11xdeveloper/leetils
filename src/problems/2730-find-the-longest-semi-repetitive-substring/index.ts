/**
 * 2730. Find the Longest Semi-Repetitive Substring
 *
 * A string is semi-repetitive if at most one pair of adjacent characters
 * are equal. Returns the length of the longest semi-repetitive substring.
 *
 * Slide a window holding at most one equal adjacent pair, moving its
 * start past the older pair when a second appears.
 *
 * @see https://leetcode.com/problems/find-the-longest-semi-repetitive-substring/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheLongestSemiRepetitiveSubstring("52233"); // 4
 */
export const findTheLongestSemiRepetitiveSubstring = (s: string): number => {
	let start = 0;
	let lastPair = 0;
	let best = Math.min(1, s.length);
	for (let i = 1; i < s.length; i++) {
		if (s.charAt(i) === s.charAt(i - 1)) {
			if (lastPair > 0) start = lastPair;
			lastPair = i;
		}
		best = Math.max(best, i - start + 1);
	}
	return best;
};
