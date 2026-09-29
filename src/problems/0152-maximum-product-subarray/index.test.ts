import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumProductSubarray } from ".";

const byBruteForce = (nums: number[]): number => {
	let best = Number.NEGATIVE_INFINITY;
	for (let i = 0; i < nums.length; i++) {
		let product = 1;
		for (let j = i; j < nums.length; j++) {
			product *= nums[j] ?? 0;
			best = Math.max(best, product);
		}
	}
	return best || 0;
};

describe("152. Maximum Product Subarray", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumProductSubarray([2, 3, -2, 4])).toBe(6);
		expect(maximumProductSubarray([-2, 0, -1])).toBe(0);
	});

	it("multiplies two negatives into a positive", () => {
		expect(maximumProductSubarray([-2, 3, -4])).toBe(24);
	});

	it("handles a single negative number", () => {
		expect(maximumProductSubarray([-3])).toBe(-3);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(152);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 12), -4, 4);
			expect(maximumProductSubarray(nums)).toBe(byBruteForce(nums));
		}
	});
});
