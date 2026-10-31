import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumSumOfMNonOverlappingSubarraysI as maximumSum } from ".";

/** Tries every choice of subarrays. */
const byBruteForce = (
	nums: number[],
	m: number,
	l: number,
	r: number,
): number => {
	const n = nums.length;
	let best = Number.NEGATIVE_INFINITY;
	const go = (from: number, used: number, total: number): void => {
		if (used > 0) best = Math.max(best, total);
		if (used === m) return;
		for (let s = from; s < n; s++)
			for (let len = l; len <= r && s + len <= n; len++)
				go(
					s + len,
					used + 1,
					total + nums.slice(s, s + len).reduce((a, b) => a + b, 0),
				);
	};
	go(0, 0, 0);
	return best;
};

describe("3956. Maximum Sum of M Non-Overlapping Subarrays I", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumSum([4, 1, -5, 2], 2, 1, 3)).toBe(7);
		expect(maximumSum([1, 0, 3, 4], 2, 1, 2)).toBe(8);
		expect(maximumSum([-1, 7, -4], 1, 2, 3)).toBe(6);
		expect(maximumSum([-3, -4, -1], 2, 1, 2)).toBe(-1);
	});

	it("matches trying every choice on random arrays", () => {
		const random = createRandom(3956);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 8), -6, 6);
			const m = random.int(1, 3);
			const l = random.int(1, nums.length);
			const r = random.int(l, nums.length);
			expect(maximumSum(nums, m, l, r)).toBe(byBruteForce(nums, m, l, r));
		}
	});
});
