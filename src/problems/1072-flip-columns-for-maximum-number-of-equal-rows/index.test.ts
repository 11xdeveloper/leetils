import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { flipColumnsForMaximumNumberOfEqualRows as maxEqualRowsAfterFlips } from ".";

describe("1072. Flip Columns For Maximum Number of Equal Rows", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxEqualRowsAfterFlips([
				[0, 1],
				[1, 1],
			]),
		).toBe(1);
		expect(
			maxEqualRowsAfterFlips([
				[0, 1],
				[1, 0],
			]),
		).toBe(2);
		expect(
			maxEqualRowsAfterFlips([
				[0, 0, 0],
				[0, 0, 1],
				[1, 1, 0],
			]),
		).toBe(2);
	});

	it("matches trying every set of column flips on random matrices", () => {
		const random = createRandom(1072);
		for (let run = 0; run < 500; run++) {
			const cols = random.int(1, 5);
			const matrix = Array.from({ length: random.int(1, 6) }, () =>
				random.array(cols, 0, 1),
			);
			let expected = 0;
			for (let flips = 0; flips < 1 << cols; flips++) {
				expected = Math.max(
					expected,
					matrix.filter(
						(row) =>
							new Set(row.map((bit, c) => bit ^ ((flips >> c) & 1))).size === 1,
					).length,
				);
			}
			expect(maxEqualRowsAfterFlips(matrix)).toBe(expected);
		}
	});
});
