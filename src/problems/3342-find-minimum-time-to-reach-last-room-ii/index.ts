import { Heap } from "../../internal/heap";

/**
 * 3342. Find Minimum Time to Reach Last Room II
 *
 * The earliest time you can reach the bottom-right room of the grid,
 * starting from the top-left at time 0. Moves alternate between taking one second and two, starting with one, and you can only start moving into a room once its `moveTime` has come.
 *
 * Dijkstra, where entering a room means waiting for its time if needed and then paying for the move. Every move flips the parity of row + column, so the cost of a move out of a room depends only on that room's parity.
 *
 * @see https://leetcode.com/problems/find-minimum-time-to-reach-last-room-ii/
 * @difficulty Medium
 * @timeComplexity O(m · n log(m · n))
 * @spaceComplexity O(m · n)
 *
 * @example
 * findMinimumTimeToReachLastRoomII([[0, 4], [4, 4]]); // 7
 */
export const findMinimumTimeToReachLastRoomII = (
	moveTime: readonly (readonly number[])[],
): number => {
	const m = moveTime.length;
	const n = moveTime[0]?.length ?? 0;
	const best = new Float64Array(m * n).fill(Number.POSITIVE_INFINITY);
	best[0] = 0;
	const queue = new Heap<[time: number, cell: number]>(
		(a, b) => a[0] - b[0],
		[[0, 0]],
	);
	for (let top = queue.pop(); top; top = queue.pop()) {
		const [time, cell] = top;
		if (time > (best[cell] ?? 0)) continue;
		const [r, c] = [Math.floor(cell / n), cell % n];
		if (r === m - 1 && c === n - 1) return time;
		for (const [dr, dc] of [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1],
		] as const) {
			const [nr, nc] = [r + dr, c + dc];
			if (nr < 0 || nc < 0 || nr >= m || nc >= n) continue;
			const arrive =
				Math.max(time, moveTime[nr]?.[nc] ?? 0) + ((r + c) % 2) + 1;
			if (arrive < (best[nr * n + nc] ?? 0)) {
				best[nr * n + nc] = arrive;
				queue.push([arrive, nr * n + nc]);
			}
		}
	}
	return -1;
};
