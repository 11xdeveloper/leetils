import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheNumberOfSubsequencesWithEqualGcd as subsequencePairCount } from ".";

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

/** Tries every way to split the elements three ways. */
const byBruteForce = (nums: number[]): number => {
	let count = 0;
	for (let code = 0; code < 3 ** nums.length; code++) {
		let [g1, g2] = [0, 0];
		for (
			let i = 0, rest = code;
			i < nums.length;
			i++, rest = Math.floor(rest / 3)
		) {
			if (rest % 3 === 1) g1 = gcd(g1, nums[i] ?? 0);
			if (rest % 3 === 2) g2 = gcd(g2, nums[i] ?? 0);
		}
		if (g1 > 0 && g1 === g2) count++;
	}
	return count;
};

describe("3336. Find the Number of Subsequences With Equal GCD", () => {
	it("solves the examples from the problem statement", () => {
		expect(subsequencePairCount([1, 2, 3, 4])).toBe(10);
		expect(subsequencePairCount([10, 20, 30])).toBe(2);
		expect(subsequencePairCount([1, 1, 1, 1])).toBe(50);
	});

	it("matches trying every split on random arrays", () => {
		const random = createRandom(3336);
		for (let run = 0; run < 100; run++) {
			const nums = random.array(random.int(1, 7), 1, 12);
			expect(subsequencePairCount(nums)).toBe(byBruteForce(nums));
		}
	});
});
