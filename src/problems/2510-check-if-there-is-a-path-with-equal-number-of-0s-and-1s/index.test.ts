import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { checkIfThereIsAPathWithEqualNumberOf0sAnd1s as isThereAPath } from ".";

/** Tries every path. */
const byBruteForce = (grid: number[][]): boolean => {
	const rows = grid.length;
	const cols = grid[0]?.length ?? 0;
	const walk = (r: number, c: number, balance: number): boolean => {
		const next = balance + ((grid[r]?.[c] ?? 0) === 1 ? 1 : -1);
		if (r === rows - 1 && c === cols - 1) return next === 0;
		return (
			(r + 1 < rows && walk(r + 1, c, next)) ||
			(c + 1 < cols && walk(r, c + 1, next))
		);
	};
	return walk(0, 0, 0);
};

describe("2510. Check if There is a Path With Equal Number of 0's And 1's", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			isThereAPath([
				[0, 1, 0, 0],
				[0, 1, 0, 0],
				[1, 0, 1, 0],
			]),
		).toBe(true);
		expect(
			isThereAPath([
				[1, 1, 0],
				[0, 0, 1],
				[1, 0, 0],
			]),
		).toBe(false);
	});

	it("matches trying every path on random grids", () => {
		const random = createRandom(2510);
		for (let run = 0; run < 300; run++) {
			const cols = random.int(1, 5);
			const grid = Array.from({ length: random.int(1, 5) }, () =>
				random.array(cols, 0, 1),
			);
			expect(isThereAPath(grid)).toBe(byBruteForce(grid));
		}
	});
});
