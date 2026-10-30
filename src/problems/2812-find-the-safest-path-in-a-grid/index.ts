/**
 * 2812. Find the Safest Path in a Grid
 *
 * A path's safeness is the smallest Manhattan distance from any of its
 * cells to a thief (a 1). Returns the largest safeness of a path from the
 * top-left to the bottom-right.
 *
 * Breadth-first search from every thief at once gives each cell's
 * distance. Then visit cells from safest down, with buckets by distance,
 * until the destination is reached; the lowest distance taken so far is
 * the answer.
 *
 * @see https://leetcode.com/problems/find-the-safest-path-in-a-grid/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(n²)
 *
 * @example
 * findTheSafestPathInAGrid([[0, 0, 1], [0, 0, 0], [0, 0, 0]]); // 2
 */
export const findTheSafestPathInAGrid = (
	grid: readonly (readonly number[])[],
): number => {
	const n = grid.length;
	const distance = Array.from({ length: n * n }, () => -1);
	let queue: number[] = [];
	for (const [r, row] of grid.entries())
		for (const [c, cell] of row.entries())
			if (cell === 1) {
				distance[r * n + c] = 0;
				queue.push(r * n + c);
			}
	const neighbours = (cell: number): number[] => {
		const r = Math.floor(cell / n);
		const c = cell % n;
		const result: number[] = [];
		if (r > 0) result.push(cell - n);
		if (r < n - 1) result.push(cell + n);
		if (c > 0) result.push(cell - 1);
		if (c < n - 1) result.push(cell + 1);
		return result;
	};
	for (let d = 0; queue.length > 0; d++) {
		const next: number[] = [];
		for (const cell of queue)
			for (const other of neighbours(cell))
				if (distance[other] === -1) {
					distance[other] = d + 1;
					next.push(other);
				}
		queue = next;
	}

	const buckets: number[][] = Array.from({ length: 2 * n }, () => []);
	const seen = new Uint8Array(n * n);
	let safeness = distance[0] ?? 0;
	buckets[safeness]?.push(0);
	seen[0] = 1;
	for (let level = safeness; level >= 0; level--) {
		const bucket = buckets[level] ?? [];
		while (bucket.length > 0) {
			const cell = bucket.pop() ?? 0;
			safeness = Math.min(safeness, level);
			if (cell === n * n - 1) return safeness;
			for (const other of neighbours(cell)) {
				if (seen[other]) continue;
				seen[other] = 1;
				const d = distance[other] ?? 0;
				if (d >= level) bucket.push(other);
				else buckets[d]?.push(other);
			}
		}
	}
	return safeness;
};
