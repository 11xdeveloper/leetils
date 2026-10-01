/**
 * 1918. Kth Smallest Subarray Sum
 *
 * Returns the `k`-th smallest sum among all subarrays of the positive
 * array `nums`.
 *
 * Binary search the sum: a sliding window counts subarrays with sum at
 * most a given value.
 *
 * @see https://leetcode.com/problems/kth-smallest-subarray-sum/
 * @difficulty Medium
 * @timeComplexity O(n log S) for total sum S
 * @spaceComplexity O(1)
 *
 * @example
 * kthSmallestSubarraySum([3, 3, 5, 5], 7); // 10
 */
export const kthSmallestSubarraySum = (
	nums: readonly number[],
	k: number,
): number => {
	const atMost = (limit: number) => {
		let [count, sum, left] = [0, 0, 0];
		for (let right = 0; right < nums.length; right++) {
			sum += nums[right] ?? 0;
			while (sum > limit) {
				sum -= nums[left] ?? 0;
				left++;
			}
			count += right - left + 1;
		}
		return count;
	};
	let [low, high] = [Math.min(...nums), nums.reduce((s, v) => s + v, 0)];
	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		if (atMost(mid) >= k) high = mid;
		else low = mid + 1;
	}
	return low;
};
