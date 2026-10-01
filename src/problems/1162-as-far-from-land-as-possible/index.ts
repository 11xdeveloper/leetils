/**
 * 1162. As Far from Land as Possible
 *
 * In an `n × n` grid of water (0) and land (1), returns the largest
 * Manhattan distance from a water cell to its nearest land, or -1 if the
 * grid is all land or all water.
 *
 * Breadth-first search from every land cell at once; the last layer
 * reached is the farthest water.
 *
 * @see https://leetcode.com/problems/as-far-from-land-as-possible/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n^2)
 *
 * @example
 * asFarFromLandAsPossible([[1, 0, 0], [0, 0, 0], [0, 0, 0]]); // 4
 */
export const asFarFromLandAsPossible = (
	grid: readonly (readonly number[])[],
): number => {
	const n = grid.length;
	const seen = new Uint8Array(n * n);
	let frontier: number[] = [];
	for (let r = 0; r < n; r++) {
		for (let c = 0; c < n; c++) {
			if (grid[r]?.[c] !== 1) continue;
			seen[r * n + c] = 1;
			frontier.push(r * n + c);
		}
	}
	if (frontier.length === 0 || frontier.length === n * n) return -1;
	let distance = -1;
	for (; frontier.length > 0; distance++) {
		const next: number[] = [];
		for (const cell of frontier) {
			const [r, c] = [Math.floor(cell / n), cell % n];
			for (const [r2, c2] of [
				[r - 1, c],
				[r + 1, c],
				[r, c - 1],
				[r, c + 1],
			] as const) {
				if (r2 < 0 || r2 >= n || c2 < 0 || c2 >= n || seen[r2 * n + c2])
					continue;
				seen[r2 * n + c2] = 1;
				next.push(r2 * n + c2);
			}
		}
		frontier = next;
	}
	return distance;
};
