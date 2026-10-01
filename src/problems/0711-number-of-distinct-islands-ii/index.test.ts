import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfDistinctIslandsII } from ".";

/** Rotates a grid by 90° clockwise. */
const rotate = (grid: number[][]): number[][] =>
	Array.from({ length: grid[0]?.length ?? 0 }, (_, c) =>
		grid.map((row) => row[c] ?? 0).reverse(),
	);

describe("711. Number of Distinct Islands II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numberOfDistinctIslandsII([
				[1, 1, 0, 0, 0],
				[1, 0, 0, 0, 0],
				[0, 0, 0, 0, 1],
				[0, 0, 0, 1, 1],
			]),
		).toBe(1);
		expect(
			numberOfDistinctIslandsII([
				[1, 1, 0, 0, 0],
				[1, 1, 0, 0, 0],
				[0, 0, 0, 1, 1],
				[0, 0, 0, 1, 1],
			]),
		).toBe(1);
	});

	it("treats reflections as the same shape", () => {
		expect(
			numberOfDistinctIslandsII([
				[1, 1, 0, 1, 1],
				[0, 1, 0, 1, 0],
			]),
		).toBe(1);
		expect(
			numberOfDistinctIslandsII([
				[1, 1, 0, 1, 1, 1],
				[0, 1, 0, 0, 0, 1],
			]),
		).toBe(2);
	});

	it("gives the same count for a grid and its rotations and reflections", () => {
		const random = createRandom(711);
		for (let run = 0; run < 300; run++) {
			const cols = random.int(1, 7);
			const grid = Array.from({ length: random.int(1, 7) }, () =>
				random.array(cols, 0, 1),
			);
			const count = numberOfDistinctIslandsII(grid);
			expect(numberOfDistinctIslandsII(rotate(grid))).toBe(count);
			expect(numberOfDistinctIslandsII(rotate(rotate(grid)))).toBe(count);
			expect(
				numberOfDistinctIslandsII(grid.map((row) => row.toReversed())),
			).toBe(count);
			expect(numberOfDistinctIslandsII(grid.toReversed())).toBe(count);
		}
	});

	it("counts two copies of any random island as one shape", () => {
		const random = createRandom(7110);
		for (let run = 0; run < 300; run++) {
			// A random island in a 4 × 4 box, a rotated copy beside it, separated by water.
			const box = Array.from({ length: 4 }, () => random.array(4, 0, 1));
			const grid = box.map((row, r) => [...row, 0, ...(rotate(box)[r] ?? [])]);
			const islandsInBox = numberOfDistinctIslandsII(box);
			if (islandsInBox === 1 && box.flat().includes(1))
				expect(numberOfDistinctIslandsII(grid)).toBe(1);
		}
	});
});
