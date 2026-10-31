/**
 * 2869. Minimum Operations to Collect Elements
 *
 * Each operation takes the last element of `nums`. Returns how many it
 * takes to have collected every number from 1 to `k`.
 *
 * Walk from the back until all `k` have appeared.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-collect-elements/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(k)
 *
 * @example
 * minimumOperationsToCollectElements([3, 1, 5, 4, 2], 2); // 4
 */
export const minimumOperationsToCollectElements = (
	nums: readonly number[],
	k: number,
): number => {
	const collected = new Set<number>();
	for (let i = nums.length - 1; i >= 0; i--) {
		const num = nums[i] ?? 0;
		if (num <= k) collected.add(num);
		if (collected.size === k) return nums.length - i;
	}
	return nums.length;
};
