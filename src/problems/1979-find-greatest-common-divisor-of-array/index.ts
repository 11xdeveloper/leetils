/**
 * 1979. Find Greatest Common Divisor of Array
 *
 * Returns the greatest common divisor of the smallest and largest values
 * in `nums`.
 *
 * Euclid's algorithm on the two extremes.
 *
 * @see https://leetcode.com/problems/find-greatest-common-divisor-of-array/
 * @difficulty Easy
 * @timeComplexity O(n + log M)
 * @spaceComplexity O(1)
 *
 * @example
 * findGreatestCommonDivisorOfArray([2, 5, 6, 9, 10]); // 2
 */
export const findGreatestCommonDivisorOfArray = (
	nums: readonly number[],
): number => {
	let [a, b] = [Math.max(...nums), Math.min(...nums)];
	while (b > 0) [a, b] = [b, a % b];
	return a;
};
