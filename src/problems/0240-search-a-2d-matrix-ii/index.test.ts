import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { searchA2dMatrixII } from ".";

const EXAMPLE = [
	[1, 4, 7, 11, 15],
	[2, 5, 8, 12, 19],
	[3, 6, 9, 16, 22],
	[10, 13, 14, 17, 24],
	[18, 21, 23, 26, 30],
];

describe("240. Search a 2D Matrix II", () => {
	it("solves the examples from the problem statement", () => {
		expect(searchA2dMatrixII(EXAMPLE, 5)).toBeTrue();
		expect(searchA2dMatrixII(EXAMPLE, 20)).toBeFalse();
	});

	it("finds the corners", () => {
		expect(searchA2dMatrixII(EXAMPLE, 1)).toBeTrue();
		expect(searchA2dMatrixII(EXAMPLE, 30)).toBeTrue();
		expect(searchA2dMatrixII(EXAMPLE, 15)).toBeTrue();
		expect(searchA2dMatrixII(EXAMPLE, 18)).toBeTrue();
	});

	it("agrees with a linear search on random sorted matrices", () => {
		const random = createRandom(240);
		for (let run = 0; run < 300; run++) {
			const rows = random.int(1, 6);
			const columns = random.int(1, 6);
			// Each cell adds a random step to the larger of the cells above and to its left.
			const matrix: number[][] = [];
			for (let r = 0; r < rows; r++) {
				const row: number[] = [];
				for (let c = 0; c < columns; c++) {
					const base = Math.max(matrix[r - 1]?.[c] ?? -10, row[c - 1] ?? -10);
					row.push(base + random.int(0, 3));
				}
				matrix.push(row);
			}
			for (let target = -12; target <= 40; target++) {
				expect(searchA2dMatrixII(matrix, target)).toBe(
					matrix.flat().includes(target),
				);
			}
		}
	});
});
