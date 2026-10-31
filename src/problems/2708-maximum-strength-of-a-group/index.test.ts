import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumStrengthOfAGroup as maxStrength } from ".";

/** Tries every non-empty group. */
const byBruteForce = (nums: number[]): number => {
	let best = Number.NEGATIVE_INFINITY;
	for (let mask = 1; mask < 1 << nums.length; mask++)
		best = Math.max(
			best,
			nums.filter((_, i) => (mask >> i) & 1).reduce((p, x) => p * x, 1),
		);
	return best;
};

describe("2708. Maximum Strength of a Group", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxStrength([3, -1, -5, 2, 5, -9])).toBe(1350);
		expect(maxStrength([-4, -5, -4])).toBe(20);
	});

	it("matches trying every group on random inputs", () => {
		const random = createRandom(2708);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 9), -9, 9);
			expect(maxStrength(nums) + 0).toBe(byBruteForce(nums) + 0);
		}
	});
});
