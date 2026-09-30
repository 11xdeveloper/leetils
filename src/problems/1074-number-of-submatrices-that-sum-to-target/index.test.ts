import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfSubmatricesThatSumToTarget as numSubmatrixSumTarget } from ".";

describe("1074. Number of Submatrices That Sum to Target", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numSubmatrixSumTarget(
				[
					[0, 1, 0],
					[1, 1, 1],
					[0, 1, 0],
				],
				0,
			),
		).toBe(4);
		expect(
			numSubmatrixSumTarget(
				[
					[1, -1],
					[-1, 1],
				],
				0,
			),
		).toBe(5);
		expect(numSubmatrixSumTarget([[904]], 0)).toBe(0);
	});

	it("matches summing every submatrix on random matrices", () => {
		const random = createRandom(1074);
		for (let run = 0; run < 300; run++) {
			const cols = random.int(1, 5);
			const matrix = Array.from({ length: random.int(1, 5) }, () =>
				random.array(cols, -2, 2),
			);
			const target = random.int(-3, 3);
			let expected = 0;
			for (let r1 = 0; r1 < matrix.length; r1++) {
				for (let r2 = r1; r2 < matrix.length; r2++) {
					for (let c1 = 0; c1 < cols; c1++) {
						for (let c2 = c1; c2 < cols; c2++) {
							let sum = 0;
							for (let r = r1; r <= r2; r++)
								for (let c = c1; c <= c2; c++) sum += matrix[r]?.[c] ?? 0;
							if (sum === target) expected++;
						}
					}
				}
			}
			expect(numSubmatrixSumTarget(matrix, target)).toBe(expected);
		}
	});
});
