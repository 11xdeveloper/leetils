import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumOperationsToMakeTheArrayBeautiful as minOperations } from ".";

/** Searches final values up to a generous bound. */
const byBruteForce = (nums: number[]): number => {
	const bound = 8 * Math.max(...nums);
	const go = (i: number, previous: number): number => {
		if (i === nums.length) return 0;
		let best = Number.POSITIVE_INFINITY;
		for (let w = nums[i] ?? 0; w <= bound; w++)
			if (i === 0 || w % previous === 0)
				best = Math.min(best, w - (nums[i] ?? 0) + go(i + 1, w));
		return best;
	};
	return go(0, 1);
};

describe("3717. Minimum Operations to Make the Array Beautiful", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([3, 7, 9])).toBe(2);
		expect(minOperations([1, 1, 1])).toBe(0);
		expect(minOperations([4])).toBe(0);
	});

	it("matches searching larger values on random arrays", () => {
		const random = createRandom(3717);
		for (let run = 0; run < 100; run++) {
			const nums = random.array(random.int(1, 4), 1, 6);
			expect(minOperations(nums)).toBe(byBruteForce(nums));
		}
	});
});
