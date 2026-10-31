import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sumOfGoodSubsequences as sumOfGoodSubseq } from ".";

/** Checks every subsequence. */
const byBruteForce = (nums: number[]): number => {
	let total = 0;
	for (let mask = 1; mask < 1 << nums.length; mask++) {
		const sub = nums.filter((_, i) => (mask >> i) & 1);
		if (sub.every((v, i) => i === 0 || Math.abs(v - (sub[i - 1] ?? 0)) === 1))
			total += sub.reduce((a, b) => a + b, 0);
	}
	return total % 1_000_000_007;
};

describe("3351. Sum of Good Subsequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumOfGoodSubseq([1, 2, 1])).toBe(14);
		expect(sumOfGoodSubseq([3, 4, 5])).toBe(40);
	});

	it("matches checking every subsequence on random arrays", () => {
		const random = createRandom(3351);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), 0, 4);
			expect(sumOfGoodSubseq(nums)).toBe(byBruteForce(nums));
		}
	});
});
