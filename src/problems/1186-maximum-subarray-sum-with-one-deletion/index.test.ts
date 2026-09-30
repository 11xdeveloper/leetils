import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumSubarraySumWithOneDeletion as maximumSum } from ".";

/** Tries every subarray with every choice of deletion. */
const byBruteForce = (arr: number[]): number => {
	let best = -Infinity;
	for (let i = 0; i < arr.length; i++) {
		for (let j = i; j < arr.length; j++) {
			const sub = arr.slice(i, j + 1);
			const sum = sub.reduce((total, value) => total + value, 0);
			best = Math.max(best, sum);
			if (sub.length > 1)
				for (const value of sub) best = Math.max(best, sum - value);
		}
	}
	return best;
};

describe("1186. Maximum Subarray Sum with One Deletion", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumSum([1, -2, 0, 3])).toBe(4);
		expect(maximumSum([1, -2, -2, 3])).toBe(3);
		expect(maximumSum([-1, -1, -1, -1])).toBe(-1);
	});

	it("handles a single element", () => {
		expect(maximumSum([-7])).toBe(-7);
	});

	it("matches trying every subarray and deletion on random inputs", () => {
		const random = createRandom(1186);
		for (let run = 0; run < 300; run++) {
			const arr = random.array(random.int(1, 12), -10, 10);
			expect(maximumSum(arr)).toBe(byBruteForce(arr));
		}
	});
});
