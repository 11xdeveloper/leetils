/**
 * 3707. Equal Score Substrings
 *
 * A string's score adds its letters' alphabet positions (a = 1). Whether
 * `s` splits into two non-empty parts with equal scores.
 *
 * @see https://leetcode.com/problems/equal-score-substrings/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * equalScoreSubstrings("adcb"); // true
 */
export const equalScoreSubstrings = (s: string): boolean => {
	const score = (c: string) => c.charCodeAt(0) - 96;
	let total = 0;
	for (const c of s) total += score(c);
	let left = 0;
	for (let i = 0; i + 1 < s.length; i++) {
		left += score(s.charAt(i));
		if (2 * left === total) return true;
	}
	return false;
};
