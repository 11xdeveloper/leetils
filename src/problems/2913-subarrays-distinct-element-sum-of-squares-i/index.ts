/**
 * 2913. Subarrays Distinct Element Sum of Squares I
 *
 * Returns the sum, over every subarray, of the square of its number of
 * distinct values.
 *
 * Extend each start rightwards, counting distinct values with a set.
 *
 * @see https://leetcode.com/problems/subarrays-distinct-element-sum-of-squares-i/
 * @difficulty Easy
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * subarraysDistinctElementSumOfSquaresI([1, 2, 1]); // 15
 */
export const subarraysDistinctElementSumOfSquaresI = (
	nums: readonly number[],
): number => {
	let total = 0;
	for (let i = 0; i < nums.length; i++) {
		const seen = new Set<number>();
		for (let j = i; j < nums.length; j++) {
			seen.add(nums[j] ?? 0);
			total += seen.size * seen.size;
		}
	}
	return total;
};
