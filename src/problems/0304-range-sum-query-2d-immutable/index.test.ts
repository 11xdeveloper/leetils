import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { RangeSumQuery2dImmutable } from ".";

const bySumming = (
	matrix: number[][],
	r1: number,
	c1: number,
	r2: number,
	c2: number,
): number =>
	matrix
		.slice(r1, r2 + 1)
		.reduce(
			(sum, row) => sum + row.slice(c1, c2 + 1).reduce((a, b) => a + b, 0),
			0,
		);

describe("304. Range Sum Query 2D - Immutable", () => {
	it("solves the example from the problem statement", () => {
		const matrix = [
			[3, 0, 1, 4, 2],
			[5, 6, 3, 2, 1],
			[1, 2, 0, 1, 5],
			[4, 1, 0, 1, 7],
			[1, 0, 3, 0, 5],
		];
		const sums = new RangeSumQuery2dImmutable(matrix);
		expect(sums.sumRegion(2, 1, 4, 3)).toBe(8);
		expect(sums.sumRegion(1, 1, 2, 2)).toBe(11);
		expect(sums.sumRegion(1, 2, 2, 4)).toBe(12);
	});

	it("matches adding up every rectangle of random matrices", () => {
		const random = createRandom(304);
		for (let run = 0; run < 30; run++) {
			const columns = random.int(1, 5);
			const matrix = Array.from({ length: random.int(1, 5) }, () =>
				random.array(columns, -100, 100),
			);
			const sums = new RangeSumQuery2dImmutable(matrix);
			for (let r1 = 0; r1 < matrix.length; r1++) {
				for (let r2 = r1; r2 < matrix.length; r2++) {
					for (let c1 = 0; c1 < columns; c1++) {
						for (let c2 = c1; c2 < columns; c2++) {
							expect(sums.sumRegion(r1, c1, r2, c2)).toBe(
								bySumming(matrix, r1, c1, r2, c2),
							);
						}
					}
				}
			}
		}
	});
});
