/**
 * 2174. Remove All Ones With Row and Column Flips II
 *
 * An operation picks a cell holding 1 and sets its whole row and column
 * to 0. Returns the fewest operations to clear the grid (at most 15
 * cells).
 *
 * Breadth-first search over the grid as a bitmask.
 *
 * @see https://leetcode.com/problems/remove-all-ones-with-row-and-column-flips-ii/
 * @difficulty Medium
 * @timeComplexity O(2^(mn) · mn)
 * @spaceComplexity O(2^(mn))
 *
 * @example
 * removeAllOnesWithRowAndColumnFlipsII([[1, 1, 1], [1, 1, 1], [0, 1, 0]]); // 2
 */
export const removeAllOnesWithRowAndColumnFlipsII = (
	grid: readonly (readonly number[])[],
): number => {
	const [m, n] = [grid.length, grid[0]?.length ?? 0];
	let start = 0;
	for (let r = 0; r < m; r++)
		for (let c = 0; c < n; c++) if (grid[r]?.[c]) start |= 1 << (r * n + c);
	// The cells cleared by an operation at each cell.
	const clears = Array.from({ length: m * n }, (_, cell) => {
		const [row, col] = [Math.floor(cell / n), cell % n];
		let mask = 0;
		for (let c = 0; c < n; c++) mask |= 1 << (row * n + c);
		for (let r = 0; r < m; r++) mask |= 1 << (r * n + col);
		return mask;
	});
	const steps = new Map([[start, 0]]);
	const queue = [start];
	for (let head = 0; head < queue.length; head++) {
		const state = queue[head] ?? 0;
		const taken = steps.get(state) ?? 0;
		if (state === 0) return taken;
		for (let cell = 0; cell < m * n; cell++) {
			if (!(state & (1 << cell))) continue;
			const next = state & ~(clears[cell] ?? 0);
			if (steps.has(next)) continue;
			steps.set(next, taken + 1);
			queue.push(next);
		}
	}
	return 0;
};
