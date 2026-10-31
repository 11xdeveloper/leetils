import { Heap } from "../../internal/heap";

/**
 * 4003. Minimum Cost Path with Alternating Directions III
 *
 * Start at the top-left of an m × n grid, paying 1. Each action moves to a
 * neighbour (paying its entry cost (i + 1)(j + 1)) or waits. Odd actions
 * should go right or down and even ones left or up; going against that
 * adds the current cell's penalty, as does waiting. Returns the least cost
 * to reach the bottom-right.
 *
 * Dijkstra over (cell, parity of the next action).
 *
 * @see https://leetcode.com/problems/minimum-cost-path-with-alternating-directions-iii/
 * @difficulty Hard
 * @timeComplexity O(m · n log(m · n))
 * @spaceComplexity O(m · n)
 *
 * @example
 * minimumCostPathWithAlternatingDirectionsIII(2, 2, [[5, 3], [1, 4]]); // 8
 */
export const minimumCostPathWithAlternatingDirectionsIII = (
	m: number,
	n: number,
	penalty: readonly (readonly number[])[],
): number => {
	const cells = m * n;
	// State: cell * 2 + parity, parity 1 when the next action is odd.
	const best = new Float64Array(2 * cells).fill(Number.POSITIVE_INFINITY);
	best[1] = 1;
	const heap = new Heap<[cost: number, state: number]>(
		(a, b) => a[0] - b[0],
		[[1, 1]],
	);
	while (heap.size > 0) {
		const [cost, state] = heap.pop() ?? [0, 0];
		if (cost > (best[state] ?? 0)) continue;
		const [cell, odd] = [state >> 1, state & 1];
		if (cell === cells - 1) return cost;
		const [r, c] = [Math.floor(cell / n), cell % n];
		const here = penalty[r]?.[c] ?? 0;
		const relax = (to: number, extra: number) => {
			const next = to * 2 + (1 - odd);
			if (cost + extra < (best[next] ?? 0)) {
				best[next] = cost + extra;
				heap.push([cost + extra, next]);
			}
		};
		relax(cell, here);
		for (const [dr, dc, forward] of [
			[0, 1, true],
			[1, 0, true],
			[0, -1, false],
			[-1, 0, false],
		] as const) {
			const [nr, nc] = [r + dr, c + dc];
			if (nr < 0 || nc < 0 || nr >= m || nc >= n) continue;
			const allowed = forward === (odd === 1);
			relax(nr * n + nc, (nr + 1) * (nc + 1) + (allowed ? 0 : here));
		}
	}
	return -1;
};
