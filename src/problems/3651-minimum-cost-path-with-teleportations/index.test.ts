import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumCostPathWithTeleportations as minCost } from ".";

/** Bellman-Ford style relaxation over (cell, teleports used). */
const byBruteForce = (grid: number[][], k: number): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const cost = Array.from({ length: k + 1 }, () =>
		new Array<number>(m * n).fill(Number.POSITIVE_INFINITY),
	);
	(cost[0] as number[])[0] = 0;
	for (let changed = true; changed; ) {
		changed = false;
		const relax = (t: number, cell: number, value: number) => {
			if (value < (cost[t]?.[cell] ?? 0)) {
				(cost[t] as number[])[cell] = value;
				changed = true;
			}
		};
		for (let t = 0; t <= k; t++)
			for (let cell = 0; cell < m * n; cell++) {
				const here = cost[t]?.[cell] ?? Number.POSITIVE_INFINITY;
				if (here === Number.POSITIVE_INFINITY) continue;
				const [i, j] = [Math.floor(cell / n), cell % n];
				if (i + 1 < m) relax(t, cell + n, here + (grid[i + 1]?.[j] ?? 0));
				if (j + 1 < n) relax(t, cell + 1, here + (grid[i]?.[j + 1] ?? 0));
				if (t < k)
					for (let to = 0; to < m * n; to++)
						if (
							(grid[Math.floor(to / n)]?.[to % n] ?? 0) <= (grid[i]?.[j] ?? 0)
						)
							relax(t + 1, to, here);
			}
	}
	return Math.min(...cost.map((layer) => layer[m * n - 1] ?? 0));
};

describe("3651. Minimum Cost Path with Teleportations", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minCost(
				[
					[1, 3, 3],
					[2, 5, 4],
					[4, 3, 5],
				],
				2,
			),
		).toBe(7);
		expect(
			minCost(
				[
					[1, 2],
					[2, 3],
					[3, 4],
				],
				1,
			),
		).toBe(9);
	});

	it("matches relaxing every move on random grids", () => {
		const random = createRandom(3651);
		for (let run = 0; run < 100; run++) {
			const [m, n] = [random.int(1, 4), random.int(1, 4)];
			const grid = Array.from({ length: m }, () => random.array(n, 0, 6));
			const k = random.int(0, 3);
			expect(minCost(grid, k)).toBe(byBruteForce(grid, k));
		}
	});
});
