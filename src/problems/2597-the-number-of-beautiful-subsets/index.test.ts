import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { theNumberOfBeautifulSubsets as beautifulSubsets } from ".";

/** Checks every subset. */
const byBruteForce = (nums: number[], k: number): number => {
	let count = 0;
	for (let mask = 1; mask < 1 << nums.length; mask++) {
		const subset = nums.filter((_, i) => (mask >> i) & 1);
		if (subset.every((a) => subset.every((b) => Math.abs(a - b) !== k)))
			count++;
	}
	return count;
};

describe("2597. The Number of Beautiful Subsets", () => {
	it("solves the examples from the problem statement", () => {
		expect(beautifulSubsets([2, 4, 6], 2)).toBe(4);
		expect(beautifulSubsets([1], 1)).toBe(1);
	});

	it("matches checking every subset on random inputs", () => {
		const random = createRandom(2597);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 1, 12);
			const k = random.int(1, 5);
			expect(beautifulSubsets(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
