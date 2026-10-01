import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { reshapeTheMatrix as matrixReshape } from ".";

describe("566. Reshape the Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			matrixReshape(
				[
					[1, 2],
					[3, 4],
				],
				1,
				4,
			),
		).toEqual([[1, 2, 3, 4]]);
		expect(
			matrixReshape(
				[
					[1, 2],
					[3, 4],
				],
				2,
				4,
			),
		).toEqual([
			[1, 2],
			[3, 4],
		]);
	});

	it("keeps the elements in row-major order on random matrices", () => {
		const random = createRandom(566);
		for (let run = 0; run < 500; run++) {
			const cols = random.int(1, 6);
			const mat = Array.from({ length: random.int(1, 6) }, () =>
				random.array(cols, -9, 9),
			);
			const r = random.int(1, 12);
			const c = random.int(1, 12);
			const result = matrixReshape(mat, r, c);
			if (r * c === mat.flat().length) {
				expect(result).toHaveLength(r);
				for (const row of result) expect(row).toHaveLength(c);
				expect(result.flat()).toEqual(mat.flat());
			} else {
				expect(result).toEqual(mat);
			}
		}
	});
});
