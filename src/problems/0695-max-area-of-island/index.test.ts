import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maxAreaOfIsland } from ".";

describe("695. Max Area of Island", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxAreaOfIsland([
				[0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
				[0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
				[0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
			]),
		).toBe(6);
		expect(maxAreaOfIsland([[0, 0, 0, 0, 0, 0, 0, 0]])).toBe(0);
	});

	it("matches a recursive flood fill on random grids", () => {
		const random = createRandom(695);
		for (let run = 0; run < 500; run++) {
			const cols = random.int(1, 7);
			const grid = Array.from({ length: random.int(1, 7) }, () =>
				random.array(cols, 0, 1),
			);
			const copy = grid.map((row) => [...row]);
			const sink = (r: number, c: number): number => {
				const row = copy[r];
				if (row?.[c] !== 1) return 0;
				row[c] = 0;
				return (
					1 + sink(r + 1, c) + sink(r - 1, c) + sink(r, c + 1) + sink(r, c - 1)
				);
			};
			let expected = 0;
			for (const [r, row] of grid.entries())
				for (const [c] of row.entries())
					expected = Math.max(expected, sink(r, c));
			expect(maxAreaOfIsland(grid)).toBe(expected);
		}
	});

	it("handles one large island", () => {
		expect(
			maxAreaOfIsland(
				Array.from({ length: 50 }, () => new Array<number>(50).fill(1)),
			),
		).toBe(2500);
	});
});
