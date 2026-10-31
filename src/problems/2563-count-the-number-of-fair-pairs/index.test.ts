import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countTheNumberOfFairPairs as countFairPairs } from ".";

/** Checks every pair. */
const byBruteForce = (nums: number[], lower: number, upper: number): number => {
	let pairs = 0;
	for (let i = 0; i < nums.length; i++)
		for (let j = i + 1; j < nums.length; j++) {
			const sum = (nums[i] ?? 0) + (nums[j] ?? 0);
			if (sum >= lower && sum <= upper) pairs++;
		}
	return pairs;
};

describe("2563. Count the Number of Fair Pairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(countFairPairs([0, 1, 7, 4, 4, 5], 3, 6)).toBe(6);
		expect(countFairPairs([1, 7, 9, 2, 5], 11, 11)).toBe(1);
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(2563);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), -10, 10);
			const lower = random.int(-15, 15);
			const upper = random.int(lower, 20);
			expect(countFairPairs(nums, lower, upper)).toBe(
				byBruteForce(nums, lower, upper),
			);
		}
	});
});
