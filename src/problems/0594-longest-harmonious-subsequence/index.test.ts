import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestHarmoniousSubsequence as findLHS } from ".";

const byBruteForce = (nums: number[]): number => {
	let longest = 0;
	for (let mask = 1; mask < 1 << nums.length; mask++) {
		const chosen = nums.filter((_, i) => mask & (1 << i));
		if (Math.max(...chosen) - Math.min(...chosen) === 1)
			longest = Math.max(longest, chosen.length);
	}
	return longest;
};

describe("594. Longest Harmonious Subsequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(findLHS([1, 3, 2, 2, 5, 2, 3, 7])).toBe(5);
		expect(findLHS([1, 2, 3, 4])).toBe(2);
		expect(findLHS([1, 1, 1, 1])).toBe(0);
	});

	it("matches trying every subsequence on random inputs", () => {
		const random = createRandom(594);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(1, 12), -3, 3);
			expect(findLHS(nums)).toBe(byBruteForce(nums));
		}
	});
});
