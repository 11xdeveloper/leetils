/**
 * 2270. Number of Ways to Split Array
 *
 * Counts the splits into a non-empty left and right part where the left
 * sum is at least the right sum.
 *
 * Track the left sum against the total.
 *
 * @see https://leetcode.com/problems/number-of-ways-to-split-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfWaysToSplitArray([10, 4, -8, 7]); // 2
 */
export const numberOfWaysToSplitArray = (nums: readonly number[]): number => {
	const total = nums.reduce((sum, v) => sum + v, 0);
	let [left, ways] = [0, 0];
	for (const num of nums.slice(0, -1)) {
		left += num;
		if (2 * left >= total) ways++;
	}
	return ways;
};
