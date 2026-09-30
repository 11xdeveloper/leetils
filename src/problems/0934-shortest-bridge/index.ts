/**
 * 934. Shortest Bridge
 *
 * The binary `grid` has exactly two islands. Returns the fewest 0s to flip
 * to 1 to connect them.
 *
 * Finds one island with a flood fill, then grows it outwards one layer at
 * a time with a breadth-first search until it touches the other island.
 *
 * @see https://leetcode.com/problems/shortest-bridge/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n^2)
 *
 * @example
 * shortestBridge([[0, 1, 0], [0, 0, 0], [0, 0, 1]]); // 2
 */
export const shortestBridge = (
	grid: readonly (readonly number[])[],
): number => {
	const n = grid.length;
	const directions = [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1],
	] as const;
	const seen = new Uint8Array(n * n);

	const first = grid.flat().indexOf(1);
	seen[first] = 1;
	let frontier = [first];
	for (let i = 0; i < frontier.length; i++) {
		const cell = frontier[i] ?? 0;
		const [r, c] = [Math.floor(cell / n), cell % n];
		for (const [dr, dc] of directions) {
			const [r2, c2] = [r + dr, c + dc];
			if (grid[r2]?.[c2] !== 1 || seen[r2 * n + c2]) continue;
			seen[r2 * n + c2] = 1;
			frontier.push(r2 * n + c2);
		}
	}

	for (let flips = 0; frontier.length > 0; flips++) {
		const next: number[] = [];
		for (const cell of frontier) {
			const [r, c] = [Math.floor(cell / n), cell % n];
			for (const [dr, dc] of directions) {
				const [r2, c2] = [r + dr, c + dc];
				const value = grid[r2]?.[c2];
				if (value === undefined || c2 < 0 || c2 >= n || seen[r2 * n + c2])
					continue;
				if (value === 1) return flips;
				seen[r2 * n + c2] = 1;
				next.push(r2 * n + c2);
			}
		}
		frontier = next;
	}
	return -1;
};
