import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumOperationsToAchieveAtLeastKPeaks as minOperations } from ".";

/** Tries every set of peaks. */
const byBruteForce = (nums: number[], k: number): number => {
	const n = nums.length;
	let best = Number.POSITIVE_INFINITY;
	for (let mask = 0; mask < 1 << n; mask++) {
		const chosen = Array.from({ length: n }, (_, i) => i).filter(
			(i) => (mask >> i) & 1,
		);
		if (
			chosen.length < k ||
			chosen.some((i) => (mask >> ((i + 1) % n)) & 1 && n > 1)
		)
			continue;
		const cost = chosen.reduce(
			(s, i) =>
				s +
				Math.max(
					0,
					Math.max(nums[(i - 1 + n) % n] ?? 0, nums[(i + 1) % n] ?? 0) +
						1 -
						(nums[i] ?? 0),
				),
			0,
		);
		best = Math.min(best, cost);
	}
	return best === Number.POSITIVE_INFINITY ? -1 : best;
};

describe("3892. Minimum Operations to Achieve At Least K Peaks", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([2, 1, 2], 1)).toBe(1);
		expect(minOperations([4, 5, 3, 6], 2)).toBe(0);
		expect(minOperations([3, 7, 3], 2)).toBe(-1);
	});

	it("matches trying every set on random circles", () => {
		const random = createRandom(3892);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(2, 9), -5, 5);
			const k = random.int(0, nums.length);
			expect(minOperations(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
