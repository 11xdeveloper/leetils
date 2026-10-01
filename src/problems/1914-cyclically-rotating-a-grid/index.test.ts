import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { cyclicallyRotatingAGrid as rotateGrid } from ".";

describe("1914. Cyclically Rotating a Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			rotateGrid(
				[
					[40, 10],
					[30, 20],
				],
				1,
			),
		).toEqual([
			[10, 20],
			[40, 30],
		]);
		expect(
			rotateGrid(
				[
					[1, 2, 3, 4],
					[5, 6, 7, 8],
					[9, 10, 11, 12],
					[13, 14, 15, 16],
				],
				2,
			),
		).toEqual([
			[3, 4, 8, 12],
			[2, 11, 10, 16],
			[1, 7, 6, 15],
			[5, 9, 13, 14],
		]);
	});

	it("matches rotating one step at a time on random grids", () => {
		const random = createRandom(1914);
		for (let run = 0; run < 100; run++) {
			const [m, n] = [2 * random.int(1, 3), 2 * random.int(1, 3)];
			const grid = Array.from({ length: m }, () => random.array(n, 1, 99));
			const k = random.int(1, 30);
			let expected = grid;
			for (let step = 0; step < k; step++) expected = rotateGrid(expected, 1);
			expect(rotateGrid(grid, k)).toEqual(expected);
		}
	});
});
