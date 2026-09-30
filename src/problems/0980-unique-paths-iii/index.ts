/**
 * 980. Unique Paths III
 *
 * In `grid`, 1 is the start, 2 the end, 0 empty and -1 an obstacle. Counts
 * the walks (up, down, left, right) from start to end that visit every
 * non-obstacle cell exactly once.
 *
 * Backtracking over paths, counting the cells still to visit. The grid has
 * at most 20 cells, so the recursion stays shallow.
 *
 * @see https://leetcode.com/problems/unique-paths-iii/
 * @difficulty Hard
 * @timeComplexity O(3^c) for c empty cells
 * @spaceComplexity O(c)
 *
 * @example
 * uniquePathsIII([[1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, -1]]); // 2
 */
export const uniquePathsIII = (
	grid: readonly (readonly number[])[],
): number => {
	const cells = grid.map((row) => [...row]);
	let remaining = 0;
	let start: [number, number] = [0, 0];
	for (const [r, row] of cells.entries()) {
		for (const [c, cell] of row.entries()) {
			if (cell !== -1) remaining++;
			if (cell === 1) start = [r, c];
		}
	}

	const walk = (r: number, c: number, left: number): number => {
		const row = cells[r];
		const cell = row?.[c];
		if (!row || cell === undefined || cell === -1) return 0;
		if (cell === 2) return left === 1 ? 1 : 0;
		row[c] = -1;
		const paths =
			walk(r + 1, c, left - 1) +
			walk(r - 1, c, left - 1) +
			walk(r, c + 1, left - 1) +
			walk(r, c - 1, left - 1);
		row[c] = cell;
		return paths;
	};

	return walk(start[0], start[1], remaining);
};
