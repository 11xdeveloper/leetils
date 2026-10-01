import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maxAreaOfIsland } from "../0695-max-area-of-island";
import { makingALargeIsland as largestIsland } from ".";

/** Tries flipping each 0 in turn, or none. */
const byBruteForce = (grid: number[][]): number => {
	let best = maxAreaOfIsland(grid);
	for (const [r, row] of grid.entries()) {
		for (const [c, cell] of row.entries()) {
			if (cell === 0)
				best = Math.max(
					best,
					maxAreaOfIsland(
						grid.map((cells, rr) => (rr === r ? cells.with(c, 1) : cells)),
					),
				);
		}
	}
	return best;
};

describe("827. Making A Large Island", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			largestIsland([
				[1, 0],
				[0, 1],
			]),
		).toBe(3);
		expect(
			largestIsland([
				[1, 1],
				[1, 0],
			]),
		).toBe(4);
		expect(
			largestIsland([
				[1, 1],
				[1, 1],
			]),
		).toBe(4);
	});

	it("matches trying every flip on random grids", () => {
		const random = createRandom(827);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 6);
			const grid = Array.from({ length: n }, () => random.array(n, 0, 1));
			expect(largestIsland(grid)).toBe(byBruteForce(grid));
		}
	});
});
