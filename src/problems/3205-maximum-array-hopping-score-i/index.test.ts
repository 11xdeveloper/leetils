import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumArrayHoppingScoreI as maxScore } from ".";

/** Dynamic programming over every hop. */
const byBruteForce = (nums: number[]): number => {
	const best = nums.map(() => Number.NEGATIVE_INFINITY);
	best[0] = 0;
	for (let j = 1; j < nums.length; j++)
		for (let i = 0; i < j; i++)
			best[j] = Math.max(
				best[j] ?? 0,
				(best[i] ?? 0) + (j - i) * (nums[j] ?? 0),
			);
	return best.at(-1) ?? 0;
};

describe("3205. Maximum Array Hopping Score I", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxScore([1, 5, 8])).toBe(16);
		expect(maxScore([4, 5, 2, 8, 9, 1, 3])).toBe(42);
	});

	it("matches trying every hop on random arrays", () => {
		const random = createRandom(3205);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(2, 10), 1, 10);
			expect(maxScore(nums)).toBe(byBruteForce(nums));
		}
	});
});
