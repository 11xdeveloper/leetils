/**
 * 698. Partition to K Equal Sum Subsets
 *
 * Returns whether the positive numbers in `nums` can be split into `k`
 * non-empty groups with equal sums.
 *
 * Fills the groups one after another, each up to `total / k`. DP over the
 * set of numbers used: from a reachable set, adding any unused number that
 * still fits in the current group gives another reachable set, since the
 * set alone determines how full the current group is.
 *
 * @see https://leetcode.com/problems/partition-to-k-equal-sum-subsets/
 * @difficulty Medium
 * @timeComplexity O(2^n · n)
 * @spaceComplexity O(2^n)
 *
 * @example
 * partitionToKEqualSumSubsets([4, 3, 2, 3, 5, 2, 1], 4); // true: (5), (1, 4), (2, 3), (2, 3)
 */
export const partitionToKEqualSumSubsets = (
	nums: readonly number[],
	k: number,
): boolean => {
	const total = nums.reduce((sum, num) => sum + num, 0);
	const target = total / k;
	if (!Number.isInteger(target) || nums.some((num) => num > target))
		return false;

	const n = nums.length;
	// fill[mask] is how full the current group is after using mask, or -1 if unreachable.
	const fill = new Int32Array(1 << n).fill(-1);
	fill[0] = 0;
	for (let mask = 0; mask < 1 << n; mask++) {
		const current = fill[mask] ?? -1;
		if (current === -1) continue;
		for (let i = 0; i < n; i++) {
			const next = mask | (1 << i);
			if (next === mask || fill[next] !== -1) continue;
			const num = nums[i] ?? 0;
			if (current + num <= target) fill[next] = (current + num) % target;
		}
	}

	return fill[(1 << n) - 1] === 0;
};
