import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumSizeSubarraySumEqualsK as maxLength } from ".";

const byBruteForce = (nums: number[], k: number): number => {
	let longest = 0;
	for (let i = 0; i < nums.length; i++) {
		let sum = 0;
		for (let j = i; j < nums.length; j++) {
			sum += nums[j] ?? 0;
			if (sum === k) longest = Math.max(longest, j - i + 1);
		}
	}
	return longest;
};

describe("325. Maximum Size Subarray Sum Equals k", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxLength([1, -1, 5, -2, 3], 3)).toBe(4);
		expect(maxLength([-2, -1, 2, 1], 1)).toBe(2);
	});

	it("returns 0 when no subarray works", () => {
		expect(maxLength([1, 2, 3], 7)).toBe(0);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(325);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 20), -5, 5);
			const k = random.int(-8, 8);
			expect(maxLength(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
