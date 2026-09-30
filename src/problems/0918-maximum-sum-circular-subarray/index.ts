/**
 * 918. Maximum Sum Circular Subarray
 *
 * Returns the largest sum of a non-empty subarray of the circular array
 * `nums`, where a subarray may wrap around the end (but not reuse an
 * element).
 *
 * A wrapping subarray is everything except a middle subarray, so its best
 * sum is the total minus the smallest subarray sum. Kadane's algorithm
 * finds the largest and smallest sums; the wrapping option is skipped when
 * every number is negative (it would be empty).
 *
 * @see https://leetcode.com/problems/maximum-sum-circular-subarray/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumSumCircularSubarray([5, -3, 5]); // 10
 */
export const maximumSumCircularSubarray = (nums: readonly number[]): number => {
	let total = 0;
	let best = Number.NEGATIVE_INFINITY;
	let worst = Number.POSITIVE_INFINITY;
	let endingMax = 0;
	let endingMin = 0;
	for (const num of nums) {
		total += num;
		endingMax = Math.max(num, endingMax + num);
		endingMin = Math.min(num, endingMin + num);
		best = Math.max(best, endingMax);
		worst = Math.min(worst, endingMin);
	}
	return best < 0 ? best : Math.max(best, total - worst);
};
