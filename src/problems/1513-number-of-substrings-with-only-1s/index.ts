/**
 * 1513. Number of Substrings With Only 1s
 *
 * Counts the substrings of the binary string `s` made only of 1s, modulo
 * 10^9 + 7.
 *
 * Each 1 ends as many such substrings as the length of the run of 1s so
 * far.
 *
 * @see https://leetcode.com/problems/number-of-substrings-with-only-1s/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfSubstringsWithOnly1s("0110111"); // 9
 */
export const numberOfSubstringsWithOnly1s = (s: string): number => {
	let [run, total] = [0, 0];
	for (const char of s) {
		run = char === "1" ? run + 1 : 0;
		total = (total + run) % 1_000_000_007;
	}
	return total;
};
