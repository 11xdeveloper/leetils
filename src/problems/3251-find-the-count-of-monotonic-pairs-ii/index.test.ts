import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheCountOfMonotonicPairsII as countOfPairs } from ".";

/** Tries every non-decreasing arr1. */
const byBruteForce = (nums: number[]): number => {
	const count = (i: number, last1: number, last2: number): number => {
		if (i === nums.length) return 1;
		let total = 0;
		for (let a = last1; a <= (nums[i] ?? 0); a++) {
			const b = (nums[i] ?? 0) - a;
			if (b <= last2) total += count(i + 1, a, b);
		}
		return total;
	};
	return count(0, 0, Number.POSITIVE_INFINITY);
};

describe("3251. Find the Count of Monotonic Pairs II", () => {
	it("solves the examples from the problem statement", () => {
		expect(countOfPairs([2, 3, 2])).toBe(4);
		expect(countOfPairs([5, 5, 5, 5])).toBe(126);
	});

	it("matches trying every pair on random arrays", () => {
		const random = createRandom(3251);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 6), 1, 6);
			expect(countOfPairs(nums)).toBe(byBruteForce(nums));
		}
	});
});

describe("3251. Find the Count of Monotonic Pairs II at full size", () => {
	it("reduces large counts modulo 10^9 + 7", () => {
		const result = countOfPairs(new Array<number>(2000).fill(1000));
		expect(result).toBeGreaterThanOrEqual(0);
		expect(result).toBeLessThan(1_000_000_007);
	});
});
