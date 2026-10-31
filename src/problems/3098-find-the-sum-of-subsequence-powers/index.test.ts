import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheSumOfSubsequencePowers as sumOfPowers } from ".";

/** Checks every subsequence of length k. */
const byBruteForce = (nums: number[], k: number): number => {
	let total = 0;
	for (let mask = 0; mask < 1 << nums.length; mask++) {
		const chosen = nums.filter((_, i) => (mask >> i) & 1).sort((a, b) => a - b);
		if (chosen.length !== k) continue;
		let power = Number.POSITIVE_INFINITY;
		for (let i = 1; i < k; i++)
			power = Math.min(power, (chosen[i] ?? 0) - (chosen[i - 1] ?? 0));
		total += power;
	}
	return total;
};

describe("3098. Find the Sum of Subsequence Powers", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumOfPowers([1, 2, 3, 4], 3)).toBe(4);
		expect(sumOfPowers([2, 2], 2)).toBe(0);
		expect(sumOfPowers([4, 3, -1], 2)).toBe(10);
	});

	it("matches checking every subsequence on random arrays", () => {
		const random = createRandom(3098);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(2, 9), -10, 10);
			const k = random.int(2, nums.length);
			expect(sumOfPowers(nums, k)).toBe(byBruteForce(nums, k));
		}
	});

	it("reduces large answers modulo 10^9 + 7", () => {
		const nums = Array.from({ length: 50 }, (_, i) => i * 4_000_000 - 1e8);
		expect(sumOfPowers(nums, 2)).toBeLessThan(1_000_000_007);
	});
});
