import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { shift2dGrid as shiftGrid } from ".";

/** Performs the shifts one at a time. */
const byBruteForce = (grid: number[][], k: number): number[][] => {
	let current = grid.map((row) => [...row]);
	const n = grid[0]?.length ?? 0;
	for (let shift = 0; shift < k; shift++) {
		const flat = current.flat();
		const last = flat.pop() ?? 0;
		flat.unshift(last);
		current = current.map((_, r) => flat.slice(r * n, (r + 1) * n));
	}
	return current;
};

describe("1260. Shift 2D Grid", () => {
	it("solves the examples from the problem statement", () => {
		const grid = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		];
		expect(shiftGrid(grid, 1)).toEqual([
			[9, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
		]);
		expect(
			shiftGrid(
				[
					[3, 8, 1, 9],
					[19, 7, 2, 5],
					[4, 6, 11, 10],
					[12, 0, 21, 13],
				],
				4,
			),
		).toEqual([
			[12, 0, 21, 13],
			[3, 8, 1, 9],
			[19, 7, 2, 5],
			[4, 6, 11, 10],
		]);
		expect(shiftGrid(grid, 9)).toEqual(grid);
	});

	it("matches shifting one step at a time on random grids", () => {
		const random = createRandom(1260);
		for (let run = 0; run < 200; run++) {
			const [m, n] = [random.int(1, 5), random.int(1, 5)];
			const grid = Array.from({ length: m }, () => random.array(n, -9, 9));
			const k = random.int(0, 100);
			expect(shiftGrid(grid, k)).toEqual(byBruteForce(grid, k));
		}
	});
});
