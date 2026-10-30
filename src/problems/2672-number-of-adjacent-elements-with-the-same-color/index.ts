/**
 * 2672. Number of Adjacent Elements With the Same Color
 *
 * An array of `n` uncoloured (0) cells is coloured by each query
 * `[index, color]`. Returns, after each query, how many adjacent pairs
 * share a non-zero colour.
 *
 * Only the recoloured cell's two pairs can change: subtract them before
 * and add them back after.
 *
 * @see https://leetcode.com/problems/number-of-adjacent-elements-with-the-same-color/
 * @difficulty Medium
 * @timeComplexity O(n + q)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfAdjacentElementsWithTheSameColor(4, [[0, 2], [1, 2], [3, 1], [1, 1], [2, 1]]); // [0, 1, 1, 0, 2]
 */
export const numberOfAdjacentElementsWithTheSameColor = (
	n: number,
	queries: readonly (readonly number[])[],
): number[] => {
	const colors = Array.from({ length: n }, () => 0);
	const matches = (i: number): number => {
		const here = colors[i] ?? 0;
		return (
			(here !== 0 && colors[i - 1] === here ? 1 : 0) +
			(here !== 0 && colors[i + 1] === here ? 1 : 0)
		);
	};
	let pairs = 0;
	return queries.map(([index = 0, color = 0]) => {
		pairs -= matches(index);
		colors[index] = color;
		pairs += matches(index);
		return pairs;
	});
};
