import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { RangeSumQuery2dMutable } from ".";

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

describe("308. Range Sum Query 2D - Mutable", () => {
	it("solves the example from the problem statement", () => {
		const sums = new RangeSumQuery2dMutable([
			[3, 0, 1, 4, 2],
			[5, 6, 3, 2, 1],
			[1, 2, 0, 1, 5],
			[4, 1, 0, 1, 7],
			[1, 0, 3, 0, 5],
		]);
		expect(sums.sumRegion(2, 1, 4, 3)).toBe(8);
		sums.update(3, 2, 2);
		expect(sums.sumRegion(2, 1, 4, 3)).toBe(10);
	});

	it("matches a plain matrix on random updates and queries", () => {
		const random = createRandom(308);
		for (let run = 0; run < 100; run++) {
			const rows = random.int(1, 6);
			const columns = random.int(1, 6);
			const matrix = Array.from({ length: rows }, () =>
				random.array(columns, -100, 100),
			);
			const sums = new RangeSumQuery2dMutable(matrix);
			for (let step = 0; step < 40; step++) {
				if (random.int(0, 1) === 0) {
					const [r, c, val] = [
						random.int(0, rows - 1),
						random.int(0, columns - 1),
						random.int(-100, 100),
					];
					sums.update(r, c, val);
					const row = matrix[r];
					if (row) row[c] = val;
				} else {
					const r1 = random.int(0, rows - 1);
					const r2 = random.int(r1, rows - 1);
					const c1 = random.int(0, columns - 1);
					const c2 = random.int(c1, columns - 1);
					expect(sums.sumRegion(r1, c1, r2, c2)).toBe(
						bySumming(matrix, r1, c1, r2, c2),
					);
				}
			}
		}
	});
});
