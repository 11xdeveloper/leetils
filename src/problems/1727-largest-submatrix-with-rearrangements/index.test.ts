import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { largestSubmatrixWithRearrangements as largestSubmatrix } from ".";

/** Tries every set of columns and every band of rows. */
const byBruteForce = (matrix: number[][]): number => {
	const [rows, cols] = [matrix.length, matrix[0]?.length ?? 0];
	let largest = 0;
	for (let mask = 1; mask < 1 << cols; mask++) {
		const chosen = Array.from({ length: cols }, (_, c) => c).filter(
			(c) => mask & (1 << c),
		);
		for (let top = 0; top < rows; top++) {
			for (let bottom = top; bottom < rows; bottom++) {
				const allOnes = chosen.every((c) =>
					matrix.slice(top, bottom + 1).every((row) => row[c] === 1),
				);
				if (allOnes)
					largest = Math.max(largest, chosen.length * (bottom - top + 1));
			}
		}
	}
	return largest;
};

describe("1727. Largest Submatrix With Rearrangements", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			largestSubmatrix([
				[0, 0, 1],
				[1, 1, 1],
				[1, 0, 1],
			]),
		).toBe(4);
		expect(largestSubmatrix([[1, 0, 1, 0, 1]])).toBe(3);
		expect(
			largestSubmatrix([
				[1, 1, 0],
				[1, 0, 1],
			]),
		).toBe(2);
	});

	it("matches trying every column set on random matrices", () => {
		const random = createRandom(1727);
		for (let run = 0; run < 150; run++) {
			const [rows, cols] = [random.int(1, 5), random.int(1, 5)];
			const matrix = Array.from({ length: rows }, () =>
				random.array(cols, 0, 1),
			);
			expect(largestSubmatrix(matrix)).toBe(byBruteForce(matrix));
		}
	});
});
