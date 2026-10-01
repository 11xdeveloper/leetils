import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { largestSumOfAverages } from ".";

/** Tries every way to cut the array into at most k groups. */
const byBruteForce = (nums: number[], k: number): number => {
	let best = 0;
	for (let cuts = 0; cuts < 1 << (nums.length - 1); cuts++) {
		const groups: number[][] = [[]];
		for (const [i, num] of nums.entries()) {
			groups.at(-1)?.push(num);
			if (cuts & (1 << i)) groups.push([]);
		}
		if (groups.length > k) continue;
		best = Math.max(
			best,
			groups.reduce(
				(sum, group) => sum + group.reduce((a, b) => a + b, 0) / group.length,
				0,
			),
		);
	}
	return best;
};

describe("813. Largest Sum of Averages", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestSumOfAverages([9, 1, 2, 3, 9], 3)).toBeCloseTo(20, 9);
		expect(largestSumOfAverages([1, 2, 3, 4, 5, 6, 7], 4)).toBeCloseTo(20.5, 9);
	});

	it("matches trying every split on random inputs", () => {
		const random = createRandom(813);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(1, 10), 1, 20);
			const k = random.int(1, nums.length);
			expect(largestSumOfAverages(nums, k)).toBeCloseTo(
				byBruteForce(nums, k),
				9,
			);
		}
	});
});
