/**
 * 1914. Cyclically Rotating a Grid
 *
 * Rotates every layer of the even-sided `grid` counter-clockwise `k`
 * times. Returns the result.
 *
 * Read each layer as a list in clockwise order, then write it back
 * shifted by `k mod length`.
 *
 * @see https://leetcode.com/problems/cyclically-rotating-a-grid/
 * @difficulty Medium
 * @timeComplexity O(mn)
 * @spaceComplexity O(mn)
 *
 * @example
 * cyclicallyRotatingAGrid([[40, 10], [30, 20]], 1); // [[10, 20], [40, 30]]
 */
export const cyclicallyRotatingAGrid = (
	grid: readonly (readonly number[])[],
	k: number,
): number[][] => {
	const [m, n] = [grid.length, grid[0]?.length ?? 0];
	const result = grid.map((row) => [...row]);
	for (let layer = 0; layer < Math.min(m, n) / 2; layer++) {
		const [top, left, bottom, right] = [
			layer,
			layer,
			m - 1 - layer,
			n - 1 - layer,
		];
		const cells: [number, number][] = [];
		for (let c = left; c < right; c++) cells.push([top, c]);
		for (let r = top; r < bottom; r++) cells.push([r, right]);
		for (let c = right; c > left; c--) cells.push([bottom, c]);
		for (let r = bottom; r > top; r--) cells.push([r, left]);
		const values = cells.map(([r, c]) => grid[r]?.[c] ?? 0);
		const shift = k % cells.length;
		for (const [i, [r, c]] of cells.entries()) {
			const row = result[r];
			if (row) row[c] = values[(i + shift) % cells.length] ?? 0;
		}
	}
	return result;
};
