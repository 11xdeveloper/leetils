import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfNonOverlappingSubarraysWithSumEqualsTarget as maxNonOverlapping } from ".";

/** Dynamic programming over prefixes, trying every last subarray. */
const byBruteForce = (nums: number[], target: number): number => {
	const best = new Array<number>(nums.length + 1).fill(0);
	for (let end = 1; end <= nums.length; end++) {
		best[end] = best[end - 1] ?? 0;
		let sum = 0;
		for (let start = end - 1; start >= 0; start--) {
			sum += nums[start] ?? 0;
			if (sum === target)
				best[end] = Math.max(best[end] ?? 0, (best[start] ?? 0) + 1);
		}
	}
	return best[nums.length] ?? 0;
};

describe("1546. Maximum Number of Non-Overlapping Subarrays With Sum Equals Target", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxNonOverlapping([1, 1, 1, 1, 1], 2)).toBe(2);
		expect(maxNonOverlapping([-1, 3, 5, 1, 4, 2, -9], 6)).toBe(2);
	});

	it("matches dynamic programming on random inputs", () => {
		const random = createRandom(1546);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), -3, 3);
			const target = random.int(0, 4);
			expect(maxNonOverlapping(nums, target)).toBe(byBruteForce(nums, target));
		}
	});
});
