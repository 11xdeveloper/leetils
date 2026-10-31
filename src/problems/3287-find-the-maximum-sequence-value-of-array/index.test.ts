import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheMaximumSequenceValueOfArray as maxValue } from ".";

/** Checks every subsequence of length 2k. */
const byBruteForce = (nums: number[], k: number): number => {
	let best = 0;
	for (let mask = 0; mask < 1 << nums.length; mask++) {
		const chosen = nums.filter((_, i) => (mask >> i) & 1);
		if (chosen.length !== 2 * k) continue;
		const or = (part: number[]) => part.reduce((a, b) => a | b, 0);
		best = Math.max(best, or(chosen.slice(0, k)) ^ or(chosen.slice(k)));
	}
	return best;
};

describe("3287. Find the Maximum Sequence Value of Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxValue([2, 6, 7], 1)).toBe(5);
		expect(maxValue([4, 2, 5, 6, 7], 2)).toBe(2);
	});

	it("matches checking every subsequence on random arrays", () => {
		const random = createRandom(3287);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(2, 10), 1, 127);
			const k = random.int(1, Math.floor(nums.length / 2));
			expect(maxValue(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
