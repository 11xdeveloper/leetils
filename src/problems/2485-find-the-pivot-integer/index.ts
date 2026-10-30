/**
 * 2485. Find the Pivot Integer
 *
 * Returns the `x` with `1 + … + x = x + … + n`, or -1.
 *
 * Both sides equal when `x^2 = n(n + 1) / 2`.
 *
 * @see https://leetcode.com/problems/find-the-pivot-integer/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * findThePivotInteger(8); // 6
 */
export const findThePivotInteger = (n: number): number => {
	const total = (n * (n + 1)) / 2;
	const x = Math.round(Math.sqrt(total));
	return x * x === total ? x : -1;
};
