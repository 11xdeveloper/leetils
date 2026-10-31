/**
 * 4000. Largest Integer With Given Digit Sum
 *
 * The largest integer with at most `n` digits adding up to `s`, or -1.
 *
 * Use all n digits, filling 9s from the left.
 *
 * @see https://leetcode.com/problems/largest-integer-with-given-digit-sum/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * largestIntegerWithGivenDigitSum(2, 9); // 90
 */
export const largestIntegerWithGivenDigitSum = (
	n: number,
	s: number,
): number => {
	if (s > 9 * n) return -1;
	if (s === 0) return 0;
	let digits = "";
	for (let i = 0, left = s; i < n; i++) {
		const d = Math.min(9, left);
		digits += d;
		left -= d;
	}
	return Number(digits);
};
