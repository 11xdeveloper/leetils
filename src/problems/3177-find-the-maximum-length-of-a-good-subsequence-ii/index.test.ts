import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheMaximumLengthOfAGoodSubsequenceII as maximumLength } from ".";

/** Checks every subsequence. */
const byBruteForce = (nums: number[], k: number): number => {
	let best = 0;
	for (let mask = 1; mask < 1 << nums.length; mask++) {
		const chosen = nums.filter((_, i) => (mask >> i) & 1);
		let changes = 0;
		for (let i = 1; i < chosen.length; i++)
			if (chosen[i] !== chosen[i - 1]) changes++;
		if (changes <= k) best = Math.max(best, chosen.length);
	}
	return best;
};

describe("3177. Find the Maximum Length of a Good Subsequence II", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumLength([1, 2, 1, 1, 3], 2)).toBe(4);
		expect(maximumLength([1, 2, 3, 4, 5, 1], 0)).toBe(2);
	});

	it("matches checking every subsequence on random arrays", () => {
		const random = createRandom(3177);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), 1, 4);
			const k = random.int(0, 3);
			expect(maximumLength(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
