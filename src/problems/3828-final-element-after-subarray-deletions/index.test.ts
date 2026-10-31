import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { finalElementAfterSubarrayDeletions as finalElement } from ".";

/** Minimax over every deletion. */
const byBruteForce = (nums: number[], alice = true): number => {
	if (nums.length === 1) return nums[0] ?? 0;
	let best = alice ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
	for (let l = 0; l < nums.length; l++)
		for (let r = l; r < nums.length; r++) {
			if (r - l + 1 >= nums.length) continue;
			const value = byBruteForce(
				[...nums.slice(0, l), ...nums.slice(r + 1)],
				!alice,
			);
			best = alice ? Math.max(best, value) : Math.min(best, value);
		}
	return best;
};

describe("3828. Final Element After Subarray Deletions", () => {
	it("solves the examples from the problem statement", () => {
		expect(finalElement([1, 5, 2])).toBe(2);
		expect(finalElement([3, 7])).toBe(7);
	});

	it("matches minimax on random arrays", () => {
		const random = createRandom(3828);
		for (let run = 0; run < 100; run++) {
			const nums = random.array(random.int(1, 6), 1, 9);
			expect(finalElement(nums)).toBe(byBruteForce(nums));
		}
	});
});
