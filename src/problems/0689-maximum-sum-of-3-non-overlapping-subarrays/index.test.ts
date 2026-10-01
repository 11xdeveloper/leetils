import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumSumOf3NonOverlappingSubarrays as maxSumOfThreeSubarrays } from ".";

/** Tries every triple of starts in lexicographic order, keeping strictly better totals. */
const byBruteForce = (nums: number[], k: number): number[] => {
	const window = (start: number) =>
		nums.slice(start, start + k).reduce((a, b) => a + b, 0);
	let best: number[] = [];
	let bestTotal = Number.NEGATIVE_INFINITY;
	for (let a = 0; a + 3 * k <= nums.length; a++) {
		for (let b = a + k; b + 2 * k <= nums.length; b++) {
			for (let c = b + k; c + k <= nums.length; c++) {
				const total = window(a) + window(b) + window(c);
				if (total > bestTotal) [best, bestTotal] = [[a, b, c], total];
			}
		}
	}
	return best;
};

describe("689. Maximum Sum of 3 Non-Overlapping Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSumOfThreeSubarrays([1, 2, 1, 2, 6, 7, 5, 1], 2)).toEqual([
			0, 3, 5,
		]);
		expect(maxSumOfThreeSubarrays([1, 2, 1, 2, 1, 2, 1, 2, 1], 2)).toEqual([
			0, 2, 4,
		]);
	});

	it("matches trying every triple on random inputs", () => {
		const random = createRandom(689);
		for (let run = 0; run < 1000; run++) {
			const k = random.int(1, 3);
			const nums = random.array(random.int(3 * k, 3 * k + 8), 1, 4);
			expect(maxSumOfThreeSubarrays(nums, k)).toEqual(byBruteForce(nums, k));
		}
	});
});
