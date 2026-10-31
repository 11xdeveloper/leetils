import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumBitwiseAndAfterIncrementOperations as maximumAND } from ".";

/** Tries every AND value, raising elements one at a time. */
const byBruteForce = (nums: number[], k: number, m: number): number => {
	for (let want = 64; want > 0; want--) {
		const costs = nums
			.map((x) => {
				let y = x;
				while ((y & want) !== want) y++;
				return y - x;
			})
			.sort((a, b) => a - b);
		if (costs.slice(0, m).reduce((a, b) => a + b, 0) <= k) return want;
	}
	return 0;
};

describe("3806. Maximum Bitwise AND After Increment Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumAND([3, 1, 2], 8, 2)).toBe(6);
		expect(maximumAND([1, 2, 8, 4], 7, 3)).toBe(4);
		expect(maximumAND([1, 1], 3, 2)).toBe(2);
	});

	it("matches trying every AND on random arrays", () => {
		const random = createRandom(3806);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 6), 1, 20);
			const k = random.int(1, 25);
			const m = random.int(1, nums.length);
			expect(maximumAND(nums, k, m)).toBe(byBruteForce(nums, k, m));
		}
	});
});
