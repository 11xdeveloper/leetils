/**
 * 3349. Adjacent Increasing Subarrays Detection I
 *
 * Whether `nums` has two adjacent strictly increasing subarrays of length `k`.
 *
 * Walk the maximal increasing runs. Two adjacent subarrays fit either
 * across the boundary of two runs (as long as the shorter run) or within
 * one run (half its length).
 *
 * @see https://leetcode.com/problems/adjacent-increasing-subarrays-detection-i/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * adjacentIncreasingSubarraysDetectionI([2, 5, 7, 8, 9, 2, 3, 4, 3, 1], 3); // true
 */
export const adjacentIncreasingSubarraysDetectionI = (
	nums: readonly number[],
	k: number,
): boolean => {
	let best = 0;
	let previous = 0;
	let run = 0;
	nums.forEach((num, i) => {
		if (i > 0 && num > (nums[i - 1] ?? 0)) run++;
		else {
			previous = run;
			run = 1;
		}
		best = Math.max(best, Math.min(previous, run), Math.floor(run / 2));
	});
	return best >= k;
};
