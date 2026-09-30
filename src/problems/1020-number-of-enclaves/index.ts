/**
 * 1020. Number of Enclaves
 *
 * Counts the land cells (1) in `grid` from which you can't walk off the
 * grid, moving up, down, left or right over land.
 *
 * Flood fills from every land cell on the border, marking land that can
 * escape; the unmarked land is enclosed.
 *
 * @see https://leetcode.com/problems/number-of-enclaves/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * numberOfEnclaves([[0, 0, 0, 0], [1, 0, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]); // 3
 */
export const numberOfEnclaves = (
	grid: readonly (readonly number[])[],
): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const escapes = new Uint8Array(m * n);
	const stack: [number, number][] = [];
	for (let r = 0; r < m; r++) {
		for (let c = 0; c < n; c++) {
			if (
				(r === 0 || c === 0 || r === m - 1 || c === n - 1) &&
				grid[r]?.[c] === 1
			) {
				escapes[r * n + c] = 1;
				stack.push([r, c]);
			}
		}
	}
	for (let cell = stack.pop(); cell; cell = stack.pop()) {
		const [r, c] = cell;
		for (const [dr, dc] of [
			[-1, 0],
			[1, 0],
			[0, -1],
			[0, 1],
		] as const) {
			const [r2, c2] = [r + dr, c + dc];
			if (grid[r2]?.[c2] !== 1 || escapes[r2 * n + c2]) continue;
			escapes[r2 * n + c2] = 1;
			stack.push([r2, c2]);
		}
	}

	let enclosed = 0;
	for (let r = 0; r < m; r++)
		for (let c = 0; c < n; c++)
			if (grid[r]?.[c] === 1 && !escapes[r * n + c]) enclosed++;
	return enclosed;
};
