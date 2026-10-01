/**
 * 991. Broken Calculator
 *
 * A calculator showing `startValue` can only double the number or subtract
 * 1. Returns the fewest operations to show `target`.
 *
 * Works backwards from `target` with the inverse operations: halving an
 * even number or adding 1. While above `startValue`, halving whenever
 * possible is optimal; once below, only additions remain.
 *
 * @see https://leetcode.com/problems/broken-calculator/
 * @difficulty Medium
 * @timeComplexity O(log target)
 * @spaceComplexity O(1)
 *
 * @example
 * brokenCalculator(3, 10); // 3: double, subtract, double
 */
export const brokenCalculator = (
	startValue: number,
	target: number,
): number => {
	let operations = 0;
	while (target > startValue) {
		target = target % 2 === 0 ? target / 2 : target + 1;
		operations++;
	}
	return operations + startValue - target;
};
