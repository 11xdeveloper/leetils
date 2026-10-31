/**
 * 3077. Maximum Strength of K Disjoint Subarrays
 *
 * Pick `k` (odd) disjoint subarrays of `nums` in order. The strength is
 * `k · sum₁ - (k - 1) · sum₂ + (k - 2) · sum₃ - …`. Returns the largest
 * strength.
 *
 * Dynamic programming over the elements, keeping the best strength with j
 * subarrays chosen so far, split by whether the j-th is still open (so the
 * next element can extend it). An element either joins the open subarray,
 * starts the next one, or is skipped.
 *
 * @see https://leetcode.com/problems/maximum-strength-of-k-disjoint-subarrays/
 * @difficulty Hard
 * @timeComplexity O(n · k)
 * @spaceComplexity O(k)
 *
 * @example
 * maximumStrengthOfKDisjointSubarrays([1, 2, 3, -1, 2], 3); // 22
 */
export const maximumStrengthOfKDisjointSubarrays = (
	nums: readonly number[],
	k: number,
): number => {
	const none = Number.NEGATIVE_INFINITY;
	const closed = new Float64Array(k + 1).fill(none);
	const open = new Float64Array(k + 1).fill(none);
	closed[0] = 0;
	for (const num of nums)
		for (let j = k; j >= 1; j--) {
			const weight = (j % 2 === 1 ? 1 : -1) * (k - j + 1);
			const extend = Math.max(
				open[j] ?? none,
				closed[j - 1] ?? none,
				open[j - 1] ?? none,
			);
			closed[j] = Math.max(closed[j] ?? none, open[j] ?? none);
			open[j] = extend + weight * num;
		}
	return Math.max(closed[k] ?? none, open[k] ?? none);
};
