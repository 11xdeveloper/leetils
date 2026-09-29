/**
 * 695. Max Area of Island
 *
 * Returns the number of cells in the largest island of 1s in `grid`
 * (connected up, down, left and right), or 0 if there are none.
 *
 * Flood fills each unvisited island with an explicit stack, counting its
 * cells.
 *
 * @see https://leetcode.com/problems/max-area-of-island/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * maxAreaOfIsland([[0, 1, 1], [0, 1, 0], [1, 0, 0]]); // 3
 */
export const maxAreaOfIsland = (
	grid: readonly (readonly number[])[],
): number => {
	const n = grid[0]?.length ?? 0;
	const seen = new Uint8Array(grid.length * n);
	let largest = 0;

	for (const [startRow, row] of grid.entries()) {
		for (const [startCol, cell] of row.entries()) {
			if (cell !== 1 || seen[startRow * n + startCol]) continue;
			let area = 0;
			seen[startRow * n + startCol] = 1;
			const stack = [[startRow, startCol]];
			for (let current = stack.pop(); current; current = stack.pop()) {
				area++;
				const [r = 0, c = 0] = current;
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
			largest = Math.max(largest, area);
		}
	}

	return largest;
};
