/**
 * 3976. Maximum Subarray Sum After Multiplier
 *
 * Apply exactly one operation to one subarray: multiply its elements by
 * `k`, or divide them by k rounding toward zero. Then returns the largest
 * subarray sum.
 *
 * Kadane's algorithm with phases: before the operated block, inside a
 * multiplied or a divided block, and after it. A sum that avoids the
 * operation entirely needs somewhere else to put it, so it can't be the
 * whole array.
 *
 * @see https://leetcode.com/problems/maximum-subarray-sum-after-multiplier/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumSubarraySumAfterMultiplier([1, -2, 3, 4, -5], 2); // 14
 */
export const maximumSubarraySumAfterMultiplier = (
	nums: readonly number[],
	k: number,
): number => {
	const NONE = Number.NEGATIVE_INFINITY;
	let [before, multiplied, divided, after] = [NONE, NONE, NONE, NONE];
	let best = NONE;
	for (const x of nums) {
		const start = Math.max(before, 0);
		[before, multiplied, divided, after] = [
			Math.max(before, 0) + x,
			Math.max(multiplied, start) + x * k,
			Math.max(divided, start) + Math.trunc(x / k),
			Math.max(after, multiplied, divided) + x,
		];
		best = Math.max(best, multiplied, divided, after);
	}
	/** Kadane's algorithm on nums[from..to). */
	const plain = (from: number, to: number): number => {
		let [current, result] = [NONE, NONE];
		for (let i = from; i < to; i++) {
			current = Math.max(current, 0) + (nums[i] ?? 0);
			result = Math.max(result, current);
		}
		return result;
	};
	if (nums.length > 1)
		best = Math.max(best, plain(0, nums.length - 1), plain(1, nums.length));
	return best;
};
