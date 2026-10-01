import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumDifferenceBetweenLargestAndSmallestValueInThreeMoves as minDifference } from ".";

/** Removes every set of up to three elements (changed ones can match the rest). */
const byBruteForce = (nums: number[]): number => {
	let best = Infinity;
	for (let mask = 0; mask < 2 ** nums.length; mask++) {
		const kept = nums.filter((_, i) => !(mask & (1 << i)));
		if (nums.length - kept.length > 3) continue;
		best = Math.min(
			best,
			kept.length === 0 ? 0 : Math.max(...kept) - Math.min(...kept),
		);
	}
	return best;
};

describe("1509. Minimum Difference Between Largest and Smallest Value in Three Moves", () => {
	it("solves the examples from the problem statement", () => {
		expect(minDifference([5, 3, 2, 4])).toBe(0);
		expect(minDifference([1, 5, 0, 10, 14])).toBe(1);
		expect(minDifference([3, 100, 20])).toBe(0);
	});

	it("matches removing every set of three on random inputs", () => {
		const random = createRandom(1509);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 9), -20, 20);
			expect(minDifference(nums)).toBe(byBruteForce(nums));
		}
	});
});
