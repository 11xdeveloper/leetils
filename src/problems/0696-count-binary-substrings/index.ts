/**
 * 696. Count Binary Substrings
 *
 * Counts the substrings of the binary string `s` (by position) with equal
 * numbers of 0s and 1s, all the 0s together and all the 1s together, like
 * `"0011"` or `"10"`.
 *
 * Each such substring straddles the boundary between two neighbouring
 * runs of equal digits, and a boundary between runs of lengths `a` and `b`
 * has `min(a, b)` of them.
 *
 * @see https://leetcode.com/problems/count-binary-substrings/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countBinarySubstrings("00110011"); // 6
 */
export const countBinarySubstrings = (s: string): number => {
	let count = 0;
	let previousRun = 0;
	let run = 1;
	for (let i = 1; i <= s.length; i++) {
		if (i < s.length && s.charAt(i) === s.charAt(i - 1)) {
			run++;
			continue;
		}
		count += Math.min(previousRun, run);
		previousRun = run;
		run = 1;
	}
	return count;
};
