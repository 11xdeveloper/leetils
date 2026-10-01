import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfLongestIncreasingSubsequence as findNumberOfLIS } from ".";

const byBruteForce = (nums: number[]): number => {
	let longest = 0;
	let count = 0;
	for (let mask = 1; mask < 1 << nums.length; mask++) {
		const chosen = nums.filter((_, i) => mask & (1 << i));
		if (!chosen.every((value, i) => i === 0 || (chosen[i - 1] ?? 0) < value))
			continue;
		if (chosen.length > longest) [longest, count] = [chosen.length, 1];
		else if (chosen.length === longest) count++;
	}
	return count;
};

describe("673. Number of Longest Increasing Subsequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(findNumberOfLIS([1, 3, 5, 4, 7])).toBe(2);
		expect(findNumberOfLIS([2, 2, 2, 2, 2])).toBe(5);
	});

	it("matches checking every subsequence on random inputs", () => {
		const random = createRandom(673);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(1, 12), 0, 6);
			expect(findNumberOfLIS(nums)).toBe(byBruteForce(nums));
		}
	});
});
