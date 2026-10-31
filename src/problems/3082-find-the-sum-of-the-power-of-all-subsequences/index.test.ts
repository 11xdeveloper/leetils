import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheSumOfThePowerOfAllSubsequences as sumOfPower } from ".";

/** Counts every pair of nested subsets. */
const byBruteForce = (nums: number[], k: number): number => {
	let total = 0;
	for (let outer = 0; outer < 1 << nums.length; outer++)
		for (let inner = outer; ; inner = (inner - 1) & outer) {
			const sum = nums.reduce((s, v, i) => ((inner >> i) & 1 ? s + v : s), 0);
			if (sum === k) total++;
			if (inner === 0) break;
		}
	return total;
};

describe("3082. Find the Sum of the Power of All Subsequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumOfPower([1, 2, 3], 3)).toBe(6);
		expect(sumOfPower([2, 3, 3], 5)).toBe(4);
		expect(sumOfPower([1, 2, 3], 7)).toBe(0);
	});

	it("matches counting nested subsets on random arrays", () => {
		const random = createRandom(3082);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 8), 1, 6);
			const k = random.int(1, 12);
			expect(sumOfPower(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
