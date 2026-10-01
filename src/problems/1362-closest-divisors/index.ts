/**
 * 1362. Closest Divisors
 *
 * Returns two integers, as close together as possible, whose product is
 * `num + 1` or `num + 2`.
 *
 * The closest factor pair of a number has its smaller factor as near as
 * possible below the square root, so search down from `√(num + 2)` for the
 * first divisor of either number.
 *
 * @see https://leetcode.com/problems/closest-divisors/
 * @difficulty Medium
 * @timeComplexity O(√num)
 * @spaceComplexity O(1)
 *
 * @example
 * closestDivisors(123); // [5, 25]
 */
export const closestDivisors = (num: number): number[] => {
	for (let a = Math.floor(Math.sqrt(num + 2)); a >= 1; a--) {
		if ((num + 1) % a === 0) return [a, (num + 1) / a];
		if ((num + 2) % a === 0) return [a, (num + 2) / a];
	}
	return [1, num + 1];
};
