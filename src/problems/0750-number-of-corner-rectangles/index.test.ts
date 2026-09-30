import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfCornerRectangles as countCornerRectangles } from ".";

const byBruteForce = (grid: number[][]): number => {
	let count = 0;
	const cols = grid[0]?.length ?? 0;
	for (let r1 = 0; r1 < grid.length; r1++) {
		for (let r2 = r1 + 1; r2 < grid.length; r2++) {
			for (let c1 = 0; c1 < cols; c1++) {
				for (let c2 = c1 + 1; c2 < cols; c2++) {
					if (
						grid[r1]?.[c1] &&
						grid[r1]?.[c2] &&
						grid[r2]?.[c1] &&
						grid[r2]?.[c2]
					)
						count++;
				}
			}
		}
	}
	return count;
};

describe("750. Number Of Corner Rectangles", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countCornerRectangles([
				[1, 0, 0, 1, 0],
				[0, 0, 1, 0, 1],
				[0, 0, 0, 1, 0],
				[1, 0, 1, 0, 1],
			]),
		).toBe(1);
		expect(
			countCornerRectangles([
				[1, 1, 1],
				[1, 1, 1],
				[1, 1, 1],
			]),
		).toBe(9);
		expect(countCornerRectangles([[1, 1, 1, 1]])).toBe(0);
	});

	it("matches checking every pair of rows and columns on random grids", () => {
		const random = createRandom(750);
		for (let run = 0; run < 500; run++) {
			const cols = random.int(1, 7);
			const grid = Array.from({ length: random.int(1, 7) }, () =>
				random.array(cols, 0, 1),
			);
			expect(countCornerRectangles(grid)).toBe(byBruteForce(grid));
		}
	});
});
