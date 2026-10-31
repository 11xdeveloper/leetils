/**
 * 2219. Maximum Sum Score of Array
 *
 * The sum score at index `i` is the larger of the sum of the first `i + 1`
 * elements and the sum of the last `n - i`. Returns the largest sum score.
 *
 * Track the prefix sum; the suffix sum is the total minus the part before.
 *
 * @see https://leetcode.com/problems/maximum-sum-score-of-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumSumScoreOfArray([4, 3, -2, 5]); // 10
 */
export const maximumSumScoreOfArray = (nums: readonly number[]): number => {
	const total = nums.reduce((sum, v) => sum + v, 0);
	let [prefix, best] = [0, -Infinity];
	for (const num of nums) {
		const suffix = total - prefix;
		prefix += num;
		best = Math.max(best, prefix, suffix);
	}
	return best;
};
