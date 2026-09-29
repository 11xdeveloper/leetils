/**
 * 209. Minimum Size Subarray Sum
 *
 * Given positive integers `nums`, returns the length of the shortest
 * contiguous subarray whose sum is at least `target`, or 0 if there is none.
 *
 * Sliding window: extends the right end, and while the sum reaches the
 * target, records the length and shrinks from the left. All values are
 * positive, so shrinking only ever lowers the sum.
 *
 * @see https://leetcode.com/problems/minimum-size-subarray-sum/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumSizeSubarraySum(7, [2, 3, 1, 2, 4, 3]); // 2, from [4, 3]
 */
export const minimumSizeSubarraySum = (
	target: number,
	nums: readonly number[],
): number => {
	let shortest = Number.POSITIVE_INFINITY;
	let sum = 0;
	let left = 0;

	for (const [right, num] of nums.entries()) {
		sum += num;
		while (sum >= target) {
			shortest = Math.min(shortest, right - left + 1);
			sum -= nums[left] ?? 0;
			left++;
		}
	}

	return shortest === Number.POSITIVE_INFINITY ? 0 : shortest;
};
