import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { stampingTheGrid as possibleToStamp } from ".";

/** Stamps everywhere possible, cell by cell. */
const byBruteForce = (grid: number[][], h: number, w: number): boolean => {
	const covered = grid.map((row) => row.map((cell) => cell === 1));
	for (let r = 0; r + h <= grid.length; r++) {
		for (let c = 0; c + w <= (grid[0]?.length ?? 0); c++) {
			let fits = true;
			for (let i = r; i < r + h; i++)
				for (let j = c; j < c + w; j++) if (grid[i]?.[j]) fits = false;
			if (!fits) continue;
			for (let i = r; i < r + h; i++)
				for (let j = c; j < c + w; j++) (covered[i] ?? [])[j] = true;
		}
	}
	return covered.every((row) => row.every(Boolean));
};

describe("2132. Stamping the Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			possibleToStamp(
				[
					[1, 0, 0, 0],
					[1, 0, 0, 0],
					[1, 0, 0, 0],
					[1, 0, 0, 0],
					[1, 0, 0, 0],
				],
				4,
				3,
			),
		).toBeTrue();
		expect(
			possibleToStamp(
				[
					[1, 0, 0, 0],
					[0, 1, 0, 0],
					[0, 0, 1, 0],
					[0, 0, 0, 1],
				],
				2,
				2,
			),
		).toBeFalse();
	});

	it("matches stamping cell by cell on random grids", () => {
		const random = createRandom(2132);
		for (let run = 0; run < 300; run++) {
			const cols = random.int(1, 6);
			const grid = Array.from({ length: random.int(1, 6) }, () =>
				Array.from({ length: cols }, () => (random.int(0, 4) === 0 ? 1 : 0)),
			);
			const [h, w] = [random.int(1, 3), random.int(1, 3)];
			expect(possibleToStamp(grid, h, w)).toBe(byBruteForce(grid, h, w));
		}
	});
});
