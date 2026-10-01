/**
 * 1759. Count Number of Homogenous Substrings
 *
 * Counts the substrings of `s` made of a single repeated character, modulo
 * 10^9 + 7.
 *
 * Each character ends as many such substrings as the length of the run it
 * ends.
 *
 * @see https://leetcode.com/problems/count-number-of-homogenous-substrings/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countNumberOfHomogenousSubstrings("abbcccaa"); // 13
 */
export const countNumberOfHomogenousSubstrings = (s: string): number => {
	let [count, run] = [0, 0];
	for (let i = 0; i < s.length; i++) {
		run = i > 0 && s[i] === s[i - 1] ? run + 1 : 1;
		count = (count + run) % 1_000_000_007;
	}
	return count;
};
