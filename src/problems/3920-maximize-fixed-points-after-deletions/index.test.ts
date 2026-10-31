import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeFixedPointsAfterDeletions as maxFixedPoints } from ".";

/** Tries every set of kept elements. */
const byBruteForce = (nums: number[]): number => {
	let best = 0;
	for (let mask = 0; mask < 1 << nums.length; mask++) {
		const kept = nums.filter((_, i) => (mask >> i) & 1);
		best = Math.max(best, kept.filter((x, i) => x === i).length);
	}
	return best;
};

describe("3920. Maximize Fixed Points After Deletions", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxFixedPoints([0, 2, 1])).toBe(2);
		expect(maxFixedPoints([3, 1, 2])).toBe(2);
		expect(maxFixedPoints([1, 0, 1, 2])).toBe(3);
	});

	it("matches trying every deletion on random arrays", () => {
		const random = createRandom(3920);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 0, 6);
			expect(maxFixedPoints(nums)).toBe(byBruteForce(nums));
		}
	});
});
