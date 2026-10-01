import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumProductOfThreeNumbers as maximumProduct } from ".";

const byBruteForce = (nums: number[]): number => {
	let best = Number.NEGATIVE_INFINITY;
	for (let i = 0; i < nums.length; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			for (let k = j + 1; k < nums.length; k++)
				best = Math.max(best, (nums[i] ?? 0) * (nums[j] ?? 0) * (nums[k] ?? 0));
		}
	}
	return best;
};

describe("628. Maximum Product of Three Numbers", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumProduct([1, 2, 3])).toBe(6);
		expect(maximumProduct([1, 2, 3, 4])).toBe(24);
		expect(maximumProduct([-1, -2, -3])).toBe(-6);
	});

	it("matches checking every triple on random inputs", () => {
		const random = createRandom(628);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(3, 10), -10, 10);
			expect(maximumProduct(nums)).toBe(byBruteForce(nums));
		}
	});
});
