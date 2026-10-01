import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheMostCompetitiveSubsequence as mostCompetitive } from ".";

/** Picks each element as the smallest one leaving enough after it. */
const byBruteForce = (nums: number[], k: number): number[] => {
	const result: number[] = [];
	let start = 0;
	for (let left = k; left > 0; left--) {
		const window = nums.slice(start, nums.length - left + 1);
		const smallest = Math.min(...window);
		start += window.indexOf(smallest) + 1;
		result.push(smallest);
	}
	return result;
};

describe("1673. Find the Most Competitive Subsequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(mostCompetitive([3, 5, 2, 6], 2)).toEqual([2, 6]);
		expect(mostCompetitive([2, 4, 3, 3, 5, 4, 9, 6], 4)).toEqual([2, 3, 3, 4]);
	});

	it("matches greedy selection on random inputs", () => {
		const random = createRandom(1673);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 0, 5);
			const k = random.int(1, nums.length);
			expect(mostCompetitive(nums, k)).toEqual(byBruteForce(nums, k));
		}
	});
});
