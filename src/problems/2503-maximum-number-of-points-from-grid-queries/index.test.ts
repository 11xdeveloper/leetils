import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfPointsFromGridQueries as maxPoints } from ".";

/** A fresh flood fill per query. */
const byBruteForce = (grid: number[][], query: number): number => {
	if ((grid[0]?.[0] ?? 0) >= query) return 0;
	const seen = new Set(["0,0"]);
	const stack: [number, number][] = [[0, 0]];
	for (let cell = stack.pop(); cell; cell = stack.pop()) {
		const [r, c] = cell;
		for (const [nr, nc] of [
			[r - 1, c],
			[r + 1, c],
			[r, c - 1],
			[r, c + 1],
		] as const) {
			const value = grid[nr]?.[nc];
			if (value === undefined || value >= query || seen.has(`${nr},${nc}`))
				continue;
			seen.add(`${nr},${nc}`);
			stack.push([nr, nc]);
		}
	}
	return seen.size;
};

describe("2503. Maximum Number of Points From Grid Queries", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxPoints(
				[
					[1, 2, 3],
					[2, 5, 7],
					[3, 5, 1],
				],
				[5, 6, 2],
			),
		).toEqual([5, 8, 1]);
		expect(
			maxPoints(
				[
					[5, 2, 1],
					[1, 1, 2],
				],
				[3],
			),
		).toEqual([0]);
	});

	it("matches a flood fill per query on random grids", () => {
		const random = createRandom(2503);
		for (let run = 0; run < 200; run++) {
			const cols = random.int(1, 5);
			const grid = Array.from({ length: random.int(1, 5) }, () =>
				random.array(cols, 1, 10),
			);
			const queries = random.array(random.int(1, 6), 1, 12);
			expect(maxPoints(grid, queries)).toEqual(
				queries.map((q) => byBruteForce(grid, q)),
			);
		}
	});
});
