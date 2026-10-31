import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sumOfConsecutiveSubsequences as getSum } from ".";

/** Checks every subsequence. */
const byBruteForce = (nums: number[]): number => {
	let total = 0;
	for (let mask = 1; mask < 1 << nums.length; mask++) {
		const sub = nums.filter((_, i) => (mask >> i) & 1);
		const steps = sub.slice(1).map((v, k) => v - (sub[k] ?? 0));
		if (steps.every((s) => s === 1) || steps.every((s) => s === -1))
			total += sub.reduce((a, b) => a + b, 0);
	}
	return total % 1_000_000_007;
};

describe("3299. Sum of Consecutive Subsequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(getSum([1, 2])).toBe(6);
		expect(getSum([1, 4, 2, 3])).toBe(31);
	});

	it("matches checking every subsequence on random arrays", () => {
		const random = createRandom(3299);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), 1, 5);
			expect(getSum(nums)).toBe(byBruteForce(nums));
		}
	});
});
