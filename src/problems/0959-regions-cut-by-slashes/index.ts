/**
 * 959. Regions Cut By Slashes
 *
 * Each cell of the `n × n` grid is blank, `/` or `\`, cutting the square
 * diagonally. Returns how many regions the grid is divided into.
 *
 * Splits each cell into four triangles (top, right, bottom, left) and joins
 * them with union–find: a blank joins all four, a slash joins the pairs on
 * each side of it, and neighbouring cells join their touching triangles.
 *
 * @see https://leetcode.com/problems/regions-cut-by-slashes/
 * @difficulty Medium
 * @timeComplexity O(n^2 · α(n))
 * @spaceComplexity O(n^2)
 *
 * @example
 * regionsCutBySlashes([" /", "/ "]); // 2
 */
export const regionsCutBySlashes = (grid: readonly string[]): number => {
	const n = grid.length;
	const parent = Array.from({ length: 4 * n * n }, (_, i) => i);
	let regions = parent.length;
	const find = (x: number): number => {
		while (parent[x] !== x) {
			const grandparent = parent[parent[x] ?? x] ?? x;
			parent[x] = grandparent;
			x = grandparent;
		}
		return x;
	};
	const union = (a: number, b: number): void => {
		const [rootA, rootB] = [find(a), find(b)];
		if (rootA === rootB) return;
		parent[rootA] = rootB;
		regions--;
	};

	for (let r = 0; r < n; r++) {
		for (let c = 0; c < n; c++) {
			const base = 4 * (r * n + c);
			const [top, right, bottom, left] = [base, base + 1, base + 2, base + 3];
			const cut = grid[r]?.charAt(c);
			if (cut !== "\\") {
				union(top, left);
				union(right, bottom);
			}
			if (cut !== "/") {
				union(top, right);
				union(bottom, left);
			}
			if (r + 1 < n) union(bottom, 4 * ((r + 1) * n + c));
			if (c + 1 < n) union(right, 4 * (r * n + c + 1) + 3);
		}
	}
	return regions;
};
