import { describe, expect, it } from "bun:test";
import { Heap } from "../../internal/heap";
import { createRandom } from "../../testing/random";
import { minimumCostPathWithAtMostKTurns as minCost } from ".";

/** Dijkstra over (cell, direction, turns). */
const byBruteForce = (grid: number[][], k: number): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	if (m * n === 1) return grid[0]?.[0] ?? 0;
	const dirs = [
		[0, 1],
		[1, 0],
		[0, -1],
		[-1, 0],
	];
	const best = new Map<string, number>();
	const heap = new Heap<[number, number, number, number, number]>(
		(a, b) => a[0] - b[0],
		[[grid[0]?.[0] ?? 0, 0, 0, -1, 0]],
	);
	while (heap.size > 0) {
		const [cost, r, c, d, t] = heap.pop() ?? [0, 0, 0, 0, 0];
		const key = `${r},${c},${d},${t}`;
		if (best.has(key)) continue;
		best.set(key, cost);
		if (r === m - 1 && c === n - 1) return cost;
		dirs.forEach(([dr = 0, dc = 0], nd) => {
			const [nr, nc] = [r + dr, c + dc];
			const nt = d === -1 || d === nd ? t : t + 1;
			if (nr < 0 || nc < 0 || nr >= m || nc >= n || nt > k) return;
			heap.push([cost + (grid[nr]?.[nc] ?? 0), nr, nc, nd, nt]);
		});
	}
	return -1;
};

describe("4046. Minimum Cost Path With At Most K Turns", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minCost(
				[
					[2, 7, 3],
					[1, 4, 5],
				],
				1,
			),
		).toBe(12);
		expect(
			minCost(
				[
					[4, 1, 9],
					[3, 2, 5],
					[4, 8, 6],
				],
				2,
			),
		).toBe(20);
		expect(
			minCost(
				[
					[1, 9],
					[3, 4],
				],
				0,
			),
		).toBe(-1);
	});

	it("matches Dijkstra on random grids", () => {
		const random = createRandom(4046);
		for (let run = 0; run < 150; run++) {
			const [m, n] = [random.int(1, 4), random.int(1, 4)];
			const grid = Array.from({ length: m }, () => random.array(n, 0, 9));
			const k = random.int(0, Math.max(0, Math.min(m, n) - 1));
			expect(minCost(grid, k)).toBe(byBruteForce(grid, k));
		}
	});
});
