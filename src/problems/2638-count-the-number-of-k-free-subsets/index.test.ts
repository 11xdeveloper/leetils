import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countTheNumberOfKFreeSubsets as countTheNumOfKFreeSubsets } from ".";

/** Checks every subset. */
const byBruteForce = (nums: number[], k: number): number => {
	let count = 0;
	for (let mask = 0; mask < 1 << nums.length; mask++) {
		const subset = nums.filter((_, i) => (mask >> i) & 1);
		if (subset.every((a) => !subset.includes(a + k))) count++;
	}
	return count;
};

describe("2638. Count the Number of K-Free Subsets", () => {
	it("solves the examples from the problem statement", () => {
		expect(countTheNumOfKFreeSubsets([5, 4, 6], 1)).toBe(5);
		expect(countTheNumOfKFreeSubsets([2, 3, 5, 8], 5)).toBe(12);
		expect(countTheNumOfKFreeSubsets([10, 5, 9, 11], 20)).toBe(16);
	});

	it("matches checking every subset on random inputs", () => {
		const random = createRandom(2638);
		for (let run = 0; run < 300; run++) {
			const nums = [...new Set(random.array(random.int(1, 10), 0, 15))];
			const k = random.int(1, 5);
			expect(countTheNumOfKFreeSubsets(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
