import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumFallingPathSum as minFallingPathSum } from ".";

const byRecursion = (matrix: number[][]): number => {
	const n = matrix.length;
	const from = (r: number, c: number): number => {
		if (c < 0 || c >= n) return Number.POSITIVE_INFINITY;
		const value = matrix[r]?.[c] ?? 0;
		return r === n - 1
			? value
			: value +
					Math.min(from(r + 1, c - 1), from(r + 1, c), from(r + 1, c + 1));
	};
	return Math.min(...Array.from({ length: n }, (_, c) => from(0, c)));
};

describe("931. Minimum Falling Path Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minFallingPathSum([
				[2, 1, 3],
				[6, 5, 4],
				[7, 8, 9],
			]),
		).toBe(13);
		expect(
			minFallingPathSum([
				[-19, 57],
				[-40, -5],
			]),
		).toBe(-59);
	});

	it("matches recursion on random matrices", () => {
		const random = createRandom(931);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 6);
			const matrix = Array.from({ length: n }, () => random.array(n, -20, 20));
			expect(minFallingPathSum(matrix)).toBe(byRecursion(matrix));
		}
	});
});
