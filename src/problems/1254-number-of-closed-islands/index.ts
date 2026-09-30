/**
 * 1254. Number of Closed Islands
 *
 * In a grid of land (0) and water (1), returns how many islands (connected
 * groups of land, in four directions) don't touch the grid's edge.
 *
 * Floods each island with an explicit stack, noting whether it reaches the
 * edge.
 *
 * @see https://leetcode.com/problems/number-of-closed-islands/
 * @difficulty Medium
 * @timeComplexity O(mn)
 * @spaceComplexity O(mn)
 *
 * @example
 * numberOfClosedIslands([[0, 0, 1, 0, 0], [0, 1, 0, 1, 0], [0, 1, 1, 1, 0]]); // 1
 */
export const numberOfClosedIslands = (
	grid: readonly (readonly number[])[],
): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const seen = new Uint8Array(m * n);
	let closed = 0;
	for (let start = 0; start < m * n; start++) {
		if (seen[start] || grid[Math.floor(start / n)]?.[start % n] !== 0) continue;
		seen[start] = 1;
		let touchesEdge = false;
		const stack = [start];
		for (let cell = stack.pop(); cell !== undefined; cell = stack.pop()) {
			const [r, c] = [Math.floor(cell / n), cell % n];
			if (r === 0 || c === 0 || r === m - 1 || c === n - 1) touchesEdge = true;
			for (const [r2, c2] of [
				[r - 1, c],
				[r + 1, c],
				[r, c - 1],
				[r, c + 1],
			] as const) {
				if (c2 < 0 || c2 >= n || grid[r2]?.[c2] !== 0 || seen[r2 * n + c2])
					continue;
				seen[r2 * n + c2] = 1;
				stack.push(r2 * n + c2);
			}
		}
		if (!touchesEdge) closed++;
	}
	return closed;
};
