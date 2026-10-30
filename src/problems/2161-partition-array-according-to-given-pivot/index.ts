/**
 * 2161. Partition Array According to Given Pivot
 *
 * Rearranges `nums` into the values below `pivot`, then those equal, then
 * those above, keeping relative order within each part.
 *
 * Filter the three parts.
 *
 * @see https://leetcode.com/problems/partition-array-according-to-given-pivot/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * partitionArrayAccordingToGivenPivot([9, 12, 5, 10, 14, 3, 10], 10); // [9, 5, 3, 10, 10, 12, 14]
 */
export const partitionArrayAccordingToGivenPivot = (
	nums: readonly number[],
	pivot: number,
): number[] => [
	...nums.filter((num) => num < pivot),
	...nums.filter((num) => num === pivot),
	...nums.filter((num) => num > pivot),
];
