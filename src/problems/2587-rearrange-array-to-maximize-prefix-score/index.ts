/**
 * 2587. Rearrange Array to Maximize Prefix Score
 *
 * Rearranging `nums` freely, a score counts the positive prefix sums.
 * Returns the largest score.
 *
 * Sort from largest to smallest, which makes every prefix sum as large
 * as it can be, and count the positive ones.
 *
 * @see https://leetcode.com/problems/rearrange-array-to-maximize-prefix-score/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * rearrangeArrayToMaximizePrefixScore([2, -1, 0, 1, -3, 3, -3]); // 6
 */
export const rearrangeArrayToMaximizePrefixScore = (
	nums: readonly number[],
): number => {
	let prefix = 0;
	let score = 0;
	for (const num of nums.toSorted((a, b) => b - a)) {
		prefix += num;
		if (prefix <= 0) break;
		score++;
	}
	return score;
};
