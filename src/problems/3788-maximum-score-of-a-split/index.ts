/**
 * 3788. Maximum Score of a Split
 *
 * Splitting after index i (leaving both sides non-empty) scores the sum
 * of the left part minus the minimum of the right part. Returns the best
 * score.
 *
 * @see https://leetcode.com/problems/maximum-score-of-a-split/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumScoreOfASplit([10, -1, 3, -4, -5]); // 17
 */
export const maximumScoreOfASplit = (nums: readonly number[]): number => {
	const n = nums.length;
	const suffixMin = new Array<number>(n + 1).fill(Number.POSITIVE_INFINITY);
	for (let i = n - 1; i >= 0; i--)
		suffixMin[i] = Math.min(suffixMin[i + 1] ?? 0, nums[i] ?? 0);
	let best = Number.NEGATIVE_INFINITY;
	let prefix = 0;
	for (let i = 0; i + 1 < n; i++) {
		prefix += nums[i] ?? 0;
		best = Math.max(best, prefix - (suffixMin[i + 1] ?? 0));
	}
	return best;
};
