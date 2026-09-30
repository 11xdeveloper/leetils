import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheKthSmallestSumOfAMatrixWithSortedRows as kthSmallest } from ".";

/** Lists every choice's sum. */
const byBruteForce = (mat: number[][], k: number): number => {
	let sums = [0];
	for (const row of mat)
		sums = sums.flatMap((sum) => row.map((value) => sum + value));
	return sums.sort((a, b) => a - b)[k - 1] ?? 0;
};

describe("1439. Find the Kth Smallest Sum of a Matrix With Sorted Rows", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			kthSmallest(
				[
					[1, 3, 11],
					[2, 4, 6],
				],
				5,
			),
		).toBe(7);
		expect(
			kthSmallest(
				[
					[1, 3, 11],
					[2, 4, 6],
				],
				9,
			),
		).toBe(17);
		expect(
			kthSmallest(
				[
					[1, 10, 10],
					[1, 4, 5],
					[2, 3, 6],
				],
				7,
			),
		).toBe(9);
	});

	it("matches listing every sum on random matrices", () => {
		const random = createRandom(1439);
		for (let run = 0; run < 200; run++) {
			const [m, n] = [random.int(1, 4), random.int(1, 4)];
			const mat = Array.from({ length: m }, () =>
				random.array(n, 1, 20).sort((a, b) => a - b),
			);
			const k = random.int(1, Math.min(200, n ** m));
			expect(kthSmallest(mat, k)).toBe(byBruteForce(mat, k));
		}
	});
});
