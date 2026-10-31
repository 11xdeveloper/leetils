/**
 * 2363. Merge Similar Items
 *
 * Merges two lists of `[value, weight]` items, summing the weights of
 * equal values, sorted by value.
 *
 * @see https://leetcode.com/problems/merge-similar-items/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * mergeSimilarItems([[1, 1], [4, 5], [3, 8]], [[3, 1], [1, 5]]); // [[1, 6], [3, 9], [4, 5]]
 */
export const mergeSimilarItems = (
	items1: readonly (readonly number[])[],
	items2: readonly (readonly number[])[],
): number[][] => {
	const weights = new Map<number, number>();
	for (const [value = 0, weight = 0] of [...items1, ...items2])
		weights.set(value, (weights.get(value) ?? 0) + weight);
	return [...weights].sort((a, b) => a[0] - b[0]);
};
