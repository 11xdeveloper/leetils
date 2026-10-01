/**
 * 1559. Detect Cycles in 2D Grid
 *
 * Returns whether the grid has a cycle of length at least 4 through
 * neighbouring cells holding the same letter (without stepping straight
 * back).
 *
 * Such a cycle exists exactly when the graph of same-letter neighbours has
 * a cycle at all, since any cycle in a grid has length at least 4. Union–find
 * over the right and down edges finds an edge joining cells already
 * connected.
 *
 * @see https://leetcode.com/problems/detect-cycles-in-2d-grid/
 * @difficulty Medium
 * @timeComplexity O(mn · α(mn))
 * @spaceComplexity O(mn)
 *
 * @example
 * detectCyclesIn2dGrid([["a", "b", "b"], ["b", "z", "b"], ["b", "b", "a"]]); // false
 */
export const detectCyclesIn2dGrid = (
	grid: readonly (readonly string[])[],
): boolean => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const parent = Array.from({ length: m * n }, (_, i) => i);
	const find = (x: number): number => {
		while (parent[x] !== x) {
			const grandparent = parent[parent[x] ?? x] ?? x;
			parent[x] = grandparent;
			x = grandparent;
		}
		return x;
	};
	for (let r = 0; r < m; r++) {
		for (let c = 0; c < n; c++) {
			for (const [r2, c2] of [
				[r, c + 1],
				[r + 1, c],
			] as const) {
				if (r2 >= m || c2 >= n || grid[r2]?.[c2] !== grid[r]?.[c]) continue;
				const [a, b] = [find(r * n + c), find(r2 * n + c2)];
				if (a === b) return true;
				parent[a] = b;
			}
		}
	}
	return false;
};
