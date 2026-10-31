import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumProductOfSubsequencesWithAnAlternatingSumEqualToK as maxProduct } from ".";

/** Checks every subsequence. */
const byBruteForce = (nums: number[], k: number, limit: number): number => {
	let best = -1;
	for (let mask = 1; mask < 1 << nums.length; mask++) {
		const sub = nums.filter((_, i) => (mask >> i) & 1);
		const alternating = sub.reduce(
			(s, v, i) => (i % 2 === 0 ? s + v : s - v),
			0,
		);
		const product = sub.reduce((p, v) => p * v, 1);
		if (alternating === k && product <= limit) best = Math.max(best, product);
	}
	return best;
};

describe("3509. Maximum Product of Subsequences With an Alternating Sum Equal to K", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxProduct([1, 2, 3], 2, 10)).toBe(6);
		expect(maxProduct([0, 2, 3], -5, 12)).toBe(-1);
		expect(maxProduct([2, 2, 3, 3], 0, 9)).toBe(9);
	});

	it("matches checking every subsequence on random arrays", () => {
		const random = createRandom(3509);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), 0, 6);
			const k = random.int(-6, 6);
			const limit = random.int(1, 60);
			expect(maxProduct(nums, k, limit)).toBe(byBruteForce(nums, k, limit));
		}
	});
});
