/**
 * 713. Subarray Product Less Than K
 *
 * Counts the subarrays of the positive integers `nums` whose product is
 * strictly less than `k`.
 *
 * Sliding window: for each right end, the window is shrunk from the left
 * until its product is below `k`. Every subarray ending at the right end
 * and starting inside the window then qualifies.
 *
 * @see https://leetcode.com/problems/subarray-product-less-than-k/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * subarrayProductLessThanK([10, 5, 2, 6], 100); // 8
 */
export const subarrayProductLessThanK = (
	nums: readonly number[],
	k: number,
): number => {
	if (k <= 1) return 0;
	let count = 0;
	let product = 1;
	for (let left = 0, right = 0; right < nums.length; right++) {
		product *= nums[right] ?? 1;
		while (product >= k) product /= nums[left++] ?? 1;
		count += right - left + 1;
	}
	return count;
};
