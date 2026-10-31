/**
 * 3286. Find a Safe Walk Through a Grid
 *
 * Walk from the top-left to the bottom-right cell, losing 1 health on every
 * unsafe cell (1) you stand on, including the start. Returns whether you
 * can arrive with at least 1 health.
 *
 * Find the path through the fewest unsafe cells with a 0-1 breadth-first
 * search.
 *
 * @see https://leetcode.com/problems/find-a-safe-walk-through-a-grid/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * findASafeWalkThroughAGrid([[0, 1, 0, 0, 0], [0, 1, 0, 1, 0], [0, 0, 0, 1, 0]], 1); // true
 */
export const findASafeWalkThroughAGrid = (
	grid: readonly (readonly number[])[],
	health: number,
): boolean => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const cost = new Int32Array(m * n).fill(-1);
	const deque = new Int32Array(2 * m * n + 1);
	let head = m * n;
	let tail = head;
	const start = grid[0]?.[0] ?? 0;
	const lowest = new Int32Array(m * n).fill(2 ** 30);
	lowest[0] = start;
	deque[tail++] = 0;
	while (head < tail) {
		const cell = deque[head++] ?? 0;
		if (cost[cell] !== -1) continue;
		cost[cell] = lowest[cell] ?? 0;
		const [r, c] = [Math.floor(cell / n), cell % n];
		for (const [dr, dc] of [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1],
		] as const) {
			const [nr, nc] = [r + dr, c + dc];
			if (nr < 0 || nc < 0 || nr >= m || nc >= n) continue;
			const next = nr * n + nc;
			const weight = grid[nr]?.[nc] ?? 0;
			const total = (cost[cell] ?? 0) + weight;
			if (cost[next] !== -1 || total >= (lowest[next] ?? 0)) continue;
			lowest[next] = total;
			if (weight === 0) deque[--head] = next;
			else deque[tail++] = next;
		}
	}
	return health - (cost[m * n - 1] ?? 0) >= 1;
};
