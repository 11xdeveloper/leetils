import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheMaximumNumberOfMarkedIndices as maxNumOfMarkedIndices } from ".";

/** Tries every way of pairing indices. */
const byBruteForce = (nums: number[]): number => {
	const best = (used: number): number => {
		let most = 0;
		for (let i = 0; i < nums.length; i++) {
			if ((used >> i) & 1) continue;
			for (let j = 0; j < nums.length; j++)
				if (
					i !== j &&
					!((used >> j) & 1) &&
					2 * (nums[i] ?? 0) <= (nums[j] ?? 0)
				)
					most = Math.max(most, 2 + best(used | (1 << i) | (1 << j)));
		}
		return most;
	};
	return best(0);
};

describe("2576. Find the Maximum Number of Marked Indices", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxNumOfMarkedIndices([3, 5, 2, 4])).toBe(2);
		expect(maxNumOfMarkedIndices([9, 2, 5, 4])).toBe(4);
		expect(maxNumOfMarkedIndices([7, 6, 8])).toBe(0);
	});

	it("matches trying every pairing on random inputs", () => {
		const random = createRandom(2576);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 7), 1, 12);
			expect(maxNumOfMarkedIndices(nums)).toBe(byBruteForce(nums));
		}
	});
});
