import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumCostToMakeAtLeastOneValidPathInAGrid as minCost } from ".";

/** Tries changing every set of up to three signs, following the signs each time. */
const byBruteForce = (grid: number[][]): number => {
	const [m, n] = [grid.length, grid[0]?.length ?? 0];
	const reaches = (g: number[][]) => {
		const seen = new Set<number>();
		for (
			let [r, c] = [0, 0];
			r >= 0 && r < m && c >= 0 && c < n && !seen.has(r * n + c);
		) {
			if (r === m - 1 && c === n - 1) return true;
			seen.add(r * n + c);
			const sign = g[r]?.[c];
			if (sign === 1) c++;
			else if (sign === 2) c--;
			else if (sign === 3) r++;
			else r--;
		}
		return false;
	};
	const cells = m * n;
	const search = (g: number[][], from: number, left: number): boolean => {
		if (reaches(g)) return true;
		if (left === 0) return false;
		for (let cell = from; cell < cells; cell++) {
			const [r, c] = [Math.floor(cell / n), cell % n];
			for (let sign = 1; sign <= 4; sign++) {
				if (sign === g[r]?.[c]) continue;
				const copy = g.map((row) => [...row]);
				const row = copy[r];
				if (row) row[c] = sign;
				if (search(copy, cell + 1, left - 1)) return true;
			}
		}
		return false;
	};
	for (let budget = 0; ; budget++) if (search(grid, 0, budget)) return budget;
};

describe("1368. Minimum Cost to Make at Least One Valid Path in a Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minCost([
				[1, 1, 1, 1],
				[2, 2, 2, 2],
				[1, 1, 1, 1],
				[2, 2, 2, 2],
			]),
		).toBe(3);
		expect(
			minCost([
				[1, 1, 3],
				[3, 2, 2],
				[1, 1, 4],
			]),
		).toBe(0);
		expect(
			minCost([
				[1, 2],
				[4, 3],
			]),
		).toBe(1);
	});

	it("matches changing signs directly on random small grids", () => {
		const random = createRandom(1368);
		for (let run = 0; run < 100; run++) {
			const [m, n] = [random.int(1, 3), random.int(1, 3)];
			const grid = Array.from({ length: m }, () => random.array(n, 1, 4));
			expect(minCost(grid)).toBe(byBruteForce(grid));
		}
	});
});
