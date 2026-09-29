import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { partitionEqualSubsetSum as canPartition } from ".";

const byBruteForce = (nums: number[]): boolean => {
	const total = nums.reduce((a, b) => a + b, 0);
	for (let mask = 0; mask < 1 << nums.length; mask++) {
		const sum = nums.reduce((s, n, i) => (mask & (1 << i) ? s + n : s), 0);
		if (2 * sum === total) return true;
	}
	return false;
};

describe("416. Partition Equal Subset Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(canPartition([1, 5, 11, 5])).toBeTrue();
		expect(canPartition([1, 2, 3, 5])).toBeFalse();
	});

	it("matches trying every subset on random inputs", () => {
		const random = createRandom(416);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 12), 1, 20);
			expect(canPartition(nums)).toBe(byBruteForce(nums));
		}
	});
});
