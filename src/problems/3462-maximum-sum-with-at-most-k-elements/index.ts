/**
 * 3462. Maximum Sum With at Most K Elements
 *
 * Pick at most `k` elements of the grid, at most `limits[i]` from row i.
 * Returns the largest sum.
 *
 * Collect each row's `limits[i]` largest elements, then take the `k`
 * largest of those.
 *
 * @see https://leetcode.com/problems/maximum-sum-with-at-most-k-elements/
 * @difficulty Medium
 * @timeComplexity O(m · n log n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * maximumSumWithAtMostKElements([[1, 2], [3, 4]], [1, 2], 2); // 7
 */
export const maximumSumWithAtMostKElements = (
	grid: readonly (readonly number[])[],
	limits: readonly number[],
	k: number,
): number =>
	grid
		.flatMap((row, i) => row.toSorted((a, b) => b - a).slice(0, limits[i] ?? 0))
		.sort((a, b) => b - a)
		.slice(0, k)
		.reduce((a, b) => a + b, 0);
