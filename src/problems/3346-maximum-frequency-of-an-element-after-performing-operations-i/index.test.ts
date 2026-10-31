import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumFrequencyOfAnElementAfterPerformingOperationsI as maxFrequency } from ".";

/** Tries every target in range. */
const byBruteForce = (
	nums: number[],
	k: number,
	numOperations: number,
): number => {
	let best = 0;
	for (
		let target = Math.min(...nums) - k;
		target <= Math.max(...nums) + k;
		target++
	) {
		const already = nums.filter((v) => v === target).length;
		const reachable = nums.filter((v) => Math.abs(v - target) <= k).length;
		best = Math.max(best, Math.min(reachable, already + numOperations));
	}
	return best;
};

describe("3346. Maximum Frequency of an Element After Performing Operations I", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxFrequency([1, 4, 5], 1, 2)).toBe(2);
		expect(maxFrequency([5, 11, 20, 20], 5, 1)).toBe(2);
	});

	it("matches trying every target on random arrays", () => {
		const random = createRandom(3346);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 1, 20);
			const k = random.int(0, 5);
			const ops = random.int(0, nums.length);
			expect(maxFrequency(nums, k, ops)).toBe(byBruteForce(nums, k, ops));
		}
	});
});
