import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheLargestAlmostMissingInteger as largestInteger } from ".";

/** Counts the windows containing each value. */
const byBruteForce = (nums: number[], k: number): number => {
	let best = -1;
	for (const value of new Set(nums)) {
		let windows = 0;
		for (let i = 0; i + k <= nums.length; i++)
			if (nums.slice(i, i + k).includes(value)) windows++;
		if (windows === 1) best = Math.max(best, value);
	}
	return best;
};

describe("3471. Find the Largest Almost Missing Integer", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestInteger([3, 9, 2, 1, 7], 3)).toBe(7);
		expect(largestInteger([3, 9, 7, 2, 1, 7], 4)).toBe(3);
		expect(largestInteger([0, 0], 1)).toBe(-1);
	});

	it("matches counting windows on random arrays", () => {
		const random = createRandom(3471);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 8), 0, 6);
			const k = random.int(1, nums.length);
			expect(largestInteger(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
