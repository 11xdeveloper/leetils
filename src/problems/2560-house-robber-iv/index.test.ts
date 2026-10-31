import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { houseRobberIV as minCapability } from ".";

/** Tries every set of non-adjacent houses. */
const byBruteForce = (nums: number[], k: number): number => {
	let best = Number.POSITIVE_INFINITY;
	for (let mask = 0; mask < 1 << nums.length; mask++) {
		if (mask & (mask >> 1)) continue;
		const robbed = nums.filter((_, i) => (mask >> i) & 1);
		if (robbed.length >= k) best = Math.min(best, Math.max(...robbed));
	}
	return best;
};

describe("2560. House Robber IV", () => {
	it("solves the examples from the problem statement", () => {
		expect(minCapability([2, 3, 5, 9], 2)).toBe(5);
		expect(minCapability([2, 7, 9, 3, 1], 2)).toBe(2);
	});

	it("matches trying every robbery on random inputs", () => {
		const random = createRandom(2560);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 1, 20);
			const k = random.int(1, Math.ceil(nums.length / 2));
			expect(minCapability(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
