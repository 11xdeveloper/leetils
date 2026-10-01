/**
 * 463. Island Perimeter
 *
 * `grid` has exactly one island of land cells (`1`), with no lakes inside.
 * Returns the island's perimeter.
 *
 * Each land cell adds 4 edges, and each pair of neighbouring land cells
 * shares an edge that isn't on the perimeter, removing 2. Checking only the
 * neighbours above and to the left counts each pair once.
 *
 * @see https://leetcode.com/problems/island-perimeter/
 * @difficulty Easy
 * @timeComplexity O(m · n)
 * @spaceComplexity O(1)
 *
 * @example
 * islandPerimeter([[0, 1, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [1, 1, 0, 0]]); // 16
 */
export const islandPerimeter = (
	grid: readonly (readonly number[])[],
): number => {
	let perimeter = 0;

	for (const [r, row] of grid.entries()) {
		for (const [c, cell] of row.entries()) {
			if (cell !== 1) continue;
			perimeter += 4;
			if (grid[r - 1]?.[c] === 1) perimeter -= 2;
			if (row[c - 1] === 1) perimeter -= 2;
		}
	}

	return perimeter;
};
