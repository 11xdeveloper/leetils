import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumXorOfSubsequences as maxXorSubsequences } from ".";

/** Tries every subset. */
const byBruteForce = (nums: number[]): number => {
	let best = 0;
	for (let mask = 0; mask < 1 << nums.length; mask++)
		best = Math.max(
			best,
			nums.reduce((x, num, i) => ((mask >> i) & 1 ? x ^ num : x), 0),
		);
	return best;
};

describe("3681. Maximum XOR of Subsequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxXorSubsequences([1, 2, 3])).toBe(3);
		expect(maxXorSubsequences([5, 2])).toBe(7);
	});

	it("matches trying every subset on random arrays", () => {
		const random = createRandom(3681);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(2, 10), 0, 1000);
			expect(maxXorSubsequences(nums)).toBe(byBruteForce(nums));
		}
	});
});
