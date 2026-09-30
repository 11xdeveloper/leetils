import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { kConcatenationMaximumSum as kConcatenationMaxSum } from ".";

/** Kadane's algorithm over the whole repeated array. */
const byBruteForce = (arr: number[], k: number): number => {
	let [ending, best] = [0, 0];
	for (let copy = 0; copy < k; copy++) {
		for (const value of arr) {
			ending = Math.max(ending + value, 0);
			best = Math.max(best, ending);
		}
	}
	return best;
};

describe("1191. K-Concatenation Maximum Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(kConcatenationMaxSum([1, 2], 3)).toBe(9);
		expect(kConcatenationMaxSum([1, -2, 1], 5)).toBe(2);
		expect(kConcatenationMaxSum([-1, -2], 7)).toBe(0);
	});

	it("reduces large sums modulo 10^9 + 7", () => {
		const arr = new Array<number>(100000).fill(10000);
		expect(kConcatenationMaxSum(arr, 100000)).toBe(10 ** 14 % 1_000_000_007);
	});

	it("matches Kadane's over the whole array on random inputs", () => {
		const random = createRandom(1191);
		for (let run = 0; run < 300; run++) {
			const arr = random.array(random.int(1, 8), -5, 5);
			const k = random.int(1, 6);
			expect(kConcatenationMaxSum(arr, k)).toBe(byBruteForce(arr, k));
		}
	});
});
