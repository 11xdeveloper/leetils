import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maxDotProductOfTwoSubsequences as maxDotProduct } from ".";

/** Tries every pair of equal-length subsequences. */
const byBruteForce = (a: number[], b: number[]): number => {
	const subsequences = (arr: number[]) =>
		Array.from({ length: 2 ** arr.length - 1 }, (_, m) =>
			arr.filter((_, i) => (m + 1) & (1 << i)),
		);
	let best = -Infinity;
	for (const x of subsequences(a)) {
		for (const y of subsequences(b)) {
			if (x.length === y.length)
				best = Math.max(
					best,
					x.reduce((s, v, i) => s + v * (y[i] ?? 0), 0),
				);
		}
	}
	return best;
};

describe("1458. Max Dot Product of Two Subsequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxDotProduct([2, 1, -2, 5], [3, 0, -6])).toBe(18);
		expect(maxDotProduct([3, -2], [2, -6, 7])).toBe(21);
		expect(maxDotProduct([-1, -1], [1, 1])).toBe(-1);
	});

	it("matches trying every pair of subsequences on random inputs", () => {
		const random = createRandom(1458);
		for (let run = 0; run < 200; run++) {
			const a = random.array(random.int(1, 6), -5, 5);
			const b = random.array(random.int(1, 6), -5, 5);
			expect(maxDotProduct(a, b)).toBe(byBruteForce(a, b));
		}
	});
});
