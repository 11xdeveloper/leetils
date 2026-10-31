/**
 * 3861. Minimum Capacity Box
 *
 * The index of the smallest box that fits `itemSize` (the first on ties),
 * or -1.
 *
 * @see https://leetcode.com/problems/minimum-capacity-box/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumCapacityBox([1, 5, 3, 7], 3); // 2
 */
export const minimumCapacityBox = (
	capacity: readonly number[],
	itemSize: number,
): number => {
	let best = -1;
	capacity.forEach((size, i) => {
		if (size >= itemSize && (best < 0 || size < (capacity[best] ?? 0)))
			best = i;
	});
	return best;
};
