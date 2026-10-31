import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfEffectiveSubsequences as countEffective } from ".";

/** Tries every subsequence. */
const byBruteForce = (nums: number[]): number => {
	const total = nums.reduce((a, b) => a | b, 0);
	let count = 0;
	for (let mask = 1; mask < 1 << nums.length; mask++)
		if (
			nums.reduce((or, num, i) => ((mask >> i) & 1 ? or : or | num), 0) < total
		)
			count++;
	return count;
};

describe("3757. Number of Effective Subsequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(countEffective([1, 2, 3])).toBe(3);
		expect(countEffective([7, 4, 6])).toBe(4);
		expect(countEffective([8, 8])).toBe(1);
		expect(countEffective([2, 2, 1])).toBe(5);
	});

	it("matches trying every subsequence on random arrays", () => {
		const random = createRandom(3757);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), 0, 31);
			expect(countEffective(nums)).toBe(byBruteForce(nums));
		}
	});
});
