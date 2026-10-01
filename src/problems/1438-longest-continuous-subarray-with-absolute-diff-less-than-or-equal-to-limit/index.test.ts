import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestContinuousSubarrayWithAbsoluteDiffLessThanOrEqualToLimit as longestSubarray } from ".";

/** Checks every subarray. */
const byBruteForce = (nums: number[], limit: number): number => {
	let longest = 0;
	for (let i = 0; i < nums.length; i++) {
		for (let j = i; j < nums.length; j++) {
			const window = nums.slice(i, j + 1);
			if (Math.max(...window) - Math.min(...window) <= limit)
				longest = Math.max(longest, j - i + 1);
		}
	}
	return longest;
};

describe("1438. Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestSubarray([8, 2, 4, 7], 4)).toBe(2);
		expect(longestSubarray([10, 1, 2, 4, 7, 2], 5)).toBe(4);
		expect(longestSubarray([4, 2, 2, 2, 4, 4, 2, 2], 0)).toBe(3);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(1438);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 15), 1, 10);
			const limit = random.int(0, 6);
			expect(longestSubarray(nums, limit)).toBe(byBruteForce(nums, limit));
		}
	});
});
