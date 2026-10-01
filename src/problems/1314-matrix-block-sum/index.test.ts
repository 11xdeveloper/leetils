import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { matrixBlockSum } from ".";

/** Sums each block directly. */
const byBruteForce = (mat: number[][], k: number): number[][] =>
	mat.map((row, r) =>
		row.map((_, c) => {
			let sum = 0;
			for (let r2 = r - k; r2 <= r + k; r2++) {
				for (let c2 = c - k; c2 <= c + k; c2++) sum += mat[r2]?.[c2] ?? 0;
			}
			return sum;
		}),
	);

describe("1314. Matrix Block Sum", () => {
	it("solves the examples from the problem statement", () => {
		const mat = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		];
		expect(matrixBlockSum(mat, 1)).toEqual([
			[12, 21, 16],
			[27, 45, 33],
			[24, 39, 28],
		]);
		expect(matrixBlockSum(mat, 2)).toEqual([
			[45, 45, 45],
			[45, 45, 45],
			[45, 45, 45],
		]);
	});

	it("matches summing blocks directly on random matrices", () => {
		const random = createRandom(1314);
		for (let run = 0; run < 200; run++) {
			const [m, n] = [random.int(1, 6), random.int(1, 6)];
			const mat = Array.from({ length: m }, () => random.array(n, 1, 100));
			const k = random.int(1, 4);
			expect(matrixBlockSum(mat, k)).toEqual(byBruteForce(mat, k));
		}
	});
});
