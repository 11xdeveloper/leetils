import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumBalancedSubsequenceSum as maxBalancedSubsequenceSum } from ".";

/** Tries every non-empty subsequence. */
const byBruteForce = (nums: number[]): number => {
	let best = Number.NEGATIVE_INFINITY;
	for (let mask = 1; mask < 1 << nums.length; mask++) {
		const indices = nums.map((_, i) => i).filter((i) => (mask >> i) & 1);
		const ok = indices.every(
			(i, k) =>
				k === 0 ||
				(nums[i] ?? 0) - (nums[indices[k - 1] ?? 0] ?? 0) >=
					i - (indices[k - 1] ?? 0),
		);
		if (ok)
			best = Math.max(
				best,
				indices.reduce((s, i) => s + (nums[i] ?? 0), 0),
			);
	}
	return best;
};

describe("2926. Maximum Balanced Subsequence Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxBalancedSubsequenceSum([3, 3, 5, 6])).toBe(14);
		expect(maxBalancedSubsequenceSum([5, -1, -3, 8])).toBe(13);
		expect(maxBalancedSubsequenceSum([-2, -1])).toBe(-1);
	});

	it("matches trying every subsequence on random inputs", () => {
		const random = createRandom(2926);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), -10, 10);
			expect(maxBalancedSubsequenceSum(nums)).toBe(byBruteForce(nums));
		}
	});
});
