import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { arithmeticSlicesIISubsequence as count } from ".";

const byBruteForce = (nums: number[]): number => {
	let total = 0;
	for (let mask = 0; mask < 1 << nums.length; mask++) {
		const chosen = nums.filter((_, i) => mask & (1 << i));
		if (chosen.length < 3) continue;
		const step = (chosen[1] ?? 0) - (chosen[0] ?? 0);
		if (chosen.every((v, k) => k === 0 || v - (chosen[k - 1] ?? 0) === step))
			total++;
	}
	return total;
};

describe("446. Arithmetic Slices II - Subsequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(count([2, 4, 6, 8, 10])).toBe(7);
		expect(count([7, 7, 7, 7, 7])).toBe(16);
	});

	it("handles differences beyond the 32-bit range", () => {
		expect(count([-(2 ** 31), 0, 2 ** 31 - 1])).toBe(0);
	});

	it("matches trying every subsequence on random inputs", () => {
		const random = createRandom(446);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(1, 12), -3, 3);
			expect(count(nums)).toBe(byBruteForce(nums));
		}
	});
});
