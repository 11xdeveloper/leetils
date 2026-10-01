/**
 * 1102. Path With Maximum Minimum Value
 *
 * A path's score is the smallest value on it. Returns the highest score of a
 * path from the top-left to the bottom-right of `grid`, moving in the four
 * cardinal directions.
 *
 * Adds cells from the largest value down, joining each to its already-added
 * neighbours with union–find, until the two corners are connected. The last
 * value added is the answer.
 *
 * @see https://leetcode.com/problems/path-with-maximum-minimum-value/
 * @difficulty Medium
 * @timeComplexity O(mn log(mn))
 * @spaceComplexity O(mn)
 *
 * @example
 * pathWithMaximumMinimumValue([[5, 4, 5], [1, 2, 6], [7, 4, 6]]); // 4
 */
export const pathWithMaximumMinimumValue = (
	grid: readonly (readonly number[])[],
): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const value = (cell: number) => grid[Math.floor(cell / n)]?.[cell % n] ?? 0;
	const cells = Array.from({ length: m * n }, (_, i) => i).sort(
		(a, b) => value(b) - value(a),
	);
	const parent = Array.from({ length: m * n }, (_, i) => i);
	const find = (x: number): number => {
		while (parent[x] !== x) {
			const grandparent = parent[parent[x] ?? x] ?? x;
			parent[x] = grandparent;
			x = grandparent;
		}
		return x;
	};
	const added = new Uint8Array(m * n);
	const last = m * n - 1;
	for (const cell of cells) {
		added[cell] = 1;
		const [r, c] = [Math.floor(cell / n), cell % n];
		for (const [r2, c2] of [
			[r - 1, c],
			[r + 1, c],
			[r, c - 1],
			[r, c + 1],
		] as const) {
			if (r2 < 0 || r2 >= m || c2 < 0 || c2 >= n || !added[r2 * n + c2])
				continue;
			parent[find(r2 * n + c2)] = find(cell);
		}
		if (added[0] && added[last] && find(0) === find(last)) return value(cell);
	}
	return value(0);
};
