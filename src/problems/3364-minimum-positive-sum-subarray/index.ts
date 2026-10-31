/**
 * 3364. Minimum Positive Sum Subarray
 *
 * The smallest positive sum of a subarray of `nums` whose length is between
 * `l` and `r`, or -1 if there's none.
 *
 * Check every subarray, extending each start one element at a time.
 *
 * @see https://leetcode.com/problems/minimum-positive-sum-subarray/
 * @difficulty Easy
 * @timeComplexity O(n · r)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumPositiveSumSubarray([3, -2, 1, 4], 2, 3); // 1
 */
export const minimumPositiveSumSubarray = (
	nums: readonly number[],
	l: number,
	r: number,
): number => {
	let best = Number.POSITIVE_INFINITY;
	for (let start = 0; start < nums.length; start++) {
		let sum = 0;
		for (let end = start; end < nums.length && end - start < r; end++) {
			sum += nums[end] ?? 0;
			if (end - start + 1 >= l && sum > 0) best = Math.min(best, sum);
		}
	}
	return best === Number.POSITIVE_INFINITY ? -1 : best;
};
