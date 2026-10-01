import { describe, expect, it } from "bun:test";
import { matrixCellsInDistanceOrder as allCellsDistOrder } from ".";

describe("1030. Matrix Cells in Distance Order", () => {
	it("solves the examples from the problem statement", () => {
		expect(allCellsDistOrder(1, 2, 0, 0)).toEqual([
			[0, 0],
			[0, 1],
		]);
	});

	it("lists every cell once with non-decreasing distance", () => {
		for (let rows = 1; rows <= 6; rows++) {
			for (let cols = 1; cols <= 6; cols++) {
				const [rc, cc] = [rows - 1, Math.floor(cols / 2)];
				const cells = allCellsDistOrder(rows, cols, rc, cc);
				expect(new Set(cells.map((cell) => cell.join())).size).toBe(
					rows * cols,
				);
				const distances = cells.map(
					([r = 0, c = 0]) => Math.abs(r - rc) + Math.abs(c - cc),
				);
				expect(distances).toEqual(distances.toSorted((a, b) => a - b));
			}
		}
	});
});
