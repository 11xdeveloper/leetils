import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { closestSubsequenceSum as minAbsDifference } from ".";

describe("1755. Closest Subsequence Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(minAbsDifference([5, -7, 3, 5], 6)).toBe(0);
		expect(minAbsDifference([7, -9, 15, -2], -5)).toBe(1);
		expect(minAbsDifference([1, 2, 3], -7)).toBe(7);
	});

	it("matches trying every subsequence on random inputs", () => {
		const random = createRandom(1755);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), -20, 20);
			const goal = random.int(-60, 60);
			let best = Infinity;
			for (let mask = 0; mask < 1 << nums.length; mask++) {
				const sum = nums.reduce(
					(s, num, i) => (mask & (1 << i) ? s + num : s),
					0,
				);
				best = Math.min(best, Math.abs(sum - goal));
			}
			expect(minAbsDifference(nums, goal)).toBe(best);
		}
	});

	it("handles 40 elements", () => {
		expect(
			minAbsDifference(
				Array.from({ length: 40 }, (_, i) => 2 ** (i % 20)),
				1_000_001,
			),
		).toBe(0);
	});
});
