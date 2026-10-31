import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumAndMinimumSumsOfAtMostSizeKSubsequences as minMaxSums } from ".";

/** Checks every subsequence. */
const byBruteForce = (nums: number[], k: number): number => {
	let total = 0;
	for (let mask = 1; mask < 1 << nums.length; mask++) {
		const sub = nums.filter((_, i) => (mask >> i) & 1);
		if (sub.length <= k) total += Math.max(...sub) + Math.min(...sub);
	}
	return total % 1_000_000_007;
};

describe("3428. Maximum and Minimum Sums of at Most Size K Subsequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(minMaxSums([1, 2, 3], 2)).toBe(24);
		expect(minMaxSums([5, 0, 6], 1)).toBe(22);
		expect(minMaxSums([1, 1, 1], 2)).toBe(12);
	});

	it("matches checking every subsequence on random arrays", () => {
		const random = createRandom(3428);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), 0, 9);
			const k = random.int(1, nums.length);
			expect(minMaxSums(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
