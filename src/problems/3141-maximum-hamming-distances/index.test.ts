import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumHammingDistances as maxHammingDistances } from ".";

/** Compares every pair. */
const byBruteForce = (nums: number[]): number[] =>
	nums.map((a) =>
		Math.max(
			...nums.map((b) => (a ^ b).toString(2).replaceAll("0", "").length),
		),
	);

describe("3141. Maximum Hamming Distances", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxHammingDistances([9, 12, 9, 11], 4)).toEqual([2, 3, 2, 3]);
		expect(maxHammingDistances([3, 4, 6, 10], 4)).toEqual([3, 3, 2, 3]);
	});

	it("matches comparing every pair on random arrays", () => {
		const random = createRandom(3141);
		for (let run = 0; run < 200; run++) {
			const m = random.int(1, 8);
			const nums = random.array(random.int(2, 10), 0, 2 ** m - 1);
			expect(maxHammingDistances(nums, m)).toEqual(byBruteForce(nums));
		}
	});
});
