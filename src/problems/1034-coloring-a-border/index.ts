/**
 * 1034. Coloring A Border
 *
 * The connected component of `grid[row][col]` is the cells of the same
 * colour reachable from it. Returns a copy of `grid` with the component's
 * border (cells on the grid's edge or next to a cell outside the
 * component) recoloured to `color`.
 *
 * Flood fills the component with an explicit stack, marking its cells, then
 * recolours those with a neighbour outside it.
 *
 * @see https://leetcode.com/problems/coloring-a-border/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * coloringABorder([[1, 1], [1, 2]], 0, 0, 3); // [[3, 3], [3, 2]]
 */
export const coloringABorder = (
	grid: readonly (readonly number[])[],
	row: number,
	col: number,
	color: number,
): number[][] => {
	const n = grid[0]?.length ?? 0;
	const original = grid[row]?.[col];
	const inComponent = new Set([row * n + col]);
	const stack = [[row, col]];
	const directions = [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1],
	] as const;
	for (let cell = stack.pop(); cell; cell = stack.pop()) {
		const [r = 0, c = 0] = cell;
		for (const [dr, dc] of directions) {
			const [r2, c2] = [r + dr, c + dc];
			if (
				c2 < 0 ||
				c2 >= n ||
				grid[r2]?.[c2] !== original ||
				inComponent.has(r2 * n + c2)
			)
				continue;
			inComponent.add(r2 * n + c2);
			stack.push([r2, c2]);
		}
	}

	const result = grid.map((cells) => [...cells]);
	for (const key of inComponent) {
		const [r, c] = [Math.floor(key / n), key % n];
		const onBorder = directions.some(([dr, dc]) => {
			const [r2, c2] = [r + dr, c + dc];
			return (
				r2 < 0 ||
				r2 >= grid.length ||
				c2 < 0 ||
				c2 >= n ||
				!inComponent.has(r2 * n + c2)
			);
		});
		const cells = result[r];
		if (onBorder && cells) cells[c] = color;
	}
	return result;
};
