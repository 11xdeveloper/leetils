import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeScoreAfterPairDeletions as maxScore } from ".";

/** Tries every sequence of removals. */
const byBruteForce = (nums: number[]): number => {
	if (nums.length <= 2) return 0;
	return Math.max(
		(nums[0] ?? 0) + (nums[1] ?? 0) + byBruteForce(nums.slice(2)),
		(nums.at(-1) ?? 0) + (nums.at(-2) ?? 0) + byBruteForce(nums.slice(0, -2)),
		(nums[0] ?? 0) + (nums.at(-1) ?? 0) + byBruteForce(nums.slice(1, -1)),
	);
};

describe("3496. Maximize Score After Pair Deletions", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxScore([2, 4, 1])).toBe(6);
		expect(maxScore([5, -1, 4, 2])).toBe(7);
	});

	it("matches trying every removal on random arrays", () => {
		const random = createRandom(3496);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), -5, 5);
			expect(maxScore(nums)).toBe(byBruteForce(nums));
		}
	});
});
