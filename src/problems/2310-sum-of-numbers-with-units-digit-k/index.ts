/**
 * 2310. Sum of Numbers With Units Digit K
 *
 * Returns the smallest set of positive integers ending in digit `k` that
 * sums to `num`, or -1 (an empty set sums to 0).
 *
 * `c` such numbers can make `num` exactly when `c · k <= num` and their
 * units digits add up to `num`'s; only `c` up to 10 needs checking.
 *
 * @see https://leetcode.com/problems/sum-of-numbers-with-units-digit-k/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * sumOfNumbersWithUnitsDigitK(58, 9); // 2
 */
export const sumOfNumbersWithUnitsDigitK = (num: number, k: number): number => {
	if (num === 0) return 0;
	for (let count = 1; count <= 10 && count * k <= num; count++)
		if ((num - count * k) % 10 === 0) return count;
	return -1;
};
