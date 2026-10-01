import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { kthSmallestElementInASortedMatrix as kthSmallest } from ".";

describe("378. Kth Smallest Element in a Sorted Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			kthSmallest(
				[
					[1, 5, 9],
					[10, 11, 13],
					[12, 13, 15],
				],
				8,
			),
		).toBe(13);
		expect(kthSmallest([[-5]], 1)).toBe(-5);
	});

	it("matches sorting every value for every k on random sorted matrices", () => {
		const random = createRandom(378);
		for (let run = 0; run < 100; run++) {
			const n = random.int(1, 6);
			// Each cell adds a random step to the larger of the cells above and to its left.
			const matrix: number[][] = [];
			for (let r = 0; r < n; r++) {
				const row: number[] = [];
				for (let c = 0; c < n; c++)
					row.push(
						Math.max(matrix[r - 1]?.[c] ?? -20, row[c - 1] ?? -20) +
							random.int(0, 3),
					);
				matrix.push(row);
			}
			const sorted = matrix.flat().toSorted((a, b) => a - b);
			for (let k = 1; k <= n * n; k++)
				expect(kthSmallest(matrix, k)).toBe(sorted[k - 1] ?? 0);
		}
	});
});
