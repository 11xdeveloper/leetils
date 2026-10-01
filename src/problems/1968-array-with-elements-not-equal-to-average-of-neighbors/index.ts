/**
 * 1968. Array With Elements Not Equal to Average of Neighbors
 *
 * Rearranges the distinct `nums` so no element equals the average of its
 * two neighbours.
 *
 * Sorted, alternate the smaller and larger halves: every element is then
 * either below both neighbours or above both.
 *
 * @see https://leetcode.com/problems/array-with-elements-not-equal-to-average-of-neighbors/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * arrayWithElementsNotEqualToAverageOfNeighbors([1, 2, 3, 4, 5]); // [1, 4, 2, 5, 3]
 */
export const arrayWithElementsNotEqualToAverageOfNeighbors = (
	nums: readonly number[],
): number[] => {
	const sorted = nums.toSorted((a, b) => a - b);
	const half = Math.ceil(sorted.length / 2);
	return sorted.map((_, i) =>
		i % 2 === 0 ? (sorted[i / 2] ?? 0) : (sorted[half + (i - 1) / 2] ?? 0),
	);
};
