/**
 * 2373. Largest Local Values in a Matrix
 *
 * Returns the `(n - 2) × (n - 2)` matrix of maximums over each 3 × 3
 * window of `grid`.
 *
 * @see https://leetcode.com/problems/largest-local-values-in-a-matrix/
 * @difficulty Easy
 * @timeComplexity O(n^2)
 * @spaceComplexity O(1) beyond the output
 *
 * @example
 * largestLocalValuesInAMatrix([[9, 9, 8, 1], [5, 6, 2, 6], [8, 2, 6, 4], [6, 2, 2, 2]]); // [[9, 9], [8, 6]]
 */
export const largestLocalValuesInAMatrix = (
	grid: readonly (readonly number[])[],
): number[][] =>
	Array.from({ length: grid.length - 2 }, (_, r) =>
		Array.from({ length: grid.length - 2 }, (_, c) => {
			let best = 0;
			for (let i = r; i < r + 3; i++)
				for (let j = c; j < c + 3; j++)
					best = Math.max(best, grid[i]?.[j] ?? 0);
			return best;
		}),
	);
