import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { shortestPathInAGridWithObstaclesElimination as shortestPath } from ".";

/** Tries every set of at most k obstacles to clear, with a plain search each time. */
const byBruteForce = (grid: number[][], k: number): number => {
	const [m, n] = [grid.length, grid[0]?.length ?? 0];
	const obstacles = grid.flatMap((row, r) =>
		row.flatMap((cell, c) => (cell ? [r * n + c] : [])),
	);
	let best = Infinity;
	for (let mask = 0; mask < 2 ** obstacles.length; mask++) {
		let cleared = 0;
		for (let rest = mask; rest > 0; rest &= rest - 1) cleared++;
		if (cleared > k) continue;
		const open = new Set(obstacles.filter((_, i) => !(mask & (1 << i))));
		const distance = new Map([[0, 0]]);
		const queue = [0];
		for (let i = 0; i < queue.length; i++) {
			const cell = queue[i] ?? 0;
			const [r, c] = [Math.floor(cell / n), cell % n];
			for (const [r2, c2] of [
				[r - 1, c],
				[r + 1, c],
				[r, c - 1],
				[r, c + 1],
			] as const) {
				const next = r2 * n + c2;
				if (
					r2 < 0 ||
					r2 >= m ||
					c2 < 0 ||
					c2 >= n ||
					open.has(next) ||
					distance.has(next)
				)
					continue;
				distance.set(next, (distance.get(cell) ?? 0) + 1);
				queue.push(next);
			}
		}
		best = Math.min(best, distance.get(m * n - 1) ?? Infinity);
	}
	return best === Infinity ? -1 : best;
};

describe("1293. Shortest Path in a Grid with Obstacles Elimination", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			shortestPath(
				[
					[0, 0, 0],
					[1, 1, 0],
					[0, 0, 0],
					[0, 1, 1],
					[0, 0, 0],
				],
				1,
			),
		).toBe(6);
		expect(
			shortestPath(
				[
					[0, 1, 1],
					[1, 1, 1],
					[1, 0, 0],
				],
				1,
			),
		).toBe(-1);
	});

	it("handles a single cell and a 40 × 40 grid", () => {
		expect(shortestPath([[0]], 1)).toBe(0);
		const grid = Array.from({ length: 40 }, (_, r) =>
			Array.from({ length: 40 }, (_, c) => ((r + c) % 3 === 1 ? 1 : 0)),
		);
		const firstRow = grid[0];
		const lastRow = grid[39];
		if (firstRow) firstRow[0] = 0;
		if (lastRow) lastRow[39] = 0;
		// Obstacles fill every third diagonal, and any path must cross all 26.
		expect(shortestPath(grid, 30)).toBe(78);
		expect(shortestPath(grid, 25)).toBe(-1);
	});

	it("matches clearing every set of obstacles on random grids", () => {
		const random = createRandom(1293);
		for (let run = 0; run < 150; run++) {
			const [m, n] = [random.int(1, 4), random.int(1, 4)];
			const grid = Array.from({ length: m }, (_, r) =>
				Array.from({ length: n }, (_, c): number =>
					(r === 0 && c === 0) || (r === m - 1 && c === n - 1)
						? 0
						: random.next() < 0.4
							? 1
							: 0,
				),
			);
			const k = random.int(1, 3);
			expect(shortestPath(grid, k)).toBe(byBruteForce(grid, k));
		}
	});
});
