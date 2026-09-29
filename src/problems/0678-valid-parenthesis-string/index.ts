/**
 * 678. Valid Parenthesis String
 *
 * Returns whether `s`, made of `(`, `)` and `*`, can be a balanced string of
 * parentheses when each `*` is taken as `(`, `)` or nothing.
 *
 * Tracks the range of possible open counts: `(` raises both ends, `)`
 * lowers both, and `*` widens the range by one each way. The low end never
 * goes below 0 (those choices are dropped), the high end falling below 0
 * means too many `)`, and 0 must be possible at the end.
 *
 * @see https://leetcode.com/problems/valid-parenthesis-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * validParenthesisString("(*))"); // true
 */
export const validParenthesisString = (s: string): boolean => {
	let low = 0;
	let high = 0;
	for (const char of s) {
		low += char === "(" ? 1 : -1;
		high += char === ")" ? -1 : 1;
		if (high < 0) return false;
		low = Math.max(low, 0);
	}
	return low === 0;
};
