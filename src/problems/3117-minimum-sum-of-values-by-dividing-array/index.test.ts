import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumSumOfValuesByDividingArray as minimumValueSum } from ".";

/** Tries every set of cut points. */
const byBruteForce = (nums: number[], andValues: number[]): number => {
	const n = nums.length;
	let best = Number.POSITIVE_INFINITY;
	for (let cuts = 0; cuts < 1 << (n - 1); cuts++) {
		const parts: number[][] = [[]];
		nums.forEach((num, i) => {
			parts.at(-1)?.push(num);
			if (i < n - 1 && (cuts >> i) & 1) parts.push([]);
		});
		if (parts.length !== andValues.length) continue;
		if (parts.every((part, i) => part.reduce((a, b) => a & b) === andValues[i]))
			best = Math.min(
				best,
				parts.reduce((sum, part) => sum + (part.at(-1) ?? 0), 0),
			);
	}
	return best === Number.POSITIVE_INFINITY ? -1 : best;
};

describe("3117. Minimum Sum of Values by Dividing Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumValueSum([1, 4, 3, 3, 2], [0, 3, 3, 2])).toBe(12);
		expect(minimumValueSum([2, 3, 5, 7, 7, 7, 5], [0, 7, 5])).toBe(17);
		expect(minimumValueSum([1, 2, 3, 4], [2])).toBe(-1);
	});

	it("matches trying every split on random arrays", () => {
		const random = createRandom(3117);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 9), 0, 7);
			const andValues = random.array(
				random.int(1, Math.min(4, nums.length)),
				0,
				7,
			);
			expect(minimumValueSum(nums, andValues)).toBe(
				byBruteForce(nums, andValues),
			);
		}
	});
});
