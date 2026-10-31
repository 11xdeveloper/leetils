/**
 * 2164. Sort Even and Odd Indices Independently
 *
 * Sorts the values at even indices ascending and those at odd indices
 * descending, each in place.
 *
 * Pull out each set of indices, sort, and write back.
 *
 * @see https://leetcode.com/problems/sort-even-and-odd-indices-independently/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * sortEvenAndOddIndicesIndependently([4, 1, 2, 3]); // [2, 3, 4, 1]
 */
export const sortEvenAndOddIndicesIndependently = (
	nums: readonly number[],
): number[] => {
	const evens = nums.filter((_, i) => i % 2 === 0).sort((a, b) => a - b);
	const odds = nums.filter((_, i) => i % 2 === 1).sort((a, b) => b - a);
	return nums.map((_, i) => (i % 2 ? odds : evens)[i >> 1] ?? 0);
};
