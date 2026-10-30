import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumDifferenceInSumsAfterRemovalOfElements as minimumDifference } from ".";

/** Tries every set of n elements to remove. */
const byBruteForce = (nums: number[]): number => {
	const n = nums.length / 3;
	let best = Infinity;
	for (let mask = 0; mask < 1 << nums.length; mask++) {
		const kept = nums.filter((_, i) => !(mask & (1 << i)));
		if (kept.length !== 2 * n) continue;
		const sum = (part: number[]): number => part.reduce((s, v) => s + v, 0);
		best = Math.min(best, sum(kept.slice(0, n)) - sum(kept.slice(n)));
	}
	return best;
};

describe("2163. Minimum Difference in Sums After Removal of Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumDifference([3, 1, 2])).toBe(-1);
		expect(minimumDifference([7, 9, 5, 8, 1, 3])).toBe(1);
	});

	it("matches trying every removal on random inputs", () => {
		const random = createRandom(2163);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(3 * random.int(1, 4), 1, 20);
			expect(minimumDifference(nums)).toBe(byBruteForce(nums));
		}
	});
});
