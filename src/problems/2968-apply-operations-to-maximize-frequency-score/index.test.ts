import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { applyOperationsToMaximizeFrequencyScore as maxFrequencyScore } from ".";

/** Tries every target value and greedily takes the cheapest elements. */
const byBruteForce = (nums: number[], k: number): number => {
	let best = 0;
	for (const target of nums) {
		const costs = nums.map((x) => Math.abs(x - target)).sort((a, b) => a - b);
		let budget = k;
		let count = 0;
		for (const c of costs) {
			if (c > budget) break;
			budget -= c;
			count++;
		}
		best = Math.max(best, count);
	}
	return best;
};

describe("2968. Apply Operations to Maximize Frequency Score", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxFrequencyScore([1, 2, 6, 4], 3)).toBe(3);
		expect(maxFrequencyScore([1, 4, 4, 2, 4], 0)).toBe(3);
	});

	it("matches trying every target on random inputs", () => {
		const random = createRandom(2968);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 1, 20);
			const k = random.int(0, 20);
			expect(maxFrequencyScore(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
