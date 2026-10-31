import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { selectCellsInGridWithMaximumScore as maxScore } from ".";

/** Tries every choice of one cell (or none) per row. */
const byBruteForce = (grid: number[][]): number => {
	let best = 0;
	const choose = (r: number, used: Set<number>, sum: number): void => {
		if (r === grid.length) {
			best = Math.max(best, sum);
			return;
		}
		choose(r + 1, used, sum);
		for (const value of grid[r] ?? [])
			if (!used.has(value))
				choose(r + 1, new Set([...used, value]), sum + value);
	};
	choose(0, new Set(), 0);
	return best;
};

describe("3276. Select Cells in Grid With Maximum Score", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxScore([
				[1, 2, 3],
				[4, 3, 2],
				[1, 1, 1],
			]),
		).toBe(8);
		expect(
			maxScore([
				[8, 7, 6],
				[8, 3, 2],
			]),
		).toBe(15);
	});

	it("matches trying every choice on random grids", () => {
		const random = createRandom(3276);
		for (let run = 0; run < 200; run++) {
			const grid = Array.from({ length: random.int(1, 5) }, () =>
				random.array(random.int(1, 4), 1, 6),
			);
			expect(maxScore(grid)).toBe(byBruteForce(grid));
		}
	});
});
