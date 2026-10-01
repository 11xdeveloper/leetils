/**
 * 1793. Maximum Score of a Good Subarray
 *
 * A subarray containing index `k` scores its minimum times its length.
 * Returns the largest score.
 *
 * Grow outward from `k`, always toward the larger neighbouring element, so
 * the minimum falls as slowly as possible; check the score at each size.
 *
 * @see https://leetcode.com/problems/maximum-score-of-a-good-subarray/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumScoreOfAGoodSubarray([1, 4, 3, 7, 4, 5], 3); // 15
 */
export const maximumScoreOfAGoodSubarray = (
	nums: readonly number[],
	k: number,
): number => {
	let [left, right] = [k, k];
	let smallest = nums[k] ?? 0;
	let best = smallest;
	while (left > 0 || right < nums.length - 1) {
		const [before, after] = [nums[left - 1] ?? -1, nums[right + 1] ?? -1];
		if (after > before) {
			right++;
			smallest = Math.min(smallest, after);
		} else {
			left--;
			smallest = Math.min(smallest, before);
		}
		best = Math.max(best, smallest * (right - left + 1));
	}
	return best;
};
