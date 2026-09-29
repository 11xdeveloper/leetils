import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfIslands } from "../0200-number-of-islands";
import { numberOfIslandsII } from ".";

describe("305. Number of Islands II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numberOfIslandsII(3, 3, [
				[0, 0],
				[0, 1],
				[1, 2],
				[2, 1],
			]),
		).toEqual([1, 1, 2, 3]);
		expect(numberOfIslandsII(1, 1, [[0, 0]])).toEqual([1]);
	});

	it("ignores land added twice, and merges several islands at once", () => {
		expect(
			numberOfIslandsII(3, 3, [
				[0, 1],
				[1, 0],
				[1, 2],
				[2, 1],
				[1, 1],
				[1, 1],
			]),
		).toEqual([1, 2, 3, 4, 1, 1]);
	});

	it("matches recounting with Number of Islands after every step on random inputs", () => {
		const random = createRandom(305);
		for (let run = 0; run < 200; run++) {
			const m = random.int(1, 6);
			const n = random.int(1, 6);
			const positions = Array.from({ length: random.int(1, 20) }, () => [
				random.int(0, m - 1),
				random.int(0, n - 1),
			]);
			const grid = Array.from({ length: m }, () =>
				new Array<string>(n).fill("0"),
			);
			const expected = positions.map(([r = 0, c = 0]) => {
				const row = grid[r];
				if (row) row[c] = "1";
				return numberOfIslands(grid);
			});
			expect(numberOfIslandsII(m, n, positions)).toEqual(expected);
		}
	});
});
