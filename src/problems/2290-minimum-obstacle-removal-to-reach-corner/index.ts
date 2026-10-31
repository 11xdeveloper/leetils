/**
 * 2290. Minimum Obstacle Removal to Reach Corner
 *
 * Returns the fewest obstacles (1s) to remove so the bottom-right of
 * `grid` can be reached from the top-left.
 *
 * 0-1 breadth-first search: stepping onto an empty cell costs nothing
 * (front of the deque), onto an obstacle costs 1 (back).
 *
 * @see https://leetcode.com/problems/minimum-obstacle-removal-to-reach-corner/
 * @difficulty Hard
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * minimumObstacleRemovalToReachCorner([[0, 1, 1], [1, 1, 0], [1, 1, 0]]); // 2
 */
export const minimumObstacleRemovalToReachCorner = (
	grid: readonly (readonly number[])[],
): number => {
	const [m, n] = [grid.length, grid[0]?.length ?? 0];
	const removed = new Array<number>(m * n).fill(Infinity);
	removed[0] = 0;
	// A deque as an array with a moving head; zero-cost steps go before it.
	const deque = new Int32Array(2 * m * n + 1);
	let [head, tail] = [m * n, m * n];
	deque[tail++] = 0;
	while (head < tail) {
		const cell = deque[head++] ?? 0;
		const [r, c] = [Math.floor(cell / n), cell % n];
		for (const [nr, nc] of [
			[r - 1, c],
			[r + 1, c],
			[r, c - 1],
			[r, c + 1],
		] as const) {
			const obstacle = grid[nr]?.[nc];
			if (obstacle === undefined) continue;
			const next = nr * n + nc;
			const cost = (removed[cell] ?? 0) + obstacle;
			if (cost >= (removed[next] ?? Infinity)) continue;
			removed[next] = cost;
			if (obstacle) deque[tail++] = next;
			else deque[--head] = next;
		}
	}
	return removed[m * n - 1] ?? 0;
};
