import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfSubsequencesThatSatisfyTheGivenSumCondition as numSubseq } from ".";

/** Tries every non-empty subsequence. */
const byBruteForce = (nums: number[], target: number): number => {
	let count = 0;
	for (let mask = 1; mask < 2 ** nums.length; mask++) {
		const chosen = nums.filter((_, i) => mask & (1 << i));
		if (Math.min(...chosen) + Math.max(...chosen) <= target) count++;
	}
	return count;
};

describe("1498. Number of Subsequences That Satisfy the Given Sum Condition", () => {
	it("solves the examples from the problem statement", () => {
		expect(numSubseq([3, 5, 6, 7], 9)).toBe(4);
		expect(numSubseq([3, 3, 6, 8], 10)).toBe(6);
		expect(numSubseq([2, 3, 3, 4, 6, 7], 12)).toBe(61);
	});

	it("reduces modulo 10^9 + 7", () => {
		expect(numSubseq(new Array<number>(100).fill(1), 2)).toBe(
			Number((2n ** 100n - 1n) % 1_000_000_007n),
		);
	});

	it("matches trying every subsequence on random inputs", () => {
		const random = createRandom(1498);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 1, 10);
			const target = random.int(1, 20);
			expect(numSubseq(nums, target)).toBe(byBruteForce(nums, target));
		}
	});
});
