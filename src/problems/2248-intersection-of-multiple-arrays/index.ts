/**
 * 2248. Intersection of Multiple Arrays
 *
 * Returns, ascending, the values present in every array (each array holds
 * distinct values).
 *
 * Count appearances and keep those seen in all arrays.
 *
 * @see https://leetcode.com/problems/intersection-of-multiple-arrays/
 * @difficulty Easy
 * @timeComplexity O(total + m log m)
 * @spaceComplexity O(m)
 *
 * @example
 * intersectionOfMultipleArrays([[3, 1, 2, 4, 5], [1, 2, 3, 4], [3, 4, 5, 6]]); // [3, 4]
 */
export const intersectionOfMultipleArrays = (
	nums: readonly (readonly number[])[],
): number[] => {
	const counts = new Map<number, number>();
	for (const array of nums)
		for (const num of array) counts.set(num, (counts.get(num) ?? 0) + 1);
	return [...counts]
		.filter(([, count]) => count === nums.length)
		.map(([num]) => num)
		.sort((a, b) => a - b);
};
