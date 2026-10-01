import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countNegativeNumbersInASortedMatrix as countNegatives } from ".";

describe("1351. Count Negative Numbers in a Sorted Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countNegatives([
				[4, 3, 2, -1],
				[3, 2, 1, -1],
				[1, 1, -1, -2],
				[-1, -1, -2, -3],
			]),
		).toBe(8);
		expect(
			countNegatives([
				[3, 2],
				[1, 0],
			]),
		).toBe(0);
	});

	it("matches counting on random sorted matrices", () => {
		const random = createRandom(1351);
		for (let run = 0; run < 300; run++) {
			const [m, n] = [random.int(1, 6), random.int(1, 6)];
			// Sorted rows stay sorted when each is capped by the row above,
			// which sorts the columns too.
			const grid = Array.from({ length: m }, () =>
				random.array(n, -5, 5).sort((a, b) => b - a),
			);
			for (let r = 1; r < m; r++) {
				grid[r] = (grid[r] ?? []).map((value, c) =>
					Math.min(value, grid[r - 1]?.[c] ?? value),
				);
			}
			const expected = grid.flat().filter((value) => value < 0).length;
			expect(countNegatives(grid)).toBe(expected);
		}
	});
});
