/**
 * 3931. Check Adjacent Digit Differences
 *
 * Whether every two neighbouring digits of `s` differ by at most 2.
 *
 * @see https://leetcode.com/problems/check-adjacent-digit-differences/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * checkAdjacentDigitDifferences("132"); // true
 */
export const checkAdjacentDigitDifferences = (s: string): boolean => {
	for (let i = 1; i < s.length; i++)
		if (Math.abs(s.charCodeAt(i) - s.charCodeAt(i - 1)) > 2) return false;
	return true;
};
