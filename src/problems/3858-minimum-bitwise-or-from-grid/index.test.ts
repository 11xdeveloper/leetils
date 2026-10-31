import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumBitwiseOrFromGrid as minimumOR } from ".";

/** Tries every choice. */
const byBruteForce = (grid: number[][]): number => {
	let best = Number.POSITIVE_INFINITY;
	const go = (row: number, or: number): void => {
		if (row === grid.length) best = Math.min(best, or);
		else for (const x of grid[row] ?? []) go(row + 1, or | x);
	};
	go(0, 0);
	return best;
};

describe("3858. Minimum Bitwise OR From Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumOR([
				[1, 5],
				[2, 4],
			]),
		).toBe(3);
		expect(
			minimumOR([
				[3, 5],
				[6, 4],
			]),
		).toBe(5);
		expect(minimumOR([[7, 9, 8]])).toBe(7);
	});

	it("matches trying every choice on random grids", () => {
		const random = createRandom(3858);
		for (let run = 0; run < 200; run++) {
			const grid = Array.from({ length: random.int(1, 4) }, () =>
				random.array(random.int(1, 4), 1, 31),
			);
			expect(minimumOR(grid)).toBe(byBruteForce(grid));
		}
	});
});
