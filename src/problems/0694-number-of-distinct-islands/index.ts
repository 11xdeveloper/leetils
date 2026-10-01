/**
 * 694. Number of Distinct Islands
 *
 * Counts the islands of 1s in `grid` (connected up, down, left and right)
 * that differ in shape, where two islands are the same if one can be
 * shifted onto the other without rotating or reflecting it.
 *
 * Scanning row by row, each island is first reached at the same cell of its
 * shape. Its cells, relative to that cell and sorted, make a key that's
 * equal exactly for islands of the same shape. The flood fill uses an
 * explicit stack.
 *
 * @see https://leetcode.com/problems/number-of-distinct-islands/
 * @difficulty Medium
 * @timeComplexity O(m · n · log(m · n)) for the sorting
 * @spaceComplexity O(m · n)
 *
 * @example
 * numberOfDistinctIslands([[1, 1, 0, 1, 1], [1, 0, 0, 0, 0], [0, 0, 0, 0, 1], [1, 1, 0, 1, 1]]); // 3
 */
export const numberOfDistinctIslands = (
	grid: readonly (readonly number[])[],
): number => {
	const n = grid[0]?.length ?? 0;
	const seen = new Uint8Array(grid.length * n);
	const shapes = new Set<string>();

	for (const [startRow, row] of grid.entries()) {
		for (const [startCol, cell] of row.entries()) {
			if (cell !== 1 || seen[startRow * n + startCol]) continue;
			const cells: number[] = [];
			seen[startRow * n + startCol] = 1;
			const stack = [[startRow, startCol]];
			for (let current = stack.pop(); current; current = stack.pop()) {
				const [r = 0, c = 0] = current;
				cells.push((r - startRow) * (2 * n) + (c - startCol));
				for (const [dr, dc] of [
					[-1, 0],
					[1, 0],
					[0, -1],
					[0, 1],
				] as const) {
					const [r2, c2] = [r + dr, c + dc];
					if (grid[r2]?.[c2] !== 1 || seen[r2 * n + c2]) continue;
					seen[r2 * n + c2] = 1;
					stack.push([r2, c2]);
				}
			}
			shapes.add(cells.sort((a, b) => a - b).join());
		}
	}

	return shapes.size;
};
