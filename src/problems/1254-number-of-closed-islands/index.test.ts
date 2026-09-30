import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfClosedIslands as closedIsland } from ".";

/** Sinks every island touching the edge, then counts islands with a recursive flood fill. */
const byBruteForce = (grid: number[][]): number => {
	const g = grid.map((row) => [...row]);
	const sink = (r: number, c: number): void => {
		if (g[r]?.[c] !== 0) return;
		const row = g[r];
		if (row) row[c] = 1;
		sink(r - 1, c);
		sink(r + 1, c);
		sink(r, c - 1);
		sink(r, c + 1);
	};
	const [m, n] = [g.length, g[0]?.length ?? 0];
	for (let r = 0; r < m; r++) {
		sink(r, 0);
		sink(r, n - 1);
	}
	for (let c = 0; c < n; c++) {
		sink(0, c);
		sink(m - 1, c);
	}
	let count = 0;
	for (let r = 0; r < m; r++) {
		for (let c = 0; c < n; c++) {
			if (g[r]?.[c] === 0) {
				count++;
				sink(r, c);
			}
		}
	}
	return count;
};

describe("1254. Number of Closed Islands", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			closedIsland([
				[1, 1, 1, 1, 1, 1, 1, 0],
				[1, 0, 0, 0, 0, 1, 1, 0],
				[1, 0, 1, 0, 1, 1, 1, 0],
				[1, 0, 0, 0, 0, 1, 0, 1],
				[1, 1, 1, 1, 1, 1, 1, 0],
			]),
		).toBe(2);
		expect(
			closedIsland([
				[0, 0, 1, 0, 0],
				[0, 1, 0, 1, 0],
				[0, 1, 1, 1, 0],
			]),
		).toBe(1);
		expect(
			closedIsland([
				[1, 1, 1, 1, 1, 1, 1],
				[1, 0, 0, 0, 0, 0, 1],
				[1, 0, 1, 1, 1, 0, 1],
				[1, 0, 1, 0, 1, 0, 1],
				[1, 0, 1, 1, 1, 0, 1],
				[1, 0, 0, 0, 0, 0, 1],
				[1, 1, 1, 1, 1, 1, 1],
			]),
		).toBe(2);
	});

	it("matches sinking edge islands on random grids", () => {
		const random = createRandom(1254);
		for (let run = 0; run < 300; run++) {
			const [m, n] = [random.int(1, 7), random.int(1, 7)];
			const grid = Array.from({ length: m }, () => random.array(n, 0, 1));
			expect(closedIsland(grid)).toBe(byBruteForce(grid));
		}
	});
});
