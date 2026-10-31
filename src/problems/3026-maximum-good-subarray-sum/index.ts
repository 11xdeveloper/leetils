/**
 * 3026. Maximum Good Subarray Sum
 *
 * The largest sum of a subarray whose first and last elements differ by
 * exactly `k`, or 0 if there's none.
 *
 * Keep, for each value, the smallest prefix sum before an occurrence of it.
 * A subarray ending at `j` is good if it starts at a `nums[j] ± k`, so its
 * best sum is the prefix sum through `j` minus the smaller of those two.
 *
 * @see https://leetcode.com/problems/maximum-good-subarray-sum/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumGoodSubarraySum([1, 2, 3, 4, 5, 6], 1); // 11
 */
export const maximumGoodSubarraySum = (
	nums: readonly number[],
	k: number,
): number => {
	const smallestBefore = new Map<number, number>();
	let prefix = 0;
	let best = Number.NEGATIVE_INFINITY;
	for (const num of nums) {
		const before = smallestBefore.get(num);
		if (before === undefined || prefix < before)
			smallestBefore.set(num, prefix);
		prefix += num;
		for (const start of [num - k, num + k]) {
			const from = smallestBefore.get(start);
			if (from !== undefined) best = Math.max(best, prefix - from);
		}
	}
	return best === Number.NEGATIVE_INFINITY ? 0 : best;
};
