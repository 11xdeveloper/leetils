import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { islandPerimeter } from ".";

/** Counts the sides of land cells that face water or the edge of the grid. */
const byCountingSides = (grid: number[][]): number => {
	let sides = 0;
	for (const [r, row] of grid.entries()) {
		for (const [c, cell] of row.entries()) {
			if (cell !== 1) continue;
			for (const [dr, dc] of [
				[-1, 0],
				[1, 0],
				[0, -1],
				[0, 1],
			] as const) {
				if (grid[r + dr]?.[c + dc] !== 1) sides++;
			}
		}
	}
	return sides;
};

describe("463. Island Perimeter", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			islandPerimeter([
				[0, 1, 0, 0],
				[1, 1, 1, 0],
				[0, 1, 0, 0],
				[1, 1, 0, 0],
			]),
		).toBe(16);
		expect(islandPerimeter([[1]])).toBe(4);
		expect(islandPerimeter([[1, 0]])).toBe(4);
	});

	it("matches counting exposed sides on random grids", () => {
		const random = createRandom(463);
		for (let run = 0; run < 500; run++) {
			const grid = Array.from({ length: random.int(1, 6) }, () =>
				random.array(6, 0, 1),
			);
			expect(islandPerimeter(grid)).toBe(byCountingSides(grid));
		}
	});
});
