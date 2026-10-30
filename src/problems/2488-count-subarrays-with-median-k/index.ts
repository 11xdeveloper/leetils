/**
 * 2488. Count Subarrays With Median K
 *
 * `nums` is a permutation of `1..n`. Counts the subarrays whose median
 * (the left middle for even lengths) is `k`.
 *
 * A subarray containing `k` has median `k` when its count of larger
 * values minus smaller ones is 0 or 1. Count that balance for each start
 * up to `k`, then match each end from `k` on.
 *
 * @see https://leetcode.com/problems/count-subarrays-with-median-k/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countSubarraysWithMedianK([3, 2, 1, 4, 5], 4); // 3
 */
export const countSubarraysWithMedianK = (
	nums: readonly number[],
	k: number,
): number => {
	const position = nums.indexOf(k);
	const sign = (num: number): number => (num > k ? 1 : num < k ? -1 : 0);
	const starts = new Map<number, number>();
	let balance = 0;
	for (let i = position; i >= 0; i--) {
		balance += sign(nums[i] ?? 0);
		starts.set(balance, (starts.get(balance) ?? 0) + 1);
	}
	let count = 0;
	balance = 0;
	for (let i = position; i < nums.length; i++) {
		balance += sign(nums[i] ?? 0);
		count += (starts.get(-balance) ?? 0) + (starts.get(1 - balance) ?? 0);
	}
	return count;
};
