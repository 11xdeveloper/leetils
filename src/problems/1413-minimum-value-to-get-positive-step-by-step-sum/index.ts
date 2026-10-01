/**
 * 1413. Minimum Value to Get Positive Step by Step Sum
 *
 * Returns the smallest positive start value that keeps the running total
 * `start + nums[0] + … + nums[i]` at least 1 throughout.
 *
 * The start must make up for the lowest prefix sum: `1 − min(prefix)`, and
 * at least 1.
 *
 * @see https://leetcode.com/problems/minimum-value-to-get-positive-step-by-step-sum/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumValueToGetPositiveStepByStepSum([-3, 2, -3, 4, 2]); // 5
 */
export const minimumValueToGetPositiveStepByStepSum = (
	nums: readonly number[],
): number => {
	let [sum, lowest] = [0, 0];
	for (const num of nums) {
		sum += num;
		lowest = Math.min(lowest, sum);
	}
	return 1 - lowest;
};
