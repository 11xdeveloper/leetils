import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumLengthOfSubarrayWithPositiveProduct as getMaxLen } from ".";

/** Checks the sign of every subarray's product. */
const byBruteForce = (nums: number[]): number => {
	let longest = 0;
	for (let i = 0; i < nums.length; i++) {
		let sign = 1;
		for (let j = i; j < nums.length; j++) {
			sign *= Math.sign(nums[j] ?? 0);
			if (sign > 0) longest = Math.max(longest, j - i + 1);
		}
	}
	return longest;
};

describe("1567. Maximum Length of Subarray With Positive Product", () => {
	it("solves the examples from the problem statement", () => {
		expect(getMaxLen([1, -2, -3, 4])).toBe(4);
		expect(getMaxLen([0, 1, -2, -3, -4])).toBe(3);
		expect(getMaxLen([-1, -2, -3, 0, 1])).toBe(2);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(1567);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), -2, 2);
			expect(getMaxLen(nums)).toBe(byBruteForce(nums));
		}
	});
});
