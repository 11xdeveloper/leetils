import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumSideLengthOfASquareWithSumLessThanOrEqualToThreshold as maxSideLength } from ".";

/** Sums every square directly. */
const byBruteForce = (mat: number[][], threshold: number): number => {
	let best = 0;
	for (let r = 0; r < mat.length; r++) {
		for (let c = 0; c < (mat[0]?.length ?? 0); c++) {
			for (
				let side = 1;
				mat[r + side - 1]?.[c + side - 1] !== undefined;
				side++
			) {
				let sum = 0;
				for (let dr = 0; dr < side; dr++)
					for (let dc = 0; dc < side; dc++) sum += mat[r + dr]?.[c + dc] ?? 0;
				if (sum <= threshold) best = Math.max(best, side);
			}
		}
	}
	return best;
};

describe("1292. Maximum Side Length of a Square with Sum Less than or Equal to Threshold", () => {
	it("solves the examples from the problem statement", () => {
		const row = [1, 1, 3, 2, 4, 3, 2];
		expect(maxSideLength([row, row, row], 4)).toBe(2);
		expect(
			maxSideLength(
				Array.from({ length: 5 }, () => new Array<number>(5).fill(2)),
				1,
			),
		).toBe(0);
	});

	it("matches summing every square on random matrices", () => {
		const random = createRandom(1292);
		for (let run = 0; run < 300; run++) {
			const [m, n] = [random.int(1, 6), random.int(1, 6)];
			const mat = Array.from({ length: m }, () => random.array(n, 0, 5));
			const threshold = random.int(0, 40);
			expect(maxSideLength(mat, threshold)).toBe(byBruteForce(mat, threshold));
		}
	});
});
