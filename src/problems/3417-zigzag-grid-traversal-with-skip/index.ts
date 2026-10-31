/**
 * 3417. Zigzag Grid Traversal With Skip
 *
 * Walk the grid row by row, left to right then right to left alternately,
 * taking every other cell visited (starting with the first).
 *
 * Walk it, keeping the cells at even positions of the walk.
 *
 * @see https://leetcode.com/problems/zigzag-grid-traversal-with-skip/
 * @difficulty Easy
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * zigzagGridTraversalWithSkip([[1, 2], [3, 4]]); // [1, 4]
 */
export const zigzagGridTraversalWithSkip = (
	grid: readonly (readonly number[])[],
): number[] =>
	grid
		.flatMap((row, r) => (r % 2 === 0 ? [...row] : row.toReversed()))
		.filter((_, i) => i % 2 === 0);
