import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheMaximumLengthOfValidSubsequenceII as maximumLength } from ".";

/** Checks every subsequence. */
const byBruteForce = (nums: number[], k: number): number => {
	let best = 0;
	for (let mask = 1; mask < 1 << nums.length; mask++) {
		const sub = nums.filter((_, i) => (mask >> i) & 1);
		const sums = sub.slice(1).map((v, i) => (v + (sub[i] ?? 0)) % k);
		if (sums.every((s) => s === sums[0])) best = Math.max(best, sub.length);
	}
	return best;
};

describe("3202. Find the Maximum Length of Valid Subsequence II", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumLength([1, 2, 3, 4, 5], 2)).toBe(5);
		expect(maximumLength([1, 4, 2, 3, 1, 4], 3)).toBe(4);
	});

	it("matches checking every subsequence on random arrays", () => {
		const random = createRandom(3202);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(2, 10), 1, 9);
			const k = random.int(1, 4);
			expect(maximumLength(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
