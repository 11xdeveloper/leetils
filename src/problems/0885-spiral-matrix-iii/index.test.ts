import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { spiralMatrixIII } from ".";

describe("885. Spiral Matrix III", () => {
	it("solves the examples from the problem statement", () => {
		expect(spiralMatrixIII(1, 4, 0, 0)).toEqual([
			[0, 0],
			[0, 1],
			[0, 2],
			[0, 3],
		]);
		expect(spiralMatrixIII(5, 6, 1, 4)).toEqual([
			[1, 4],
			[1, 5],
			[2, 5],
			[2, 4],
			[2, 3],
			[1, 3],
			[0, 3],
			[0, 4],
			[0, 5],
			[3, 5],
			[3, 4],
			[3, 3],
			[3, 2],
			[2, 2],
			[1, 2],
			[0, 2],
			[4, 5],
			[4, 4],
			[4, 3],
			[4, 2],
			[4, 1],
			[3, 1],
			[2, 1],
			[1, 1],
			[0, 1],
			[4, 0],
			[3, 0],
			[2, 0],
			[1, 0],
			[0, 0],
		]);
	});

	it("visits every cell once, moving outwards, on random grids", () => {
		const random = createRandom(885);
		for (let run = 0; run < 300; run++) {
			const [rows, cols] = [random.int(1, 8), random.int(1, 8)];
			const [r, c] = [random.int(0, rows - 1), random.int(0, cols - 1)];
			const cells = spiralMatrixIII(rows, cols, r, c);
			expect(new Set(cells.map((cell) => cell.join())).size).toBe(rows * cols);
			const rings = cells.map(([cr = 0, cc = 0]) =>
				Math.max(Math.abs(cr - r), Math.abs(cc - c)),
			);
			expect(rings).toEqual(rings.toSorted((a, b) => a - b));
		}
	});
});
