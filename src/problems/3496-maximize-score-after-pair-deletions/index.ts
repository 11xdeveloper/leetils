/**
 * 3496. Maximize Score After Pair Deletions
 *
 * While more than two elements remain, remove the first two, the last two,
 * or the first and last, scoring their sum. Returns the most points
 * possible.
 *
 * Everything but the leftovers gets removed. With an odd length one
 * element is left, and any one can be; with an even length two
 * neighbouring elements are left. So subtract the smallest such leftover
 * from the total.
 *
 * @see https://leetcode.com/problems/maximize-score-after-pair-deletions/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximizeScoreAfterPairDeletions([2, 4, 1]); // 6
 */
export const maximizeScoreAfterPairDeletions = (
	nums: readonly number[],
): number => {
	const total = nums.reduce((a, b) => a + b, 0);
	if (nums.length % 2 === 1) return total - Math.min(...nums);
	let smallest = Number.POSITIVE_INFINITY;
	for (let i = 1; i < nums.length; i++)
		smallest = Math.min(smallest, (nums[i - 1] ?? 0) + (nums[i] ?? 0));
	return total - smallest;
};
