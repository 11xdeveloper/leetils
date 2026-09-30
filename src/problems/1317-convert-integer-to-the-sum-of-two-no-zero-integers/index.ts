/**
 * 1317. Convert Integer to the Sum of Two No-Zero Integers
 *
 * Returns positive integers `[a, b]` with `a + b = n` and no digit 0 in
 * either.
 *
 * Tries `a = 1, 2, …` until both parts qualify; one of the first few dozen
 * always works.
 *
 * @see https://leetcode.com/problems/convert-integer-to-the-sum-of-two-no-zero-integers/
 * @difficulty Easy
 * @timeComplexity O(n log n) in the worst case, far less in practice
 * @spaceComplexity O(log n)
 *
 * @example
 * convertIntegerToTheSumOfTwoNoZeroIntegers(11); // [2, 9]
 */
export const convertIntegerToTheSumOfTwoNoZeroIntegers = (
	n: number,
): number[] => {
	for (let a = 1; a < n; a++) {
		if (!`${a}${n - a}`.includes("0")) return [a, n - a];
	}
	return [];
};
