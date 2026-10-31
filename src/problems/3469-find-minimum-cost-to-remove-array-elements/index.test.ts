import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findMinimumCostToRemoveArrayElements as minCost } from ".";

/** Tries every choice of pair. */
const byBruteForce = (nums: number[]): number => {
	if (nums.length < 3) return Math.max(...nums);
	let best = Number.POSITIVE_INFINITY;
	for (const [a, b] of [
		[0, 1],
		[0, 2],
		[1, 2],
	] as const) {
		const rest = nums.filter((_, i) => i !== a && i !== b);
		best = Math.min(
			best,
			Math.max(nums[a] ?? 0, nums[b] ?? 0) + byBruteForce(rest),
		);
	}
	return best;
};

describe("3469. Find Minimum Cost to Remove Array Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(minCost([6, 2, 8, 4])).toBe(12);
		expect(minCost([2, 1, 3, 3])).toBe(5);
		expect(minCost([7])).toBe(7);
	});

	it("matches trying every choice on random arrays", () => {
		const random = createRandom(3469);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 9), 1, 9);
			expect(minCost(nums)).toBe(byBruteForce(nums));
		}
	});
});
