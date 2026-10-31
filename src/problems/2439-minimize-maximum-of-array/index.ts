/**
 * 2439. Minimize Maximum of Array
 *
 * An operation moves 1 from `nums[i]` to `nums[i - 1]`. Returns the
 * smallest possible maximum.
 *
 * Value only moves left, so each prefix's average (rounded up) is a lower
 * bound, and the largest of those is achievable.
 *
 * @see https://leetcode.com/problems/minimize-maximum-of-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimizeMaximumOfArray([3, 7, 1, 6]); // 5
 */
export const minimizeMaximumOfArray = (nums: readonly number[]): number => {
	let [sum, best] = [0, 0];
	for (const [i, num] of nums.entries()) {
		sum += num;
		best = Math.max(best, Math.ceil(sum / (i + 1)));
	}
	return best;
};
