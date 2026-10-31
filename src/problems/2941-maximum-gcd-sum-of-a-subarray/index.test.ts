import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumGcdSumOfASubarray as maxGcdSum } from ".";

/** Checks every long-enough subarray. */
const byBruteForce = (nums: number[], k: number): number => {
	const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
	let best = 0;
	for (let i = 0; i < nums.length; i++) {
		let g = 0;
		let sum = 0;
		for (let j = i; j < nums.length; j++) {
			g = gcd(g, nums[j] ?? 0);
			sum += nums[j] ?? 0;
			if (j - i + 1 >= k) best = Math.max(best, g * sum);
		}
	}
	return best;
};

describe("2941. Maximum GCD-Sum of a Subarray", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxGcdSum([2, 1, 4, 4, 4, 2], 2)).toBe(48);
		expect(maxGcdSum([7, 3, 9, 4], 1)).toBe(81);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(2941);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 1, 24);
			const k = random.int(1, nums.length);
			expect(maxGcdSum(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
