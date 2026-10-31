import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumProductOfTwoIntegersWithNoCommonBits as maxProduct } from ".";

/** Checks every pair. */
const byBruteForce = (nums: number[]): number => {
	let best = 0;
	for (let i = 0; i < nums.length; i++)
		for (let j = i + 1; j < nums.length; j++)
			if (((nums[i] ?? 0) & (nums[j] ?? 0)) === 0)
				best = Math.max(best, (nums[i] ?? 0) * (nums[j] ?? 0));
	return best;
};

describe("3670. Maximum Product of Two Integers With No Common Bits", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxProduct([1, 2, 3, 4, 5, 6, 7])).toBe(12);
		expect(maxProduct([5, 6, 4])).toBe(0);
		expect(maxProduct([64, 8, 32])).toBe(2048);
	});

	it("matches checking every pair on random arrays", () => {
		const random = createRandom(3670);
		for (let run = 0; run < 300; run++) {
			const nums = [...new Set(random.array(random.int(2, 10), 1, 100))];
			if (nums.length < 2) continue;
			expect(maxProduct(nums)).toBe(byBruteForce(nums));
		}
	});
});
