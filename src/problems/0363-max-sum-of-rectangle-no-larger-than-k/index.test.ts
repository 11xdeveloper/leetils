import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maxSumOfRectangleNoLargerThanK as maxSum } from ".";

const byBruteForce = (matrix: number[][], k: number): number => {
	let best = Number.NEGATIVE_INFINITY;
	const columns = matrix[0]?.length ?? 0;
	for (let r1 = 0; r1 < matrix.length; r1++) {
		for (let r2 = r1; r2 < matrix.length; r2++) {
			for (let c1 = 0; c1 < columns; c1++) {
				for (let c2 = c1; c2 < columns; c2++) {
					let sum = 0;
					for (let r = r1; r <= r2; r++)
						for (let c = c1; c <= c2; c++) sum += matrix[r]?.[c] ?? 0;
					if (sum <= k) best = Math.max(best, sum);
				}
			}
		}
	}
	return best;
};

describe("363. Max Sum of Rectangle No Larger Than K", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxSum(
				[
					[1, 0, 1],
					[0, -2, 3],
				],
				2,
			),
		).toBe(2);
		expect(maxSum([[2, 2, -1]], 3)).toBe(3);
	});

	it("handles tall matrices by working along the shorter side", () => {
		expect(maxSum([[1], [2], [-3], [4]], 3)).toBe(3);
	});

	it("matches checking every rectangle on random matrices", () => {
		const random = createRandom(363);
		for (let run = 0; run < 300; run++) {
			const columns = random.int(1, 5);
			const matrix = Array.from({ length: random.int(1, 5) }, () =>
				random.array(columns, -10, 10),
			);
			const k = random.int(Math.min(...matrix.flat()), 30);
			expect(maxSum(matrix, k)).toBe(byBruteForce(matrix, k));
		}
	});
});
