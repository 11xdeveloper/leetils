/**
 * 2427. Number of Common Factors
 *
 * Counts the positive integers dividing both `a` and `b`.
 *
 * @see https://leetcode.com/problems/number-of-common-factors/
 * @difficulty Easy
 * @timeComplexity O(min(a, b))
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfCommonFactors(12, 6); // 4
 */
export const numberOfCommonFactors = (a: number, b: number): number => {
	let count = 0;
	for (let x = 1; x <= Math.min(a, b); x++)
		if (a % x === 0 && b % x === 0) count++;
	return count;
};
