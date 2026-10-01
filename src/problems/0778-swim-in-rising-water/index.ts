import { Heap } from "../../internal/heap";

/**
 * 778. Swim in Rising Water
 *
 * At time `t` the water is at height `t`, and you can swim between
 * neighbouring cells whose elevations are both at most `t`. Returns the
 * earliest time you can get from the top-left to the bottom-right of the
 * `n × n` grid.
 *
 * The time a route needs is its highest cell. Dijkstra's algorithm with
 * that as the cost always expands the reachable cell with the lowest
 * elevation-so-far, and reaches the corner at the best time.
 *
 * @see https://leetcode.com/problems/swim-in-rising-water/
 * @difficulty Hard
 * @timeComplexity O(n^2 log n)
 * @spaceComplexity O(n^2)
 *
 * @example
 * swimInRisingWater([[0, 2], [1, 3]]); // 3
 */
export const swimInRisingWater = (
	grid: readonly (readonly number[])[],
): number => {
	const n = grid.length;
	const seen = new Uint8Array(n * n);
	const queue = new Heap<[time: number, row: number, col: number]>(
		(a, b) => a[0] - b[0],
		[[grid[0]?.[0] ?? 0, 0, 0]],
	);
	seen[0] = 1;

	for (let entry = queue.pop(); entry; entry = queue.pop()) {
		const [time, row, col] = entry;
		if (row === n - 1 && col === n - 1) return time;
		for (const [dr, dc] of [
			[-1, 0],
			[1, 0],
			[0, -1],
			[0, 1],
		] as const) {
			const [r, c] = [row + dr, col + dc];
			const height = grid[r]?.[c];
			if (height === undefined || seen[r * n + c]) continue;
			seen[r * n + c] = 1;
			queue.push([Math.max(time, height), r, c]);
		}
	}

	return -1;
};
