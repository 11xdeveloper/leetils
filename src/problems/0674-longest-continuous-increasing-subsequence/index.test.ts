import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestContinuousIncreasingSubsequence as findLengthOfLCIS } from ".";

const byBruteForce = (nums: number[]): number => {
	let longest = 0;
	for (let i = 0; i < nums.length; i++) {
		let j = i + 1;
		while (j < nums.length && (nums[j] ?? 0) > (nums[j - 1] ?? 0)) j++;
		longest = Math.max(longest, j - i);
	}
	return longest;
};

describe("674. Longest Continuous Increasing Subsequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(findLengthOfLCIS([1, 3, 5, 4, 7])).toBe(3);
		expect(findLengthOfLCIS([2, 2, 2, 2, 2])).toBe(1);
	});

	it("matches extending from every start on random inputs", () => {
		const random = createRandom(674);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 15), -5, 5);
			expect(findLengthOfLCIS(nums)).toBe(byBruteForce(nums));
		}
	});
});
