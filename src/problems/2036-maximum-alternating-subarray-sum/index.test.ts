import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumAlternatingSubarraySum as maxAlternatingSum } from ".";

/** Sums every subarray. */
const byBruteForce = (nums: number[]): number => {
	let best = -Infinity;
	for (let i = 0; i < nums.length; i++) {
		let sum = 0;
		for (let j = i; j < nums.length; j++) {
			sum += (j - i) % 2 ? -(nums[j] ?? 0) : (nums[j] ?? 0);
			best = Math.max(best, sum);
		}
	}
	return best;
};

describe("2036. Maximum Alternating Subarray Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxAlternatingSum([3, -1, 1, 2])).toBe(5);
		expect(maxAlternatingSum([2, 2, 2, 2, 2])).toBe(2);
		expect(maxAlternatingSum([1])).toBe(1);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(2036);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), -10, 10);
			expect(maxAlternatingSum(nums)).toBe(byBruteForce(nums));
		}
	});
});
