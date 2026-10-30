/**
 * 2418. Sort the People
 *
 * Returns the names ordered by height, tallest first (heights are
 * distinct).
 *
 * @see https://leetcode.com/problems/sort-the-people/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * sortThePeople(["Mary", "John", "Emma"], [180, 165, 170]); // ["Mary", "Emma", "John"]
 */
export const sortThePeople = (
	names: readonly string[],
	heights: readonly number[],
): string[] =>
	names
		.map((_, i) => i)
		.sort((a, b) => (heights[b] ?? 0) - (heights[a] ?? 0))
		.map((i) => names[i] ?? "");
