/**
 * 1331. Rank Transform of an Array
 *
 * Replaces each element of `arr` with its rank: 1 for the smallest value,
 * with equal values sharing a rank and no gaps.
 *
 * Sorts the distinct values and looks each element up.
 *
 * @see https://leetcode.com/problems/rank-transform-of-an-array/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * rankTransformOfAnArray([40, 10, 20, 30]); // [4, 1, 2, 3]
 */
export const rankTransformOfAnArray = (arr: readonly number[]): number[] => {
	const rank = new Map(
		[...new Set(arr)].sort((a, b) => a - b).map((value, i) => [value, i + 1]),
	);
	return arr.map((value) => rank.get(value) ?? 0);
};
