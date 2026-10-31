import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumOperationsToMakeSubarrayElementsEqual as minOperations } from ".";

/** Sorts every window and moves everything to its median. */
const byBruteForce = (nums: number[], k: number): number => {
	let best = Number.POSITIVE_INFINITY;
	for (let i = 0; i + k <= nums.length; i++) {
		const window = nums.slice(i, i + k).sort((a, b) => a - b);
		const median = window[Math.floor((k - 1) / 2)] ?? 0;
		best = Math.min(
			best,
			window.reduce((sum, v) => sum + Math.abs(v - median), 0),
		);
	}
	return best;
};

describe("3422. Minimum Operations to Make Subarray Elements Equal", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([4, -3, 2, 1, -4, 6], 3)).toBe(5);
		expect(minOperations([-2, -2, 3, 1, 4], 2)).toBe(0);
	});

	it("matches sorting every window on random arrays", () => {
		const random = createRandom(3422);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(2, 12), -6, 6);
			const k = random.int(2, nums.length);
			expect(minOperations(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
