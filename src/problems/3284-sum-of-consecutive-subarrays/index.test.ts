import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sumOfConsecutiveSubarrays as getSum } from ".";

/** Checks every subarray. */
const byBruteForce = (nums: number[]): number => {
	let total = 0;
	for (let i = 0; i < nums.length; i++)
		for (let j = i; j < nums.length; j++) {
			const sub = nums.slice(i, j + 1);
			const steps = sub.slice(1).map((v, k) => v - (sub[k] ?? 0));
			if (steps.every((s) => s === 1) || steps.every((s) => s === -1))
				total += sub.reduce((a, b) => a + b, 0);
		}
	return total % 1_000_000_007;
};

describe("3284. Sum of Consecutive Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(getSum([1, 2, 3])).toBe(20);
		expect(getSum([1, 3, 5, 7])).toBe(16);
		expect(getSum([7, 6, 1, 2])).toBe(32);
	});

	it("matches checking every subarray on random arrays", () => {
		const random = createRandom(3284);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 1, 4);
			expect(getSum(nums)).toBe(byBruteForce(nums));
		}
	});
});
