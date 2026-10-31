import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeSubarraySumAfterRemovingAllOccurrencesOfOneElement as maxSubarraySum } from ".";

const kadane = (arr: number[]): number => {
	let best = Number.NEGATIVE_INFINITY;
	let current = 0;
	for (const v of arr) {
		current = Math.max(v, current + v);
		best = Math.max(best, current);
	}
	return best;
};

/** Removes each value in turn and runs Kadane. */
const byBruteForce = (nums: number[]): number => {
	let best = kadane(nums);
	for (const value of new Set(nums)) {
		const rest = nums.filter((v) => v !== value);
		if (rest.length > 0) best = Math.max(best, kadane(rest));
	}
	return best;
};

describe("3410. Maximize Subarray Sum After Removing All Occurrences of One Element", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSubarraySum([-3, 2, -2, -1, 3, -2, 3])).toBe(7);
		expect(maxSubarraySum([1, 2, 3, 4])).toBe(10);
	});

	it("matches removing each value on random arrays", () => {
		const random = createRandom(3410);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), -5, 5);
			expect(maxSubarraySum(nums)).toBe(byBruteForce(nums));
		}
	});
});
