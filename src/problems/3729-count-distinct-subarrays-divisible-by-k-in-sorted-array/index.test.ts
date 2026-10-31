import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countDistinctSubarraysDivisibleByKInSortedArray as numGoodSubarrays } from ".";

/** Collects every qualifying subarray's contents. */
const byBruteForce = (nums: number[], k: number): number => {
	const seen = new Set<string>();
	for (let i = 0; i < nums.length; i++)
		for (let j = i; j < nums.length; j++) {
			const part = nums.slice(i, j + 1);
			if (part.reduce((a, b) => a + b, 0) % k === 0) seen.add(part.join());
		}
	return seen.size;
};

describe("3729. Count Distinct Subarrays Divisible by K in Sorted Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(numGoodSubarrays([1, 2, 3], 3)).toBe(3);
		expect(numGoodSubarrays([2, 2, 2, 2, 2, 2], 6)).toBe(2);
	});

	it("matches collecting contents on random sorted arrays", () => {
		const random = createRandom(3729);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 1, 5).sort((a, b) => a - b);
			const k = random.int(1, 8);
			expect(numGoodSubarrays(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
