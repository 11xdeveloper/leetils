/**
 * 1877. Minimize Maximum Pair Sum in Array
 *
 * Splits the even-length `nums` into pairs minimising the largest pair
 * sum, and returns it.
 *
 * Pair the smallest with the largest, and so on inward.
 *
 * @see https://leetcode.com/problems/minimize-maximum-pair-sum-in-array/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimizeMaximumPairSumInArray([3, 5, 4, 2, 4, 6]); // 8
 */
export const minimizeMaximumPairSumInArray = (
	nums: readonly number[],
): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	let best = 0;
	for (let i = 0; i < sorted.length / 2; i++)
		best = Math.max(best, (sorted[i] ?? 0) + (sorted.at(-1 - i) ?? 0));
	return best;
};
