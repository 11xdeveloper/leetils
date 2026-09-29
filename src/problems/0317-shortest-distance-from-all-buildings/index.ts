/**
 * 317. Shortest Distance from All Buildings
 *
 * In a grid of empty land (0), buildings (1) and obstacles (2), returns the
 * smallest total walking distance from one empty cell to every building,
 * moving up, down, left or right through empty land only. Returns -1 if no
 * empty cell can reach every building.
 *
 * Runs a breadth-first search from each building, adding each empty cell's
 * distance to a running total and counting how many buildings reach it. The
 * answer is the smallest total among cells reached by every building.
 *
 * @see https://leetcode.com/problems/shortest-distance-from-all-buildings/
 * @difficulty Hard
 * @timeComplexity O(b * m * n) where b is the number of buildings
 * @spaceComplexity O(m * n)
 *
 * @example
 * shortestDistanceFromAllBuildings([[1, 0, 2, 0, 1], [0, 0, 0, 0, 0], [0, 0, 1, 0, 0]]); // 7
 */
export const shortestDistanceFromAllBuildings = (
	grid: readonly (readonly number[])[],
): number => {
	const rows = grid.length;
	const columns = grid[0]?.length ?? 0;
	const total = new Array<number>(rows * columns).fill(0);
	const reached = new Array<number>(rows * columns).fill(0);
	let buildings = 0;

	for (const [r, row] of grid.entries()) {
		for (const [c, cell] of row.entries()) {
			if (cell !== 1) continue;
			buildings++;

			const distance = new Int32Array(rows * columns).fill(-1);
			distance[r * columns + c] = 0;
			const queue: [number, number][] = [[r, c]];
			for (let head = 0; head < queue.length; head++) {
				const [qr, qc] = queue[head] ?? [0, 0];
				const steps = (distance[qr * columns + qc] ?? 0) + 1;
				for (const [nr, nc] of [
					[qr + 1, qc],
					[qr - 1, qc],
					[qr, qc + 1],
					[qr, qc - 1],
				] as const) {
					const index = nr * columns + nc;
					if (grid[nr]?.[nc] !== 0 || distance[index] !== -1) continue;
					distance[index] = steps;
					total[index] = (total[index] ?? 0) + steps;
					reached[index] = (reached[index] ?? 0) + 1;
					queue.push([nr, nc]);
				}
			}
		}
	}

	let best = Number.POSITIVE_INFINITY;
	for (const [index, count] of reached.entries()) {
		if (count === buildings) best = Math.min(best, total[index] ?? 0);
	}
	return best === Number.POSITIVE_INFINITY ? -1 : best;
};
