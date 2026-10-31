/**
 * 2257. Count Unguarded Cells in the Grid
 *
 * Guards see in the four directions until a wall or another guard.
 * Counts the cells that are neither occupied nor seen.
 *
 * Mark walls and guards, then walk each guard's four lines of sight.
 *
 * @see https://leetcode.com/problems/count-unguarded-cells-in-the-grid/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * countUnguardedCellsInTheGrid(4, 6, [[0, 0], [1, 1], [2, 3]], [[0, 1], [2, 2], [1, 4]]); // 7
 */
export const countUnguardedCellsInTheGrid = (
	m: number,
	n: number,
	guards: readonly (readonly number[])[],
	walls: readonly (readonly number[])[],
): number => {
	const [EMPTY, SEEN, BLOCKED] = [0, 1, 2];
	const grid = new Uint8Array(m * n);
	for (const [r = 0, c = 0] of [...guards, ...walls]) grid[r * n + c] = BLOCKED;
	for (const [r = 0, c = 0] of guards) {
		for (const [dr, dc] of [
			[0, 1],
			[0, -1],
			[1, 0],
			[-1, 0],
		] as const) {
			for (
				let [row, col] = [r + dr, c + dc];
				row >= 0 &&
				row < m &&
				col >= 0 &&
				col < n &&
				grid[row * n + col] !== BLOCKED;
				[row, col] = [row + dr, col + dc]
			)
				grid[row * n + col] = SEEN;
		}
	}
	return grid.filter((cell) => cell === EMPTY).length;
};
