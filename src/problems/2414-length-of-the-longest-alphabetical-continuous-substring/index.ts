/**
 * 2414. Length of the Longest Alphabetical Continuous Substring
 *
 * Returns the length of the longest substring of consecutive letters of
 * the alphabet, such as "abc".
 *
 * @see https://leetcode.com/problems/length-of-the-longest-alphabetical-continuous-substring/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * lengthOfTheLongestAlphabeticalContinuousSubstring("abacaba"); // 2
 */
export const lengthOfTheLongestAlphabeticalContinuousSubstring = (
	s: string,
): number => {
	let [best, run] = [0, 0];
	for (let i = 0; i < s.length; i++) {
		run = i > 0 && s.charCodeAt(i) === s.charCodeAt(i - 1) + 1 ? run + 1 : 1;
		best = Math.max(best, run);
	}
	return best;
};
