import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheMedianOfTheUniquenessArray as medianOfUniquenessArray } from ".";

/** Builds the uniqueness array. */
const byBruteForce = (nums: number[]): number => {
	const counts: number[] = [];
	for (let i = 0; i < nums.length; i++)
		for (let j = i + 1; j <= nums.length; j++)
			counts.push(new Set(nums.slice(i, j)).size);
	counts.sort((a, b) => a - b);
	return counts[Math.floor((counts.length - 1) / 2)] ?? 0;
};

describe("3134. Find the Median of the Uniqueness Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(medianOfUniquenessArray([1, 2, 3])).toBe(1);
		expect(medianOfUniquenessArray([3, 4, 3, 4, 5])).toBe(2);
		expect(medianOfUniquenessArray([4, 3, 5, 4])).toBe(2);
	});

	it("matches building the uniqueness array on random arrays", () => {
		const random = createRandom(3134);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 1, 5);
			expect(medianOfUniquenessArray(nums)).toBe(byBruteForce(nums));
		}
	});
});
