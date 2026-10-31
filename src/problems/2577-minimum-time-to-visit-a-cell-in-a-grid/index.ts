import { Heap } from "../../internal/heap";

/**
 * 2577. Minimum Time to Visit a Cell In a Grid
 *
 * Starting at the top-left at time 0, each second you must move to a
 * neighbouring cell, and may enter cell `(r, c)` only at time
 * `grid[r][c]` or later. Returns the earliest time you can reach the
 * bottom-right, or -1 if you can't.
 *
 * If neither first move is possible at time 1, you're stuck. Otherwise
 * you can always pace back and forth to wait, which costs time in steps
 * of two, so run Dijkstra where entering a cell early is delayed to the
 * next allowed time with the right parity.
 *
 * @see https://leetcode.com/problems/minimum-time-to-visit-a-cell-in-a-grid/
 * @difficulty Hard
 * @timeComplexity O(m · n log(m · n))
 * @spaceComplexity O(m · n)
 *
 * @example
 * minimumTimeToVisitACellInAGrid([[0, 1, 3, 2], [5, 1, 2, 5], [4, 3, 8, 6]]); // 7
 */
export const minimumTimeToVisitACellInAGrid = (
	grid: readonly (readonly number[])[],
): number => {
	const rows = grid.length;
	const cols = grid[0]?.length ?? 0;
	if ((grid[0]?.[1] ?? 2) > 1 && (grid[1]?.[0] ?? 2) > 1) return -1;

	const best = Array.from(
		{ length: rows * cols },
		() => Number.POSITIVE_INFINITY,
	);
	best[0] = 0;
	const queue = new Heap<[time: number, cell: number]>(
		(a, b) => a[0] - b[0],
		[[0, 0]],
	);
	for (let entry = queue.pop(); entry; entry = queue.pop()) {
		const [time, cell] = entry;
		if (time > (best[cell] ?? 0)) continue;
		const r = Math.floor(cell / cols);
		const c = cell % cols;
		if (r === rows - 1 && c === cols - 1) return time;
		for (const [nr, nc] of [
			[r - 1, c],
			[r + 1, c],
			[r, c - 1],
			[r, c + 1],
		] as const) {
			const opens = grid[nr]?.[nc];
			if (opens === undefined) continue;
			let arrival = time + 1;
			if (arrival < opens) arrival = opens + ((opens - arrival) % 2);
			const next = nr * cols + nc;
			if (arrival < (best[next] ?? 0)) {
				best[next] = arrival;
				queue.push([arrival, next]);
			}
		}
	}
	return -1;
};
