import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sumOfBeautifulSubsequences as totalBeauty } from ".";

/** Tries every subsequence. */
const byBruteForce = (nums: number[]): number => {
	const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
	let sum = 0;
	for (let mask = 1; mask < 1 << nums.length; mask++) {
		const picked = nums.filter((_, i) => (mask >> i) & 1);
		if (picked.every((x, i) => i === 0 || x > (picked[i - 1] ?? 0)))
			sum += picked.reduce(gcd, 0);
	}
	return sum % 1_000_000_007;
};

describe("3671. Sum of Beautiful Subsequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(totalBeauty([1, 2, 3])).toBe(10);
		expect(totalBeauty([4, 6])).toBe(12);
	});

	it("matches trying every subsequence on random arrays", () => {
		const random = createRandom(3671);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), 1, 24);
			expect(totalBeauty(nums)).toBe(byBruteForce(nums));
		}
	});
});
