import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumSubarrayXorWithBoundedRange as maxXor } from ".";

/** Checks every subarray. */
const byBruteForce = (nums: number[], k: number): number => {
	let best = 0;
	for (let i = 0; i < nums.length; i++) {
		let [x, high, low] = [
			0,
			Number.NEGATIVE_INFINITY,
			Number.POSITIVE_INFINITY,
		];
		for (let j = i; j < nums.length; j++) {
			x ^= nums[j] ?? 0;
			high = Math.max(high, nums[j] ?? 0);
			low = Math.min(low, nums[j] ?? 0);
			if (high - low <= k) best = Math.max(best, x);
		}
	}
	return best;
};

describe("3845. Maximum Subarray XOR with Bounded Range", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxXor([5, 4, 5, 6], 2)).toBe(7);
		expect(maxXor([5, 4, 5, 6], 1)).toBe(6);
	});

	it("matches checking every subarray on random arrays", () => {
		const random = createRandom(3845);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 0, 31);
			const k = random.int(0, 20);
			expect(maxXor(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
