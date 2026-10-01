import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { pathWithMaximumMinimumValue as maximumMinimumPath } from ".";

/** Tries each threshold, highest first, with a search over cells at least that big. */
const byBruteForce = (grid: number[][]): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const thresholds = [...new Set(grid.flat())].sort((a, b) => b - a);
	for (const threshold of thresholds) {
		if ((grid[0]?.[0] ?? 0) < threshold) continue;
		const seen = new Set(["0,0"]);
		const stack = [[0, 0]];
		for (let cell = stack.pop(); cell; cell = stack.pop()) {
			const [r = 0, c = 0] = cell;
			for (const [r2, c2] of [
				[r - 1, c],
				[r + 1, c],
				[r, c - 1],
				[r, c + 1],
			] as const) {
				if ((grid[r2]?.[c2] ?? -1) < threshold || seen.has(`${r2},${c2}`))
					continue;
				seen.add(`${r2},${c2}`);
				stack.push([r2, c2]);
			}
		}
		if (seen.has(`${m - 1},${n - 1}`)) return threshold;
	}
	return -1;
};

describe("1102. Path With Maximum Minimum Value", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumMinimumPath([
				[5, 4, 5],
				[1, 2, 6],
				[7, 4, 6],
			]),
		).toBe(4);
		expect(
			maximumMinimumPath([
				[2, 2, 1, 2, 2, 2],
				[1, 2, 2, 2, 1, 2],
			]),
		).toBe(2);
		expect(
			maximumMinimumPath([
				[3, 4, 6, 3, 4],
				[0, 2, 1, 1, 7],
				[8, 8, 3, 2, 7],
				[3, 2, 4, 9, 8],
				[4, 1, 2, 0, 0],
				[4, 6, 5, 4, 3],
			]),
		).toBe(3);
	});

	it("handles a single cell", () => {
		expect(maximumMinimumPath([[7]])).toBe(7);
	});

	it("matches trying every threshold on random grids", () => {
		const random = createRandom(1102);
		for (let run = 0; run < 300; run++) {
			const [m, n] = [random.int(1, 6), random.int(1, 6)];
			const grid = Array.from({ length: m }, () => random.array(n, 0, 9));
			expect(maximumMinimumPath(grid)).toBe(byBruteForce(grid));
		}
	});
});
