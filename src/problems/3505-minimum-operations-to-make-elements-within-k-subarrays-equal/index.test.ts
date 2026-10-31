import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumOperationsToMakeElementsWithinKSubarraysEqual as minOperations } from ".";

/** Tries every choice of window starts. */
const byBruteForce = (nums: number[], x: number, k: number): number => {
	const cost = (start: number) => {
		const w = nums.slice(start, start + x).sort((a, b) => a - b);
		const median = w[Math.floor((x - 1) / 2)] ?? 0;
		return w.reduce((sum, v) => sum + Math.abs(v - median), 0);
	};
	let best = Number.POSITIVE_INFINITY;
	const choose = (from: number, left: number, total: number): void => {
		if (left === 0) {
			best = Math.min(best, total);
			return;
		}
		for (let start = from; start + x <= nums.length; start++)
			choose(start + x, left - 1, total + cost(start));
	};
	choose(0, k, 0);
	return best;
};

describe("3505. Minimum Operations to Make Elements Within K Subarrays Equal", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([5, -2, 1, 3, 7, 3, 6, 4, -1], 3, 2)).toBe(8);
		expect(minOperations([9, -2, -2, -2, 1, 5], 2, 2)).toBe(3);
	});

	it("matches trying every choice on random arrays", () => {
		const random = createRandom(3505);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(2, 10), -5, 5);
			const x = random.int(2, Math.max(2, Math.floor(nums.length / 2)));
			const k = random.int(1, Math.floor(nums.length / x));
			expect(minOperations(nums, x, k)).toBe(byBruteForce(nums, x, k));
		}
	});
});
