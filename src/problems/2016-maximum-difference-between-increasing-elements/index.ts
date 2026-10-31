/**
 * 2016. Maximum Difference Between Increasing Elements
 *
 * Returns the largest `nums[j] - nums[i]` with `i < j` and
 * `nums[i] < nums[j]`, or -1 if there is none.
 *
 * Compare each value with the smallest before it.
 *
 * @see https://leetcode.com/problems/maximum-difference-between-increasing-elements/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumDifferenceBetweenIncreasingElements([7, 1, 5, 4]); // 4
 */
export const maximumDifferenceBetweenIncreasingElements = (
	nums: readonly number[],
): number => {
	let [best, smallest] = [-1, Infinity];
	for (const num of nums) {
		if (num > smallest) best = Math.max(best, num - smallest);
		smallest = Math.min(smallest, num);
	}
	return best;
};
