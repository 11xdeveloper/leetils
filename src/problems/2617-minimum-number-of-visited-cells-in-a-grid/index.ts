/**
 * 2617. Minimum Number of Visited Cells in a Grid
 *
 * From cell `(i, j)` you may jump right to any of the next `grid[i][j]`
 * cells in the row, or down by up to as many in the column. Returns the
 * fewest cells visited, counting both ends, from the top-left to the
 * bottom-right, or -1 if it can't be reached.
 *
 * Breadth-first search. Each row and each column keeps a "next unvisited"
 * union–find, so every cell is found and dequeued once.
 *
 * @see https://leetcode.com/problems/minimum-number-of-visited-cells-in-a-grid/
 * @difficulty Hard
 * @timeComplexity O(m · n α(m · n))
 * @spaceComplexity O(m · n)
 *
 * @example
 * minimumNumberOfVisitedCellsInAGrid([[3, 4, 2, 1], [4, 2, 1, 1], [2, 1, 1, 0], [3, 4, 1, 0]]); // 3
 */
export const minimumNumberOfVisitedCellsInAGrid = (
	grid: readonly (readonly number[])[],
): number => {
	const rows = grid.length;
	const cols = grid[0]?.length ?? 0;
	// rowNext[r][c]: the first unvisited column ≥ c in row r (cols if none).
	const rowNext = Array.from({ length: rows }, () =>
		Array.from({ length: cols + 1 }, (_, c) => c),
	);
	const colNext = Array.from({ length: cols }, () =>
		Array.from({ length: rows + 1 }, (_, r) => r),
	);
	const find = (next: number[], i: number): number => {
		let root = i;
		while (next[root] !== root) root = next[root] ?? root;
		while (next[i] !== root) {
			const up = next[i] ?? root;
			next[i] = root;
			i = up;
		}
		return root;
	};
	const visit = (r: number, c: number): void => {
		const row = rowNext[r] ?? [];
		const col = colNext[c] ?? [];
		row[c] = c + 1;
		col[r] = r + 1;
	};

	visit(0, 0);
	let frontier: [number, number][] = [[0, 0]];
	for (let cells = 1; frontier.length > 0; cells++) {
		const next: [number, number][] = [];
		for (const [r, c] of frontier) {
			if (r === rows - 1 && c === cols - 1) return cells;
			const reach = grid[r]?.[c] ?? 0;
			const row = rowNext[r] ?? [];
			for (
				let j = find(row, c + 1);
				j <= Math.min(cols - 1, c + reach);
				j = find(row, j)
			) {
				visit(r, j);
				next.push([r, j]);
			}
			const col = colNext[c] ?? [];
			for (
				let i = find(col, r + 1);
				i <= Math.min(rows - 1, r + reach);
				i = find(col, i)
			) {
				visit(i, c);
				next.push([i, c]);
			}
		}
		frontier = next;
	}
	return -1;
};
