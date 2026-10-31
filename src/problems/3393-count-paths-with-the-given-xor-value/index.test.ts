import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countPathsWithTheGivenXorValue as countPathsWithXorValue } from ".";

/** Walks every path. */
const byBruteForce = (grid: number[][], k: number): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const walk = (r: number, c: number, x: number): number => {
		const value = x ^ (grid[r]?.[c] ?? 0);
		if (r === m - 1 && c === n - 1) return value === k ? 1 : 0;
		return (
			(r + 1 < m ? walk(r + 1, c, value) : 0) +
			(c + 1 < n ? walk(r, c + 1, value) : 0)
		);
	};
	return walk(0, 0, 0);
};

describe("3393. Count Paths With the Given XOR Value", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countPathsWithXorValue(
				[
					[2, 1, 5],
					[7, 10, 0],
					[12, 6, 4],
				],
				11,
			),
		).toBe(3);
		expect(
			countPathsWithXorValue(
				[
					[1, 3, 3, 3],
					[0, 3, 3, 2],
					[3, 0, 1, 1],
				],
				2,
			),
		).toBe(5);
		expect(
			countPathsWithXorValue(
				[
					[1, 1, 1, 2],
					[3, 0, 3, 2],
					[3, 0, 2, 2],
				],
				10,
			),
		).toBe(0);
	});

	it("matches walking every path on random grids", () => {
		const random = createRandom(3393);
		for (let run = 0; run < 200; run++) {
			const grid = Array.from({ length: random.int(1, 5) }, () =>
				random.array(4, 0, 15),
			);
			const k = random.int(0, 15);
			expect(countPathsWithXorValue(grid, k)).toBe(byBruteForce(grid, k));
		}
	});
});
