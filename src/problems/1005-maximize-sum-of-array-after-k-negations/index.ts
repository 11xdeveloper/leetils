/**
 * 1005. Maximize Sum Of Array After K Negations
 *
 * Negates an element of `nums` exactly `k` times (possibly the same one
 * repeatedly) and returns the largest possible sum.
 *
 * Negates the most negative numbers first. If negations remain after every
 * negative is gone, an even number cancel out, and an odd one is spent on
 * the smallest absolute value.
 *
 * @see https://leetcode.com/problems/maximize-sum-of-array-after-k-negations/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximizeSumOfArrayAfterKNegations([3, -1, 0, 2], 3); // 6
 */
export const maximizeSumOfArrayAfterKNegations = (
	nums: readonly number[],
	k: number,
): number => {
	const values = nums.toSorted((a, b) => a - b);
	for (let i = 0; i < values.length && k > 0 && (values[i] ?? 0) < 0; i++, k--)
		values[i] = -(values[i] ?? 0);
	const sum = values.reduce((a, b) => a + b, 0);
	return k % 2 === 0 ? sum : sum - 2 * Math.min(...values);
};
