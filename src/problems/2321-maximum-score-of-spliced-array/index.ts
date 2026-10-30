/**
 * 2321. Maximum Score Of Spliced Array
 *
 * May swap one subarray between `nums1` and `nums2` (same positions).
 * Returns the largest possible sum of either array afterwards.
 *
 * Swapping into `nums1` gains the subarray sum of `nums2 - nums1`; take the
 * best (Kadane's algorithm, possibly empty), and likewise for `nums2`.
 *
 * @see https://leetcode.com/problems/maximum-score-of-spliced-array/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumScoreOfSplicedArray([60, 60, 60], [10, 90, 10]); // 210
 */
export const maximumScoreOfSplicedArray = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	const best = (into: readonly number[], from: readonly number[]): number => {
		let [gain, running, sum] = [0, 0, 0];
		for (const [i, value] of into.entries()) {
			sum += value;
			running = Math.max(0, running + (from[i] ?? 0) - value);
			gain = Math.max(gain, running);
		}
		return sum + gain;
	};
	return Math.max(best(nums1, nums2), best(nums2, nums1));
};
