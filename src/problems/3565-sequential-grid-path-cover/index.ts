/**
 * 3565. Sequential Grid Path Cover
 *
 * Find a path visiting every cell of the grid once, moving between
 * neighbouring cells, that meets the numbered cells 1 to k in order.
 * Returns it as a list of `[row, column]`, or `[]`.
 *
 * The grid has at most six cells, so backtrack from every start, only
 * stepping onto a numbered cell when it's the next number due.
 *
 * @see https://leetcode.com/problems/sequential-grid-path-cover/
 * @difficulty Medium
 * @timeComplexity O(m · n · 3^(m · n))
 * @spaceComplexity O(m · n)
 *
 * @example
 * sequentialGridPathCover([[0, 0, 0], [0, 1, 2]], 2); // [[0, 0], [1, 0], [1, 1], [1, 2], [0, 2], [0, 1]]
 */
export const sequentialGridPathCover = (
	grid: readonly (readonly number[])[],
	k: number,
): number[][] => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const visited = new Uint8Array(m * n);
	const path: number[][] = [];
	const walk = (r: number, c: number, next: number): boolean => {
		const value = grid[r]?.[c] ?? 0;
		if (value !== 0 && value !== next) return false;
		const due = value === next ? next + 1 : next;
		visited[r * n + c] = 1;
		path.push([r, c]);
		if (path.length === m * n) {
			if (due === k + 1) return true;
		} else
			for (const [dr, dc] of [
				[1, 0],
				[-1, 0],
				[0, 1],
				[0, -1],
			] as const) {
				const [nr, nc] = [r + dr, c + dc];
				if (
					nr >= 0 &&
					nc >= 0 &&
					nr < m &&
					nc < n &&
					!visited[nr * n + nc] &&
					walk(nr, nc, due)
				)
					return true;
			}
		visited[r * n + c] = 0;
		path.pop();
		return false;
	};
	for (let r = 0; r < m; r++)
		for (let c = 0; c < n; c++) if (walk(r, c, 1)) return path;
	return [];
};
