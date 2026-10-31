import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeTotalCostOfAlternatingSubarrays as maximumTotalCost } from ".";

/** Tries every split. */
const byBruteForce = (nums: number[]): number => {
	let best = Number.NEGATIVE_INFINITY;
	for (let cuts = 0; cuts < 1 << (nums.length - 1); cuts++) {
		let total = 0;
		let sign = 1;
		nums.forEach((num, i) => {
			if (i > 0 && (cuts >> (i - 1)) & 1) sign = 1;
			total += sign * num;
			sign = -sign;
		});
		best = Math.max(best, total);
	}
	return best;
};

describe("3196. Maximize Total Cost of Alternating Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumTotalCost([1, -2, 3, 4])).toBe(10);
		expect(maximumTotalCost([1, -1, 1, -1])).toBe(4);
		expect(maximumTotalCost([0])).toBe(0);
		expect(maximumTotalCost([1, -1])).toBe(2);
	});

	it("matches trying every split on random arrays", () => {
		const random = createRandom(3196);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), -5, 5);
			expect(maximumTotalCost(nums)).toBe(byBruteForce(nums));
		}
	});
});
