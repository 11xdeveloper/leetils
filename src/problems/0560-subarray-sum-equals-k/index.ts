/**
 * 560. Subarray Sum Equals K
 *
 * Counts the non-empty subarrays of `nums` that sum to `k`.
 *
 * A subarray sums to `k` when the prefix sum at its end is `k` more than the
 * prefix sum before its start, so it counts how often each prefix sum has
 * appeared and looks up `sum - k` at each position.
 *
 * @see https://leetcode.com/problems/subarray-sum-equals-k/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * subarraySumEqualsK([1, 2, 3], 3); // 2
 */
export const subarraySumEqualsK = (
	nums: readonly number[],
	k: number,
): number => {
	const prefixCounts = new Map([[0, 1]]);
	let sum = 0;
	let count = 0;

	for (const num of nums) {
		sum += num;
		count += prefixCounts.get(sum - k) ?? 0;
		prefixCounts.set(sum, (prefixCounts.get(sum) ?? 0) + 1);
	}

	return count;
};
